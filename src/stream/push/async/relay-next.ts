import { Emitter, EmitForm } from "./type";
import { relay } from "./relay";
import { EmitType } from "../type";

interface RelayNextHandler<T, Te, K> {
  (emit: EmitForm<K, Te>): (x: T) => Promise<void>;
}

export function relayNext<T, Te, K = T>(handler: RelayNextHandler<T, Te, K>) {
  return (emitter: Emitter<T, Te>): Emitter<K, Te> =>
    relay((emit) => {
      const handleNext = handler(emit);
      return emitter(async (t, x?) => {
        switch (t) {
          case EmitType.Next:
            await handleNext(x as T);
            break;
          case EmitType.Complete:
            emit(t);
            break;
          case EmitType.Error:
            emit(t, x as Te);
            break;
        }
      });
    });
}