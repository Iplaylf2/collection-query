import { Emitter, EmitForm } from "./type";
import { relay } from "./relay";
import { EmitType } from "../type";

export interface RelayNextHandler<T, K> {
  (emit: EmitForm<K>): (x: T) => Promise<void>;
}

export function relayNext<T, K = T>(handler: RelayNextHandler<T, K>) {
  return (emitter: Emitter<T>): Emitter<K> =>
    relay((emit, expose) => {
      const handle_next = handler(emit);
      emitter(async (t, x?) => {
        switch (t) {
          case EmitType.Next:
            await handle_next(x as T);
            break;
          case EmitType.Complete:
            emit(t);
            break;
          case EmitType.Error:
            emit(t, x);
            break;
        }
      }, expose);
    });
}
