import { AsyncBlock } from "./async-block";
import { LinkedList } from "./linked-list";

export class LazyChannel<T> {
  constructor() {
    this.buffer = new LinkedList();
    this.putBlock = new AsyncBlock();
    this.takeBlock = new AsyncBlock();
    this._isClose = false;
  }

  async put(x: T): Promise<boolean> {
    if (this._isClose) {
      return false;
    }

    this.buffer.put(x);

    if (!this.putBlock.isBlock) {
      this.putBlock.block();
    }

    this.takeBlock.unblock();

    while (true) {
      await this.putBlock.wait;

      if (!this._isClose && 0 < this.buffer.length) {
        continue;
      }

      return this._isClose;
    }
  }

  async take(): Promise<[true] | [false, T]> {
    while (true) {
      await this.takeBlock.wait;

      if (0 < this.buffer.length) {
        const result = this.buffer.take();
        return [false, result];
      } else {
        if (this._isClose) {
          return [true];
        } else {
          if (!this.takeBlock.isBlock) {
            this.takeBlock.block();
          }

          this.putBlock.unblock();

          continue;
        }
      }
    }
  }

  close() {
    if (!this._isClose) {
      this.putBlock.unblock();
      this.takeBlock.unblock();
      this._isClose = true;
    }
  }

  private readonly buffer: LinkedList<T>;
  private readonly putBlock: AsyncBlock;
  private readonly takeBlock: AsyncBlock;
  private _isClose: boolean;
}
