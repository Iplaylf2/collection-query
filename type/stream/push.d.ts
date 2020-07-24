import { Selector, Predicate, Aggregate } from "../type";
import { Emitter } from "./push/type";
export declare function map<T, Te, K>(f: Selector<T, K>): (emitter: Emitter<T, Te>) => Emitter<K, Te>;
export declare function filter<T, Te>(f: Predicate<T>): (emitter: Emitter<T, Te>) => Emitter<T, Te>;
export declare function remove<T, Te>(f: Predicate<T>): (emitter: Emitter<T, Te>) => Emitter<T, Te>;
export declare function take<T, Te>(n: number): (emitter: Emitter<T, Te>) => Emitter<T, Te>;
export declare function takeWhile<T, Te>(f: Predicate<T>): (emitter: Emitter<T, Te>) => Emitter<T, Te>;
export declare function skip<T, Te>(n: number): (emitter: Emitter<T, Te>) => Emitter<T, Te>;
export declare function skipWhile<T, Te>(f: Predicate<T>): (emitter: Emitter<T, Te>) => Emitter<T, Te>;
export declare function concat<T, Te>(s1: Emitter<T, Te>, s2: Emitter<T, Te>): Emitter<T, Te>;
export declare function concatAll<T, Te>([s, ...ss]: Emitter<T, Te>[]): Emitter<T, Te>;
export declare function zip<T, Te>(ss: Emitter<T, Te>[]): Emitter<T[], Te>;
export declare function race<T, Te>(ss: Emitter<T, Te>[]): Emitter<T, Te>;
export declare function reduce<T, K>(s: Emitter<T>, f: Aggregate<T, K>, v: K): Promise<K>;
export declare function count(s: Emitter<any>): Promise<number>;
export declare function include<T>(s: Emitter<T>, v: T): Promise<boolean>;
export declare function every<T>(s: Emitter<T>, f: Predicate<T>): Promise<boolean>;
export declare function some<T>(s: Emitter<T>, f: Predicate<T>): Promise<boolean>;
export declare function first<T>(s: Emitter<T>): Promise<void | T>;
export declare function last<T>(s: Emitter<T>): Promise<void | T>;
export declare function async<T, Te>(s: Emitter<T, Te>): import("../async-push").AsyncPushStream<T, Te>;