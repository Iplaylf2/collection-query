import { PushStream } from "./type";
import { Action, Selector, Predicate, Aggregate } from "../type";
import { EmitForm } from "./push/type";
export declare const create: <T, Te = never>(executor: Action<EmitForm<T, Te>>) => PushStream<T, Te>;
export declare const createFrom: <T>(i: Iterable<T>) => PushStream<T, any>;
export declare function forEach<T>(s: PushStream<T, any>, f: Action<T>): void;
export declare function map<T, Te, K>(f: Selector<T, K>): (s: PushStream<T, Te>) => PushStream<K, Te>;
export declare function filter<T, Te>(f: Predicate<T>): (s: PushStream<T, Te>) => PushStream<T, Te>;
export declare function remove<T, Te>(f: Predicate<T>): (s: PushStream<T, Te>) => PushStream<T, Te>;
export declare function take<T, Te>(n: number): (s: PushStream<T, Te>) => PushStream<T, Te>;
export declare function takeWhile<T, Te>(f: Predicate<T>): (s: PushStream<T, Te>) => PushStream<T, Te>;
export declare function skip<T, Te>(n: number): (s: PushStream<T, Te>) => PushStream<T, Te>;
export declare function skipWhile<T, Te>(f: Predicate<T>): (s: PushStream<T, Te>) => PushStream<T, Te>;
export declare function partition<T, Te>(n: number): (s: PushStream<T, Te>) => PushStream<T[], Te>;
export declare function partitionBy<T, Te>(f: Selector<T, any>): (s: PushStream<T, Te>) => PushStream<T[], Te>;
export declare function concat<T, Te>(s1: PushStream<T, Te>, s2: PushStream<T, Te>): PushStream<T, Te>;
export declare function concatAll<T, Te>([s, ...ss]: PushStream<T, Te>[]): PushStream<T, Te>;
export declare function zip<T, Te>(ss: PushStream<T, Te>[]): PushStream<T[], Te>;
export declare function race<T, Te>(ss: PushStream<T, Te>[]): PushStream<T, Te>;
export declare function reduce<T, K>(s: PushStream<T>, f: Aggregate<T, K>, v: K): Promise<K>;
export declare function count(s: PushStream<any>): Promise<number>;
export declare function include<T>(s: PushStream<T>, v: T): Promise<boolean>;
export declare function every<T>(s: PushStream<T>, f: Predicate<T>): Promise<boolean>;
export declare function some<T>(s: PushStream<T>, f: Predicate<T>): Promise<boolean>;
export declare function first<T>(s: PushStream<T>): Promise<void | T>;
export declare function last<T>(s: PushStream<T>): Promise<void | T>;
