import { Emitter, EmitForm } from "./type";
import { Action } from "../../type";
export interface RelayNextHandler<T, K> {
    (emit: EmitForm<K>): Action<T>;
}
export declare function relayNext<T, K = T>(handler: RelayNextHandler<T, K>): (emitter: Emitter<T>) => Emitter<K>;