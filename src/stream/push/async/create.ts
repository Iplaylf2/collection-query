import { Action } from "../../../type";
import { ReceiveForm, Emitter, Executor } from "./type";
import { Cancel, EmitItem, EmitType } from "../type";

export function create<T>(executor: Executor<T>): Emitter<T> {
  return (receiver, expose?) => {
    const handler = new EmitterHandler(executor, receiver, expose);

    return handler.cancel;
  };
}

class EmitterHandler<T> {
  constructor(
    executor: Executor<T>,
    receiver: ReceiveForm<T>,
    expose?: Action<Cancel>
  ) {
    this.receive = receiver;
    this.cancel = this._cancel.bind(this);
    if (expose) {
      expose(this.cancel);
    }

    this.open = true;
    this.lastBlock = Promise.resolve();

    try {
      this._dispose = executor(this.handleWithQueue.bind(this)) as Cancel;
      if (!this.open) {
        this.dispose();
      }
    } catch (e) {
      if (this.open) {
        this.error(e);
      } else {
        throw e;
      }
    }
  }

  readonly cancel: Cancel;

  private async handleWithQueue(...item: EmitItem<T>) {
    let resolve!: Action<void>;
    const new_block = new Promise<void>((r) => (resolve = r));

    const last_block = this.lastBlock;
    this.lastBlock = new_block;

    await last_block;

    try {
      return await this.handle(...item);
    } finally {
      resolve();
    }
  }

  private async handle(...[t, x]: EmitItem<T>) {
    if (this.open) {
      switch (t) {
        case EmitType.Next:
          await this.next(x);
          break;
        case EmitType.Complete:
          await this.complete();
          break;
        case EmitType.Error:
          await this.error(x);
          break;
      }
    }
    return this.open;
  }

  private async next(x: T) {
    try {
      await this.receive(EmitType.Next, x);
    } catch (e) {
      this._cancel();
      throw e;
    }
  }

  private async complete() {
    try {
      await this.receive(EmitType.Complete);
    } finally {
      this._cancel();
    }
  }

  private async error(x: any) {
    try {
      await this.receive(EmitType.Error, x);
    } finally {
      this._cancel();
    }
  }

  private dispose() {
    if (this._dispose) {
      const dispose = this._dispose;
      this._dispose = null!;
      dispose();
    }
  }

  private _cancel() {
    this.receive = null!;
    this.open = false;
    this.dispose();
  }

  private receive: ReceiveForm<T>;
  private _dispose?: Cancel;
  private open: boolean;
  private lastBlock: Promise<void>;
}
