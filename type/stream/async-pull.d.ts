import { AsyncPullStream } from "./type";
import { Action, AsyncAction, Selector, AsyncSelector, Predicate, AsyncPredicate, Aggregate, AsyncAggregate } from "../type";
export declare function createFrom<T>(i: Iterable<T>): AsyncPullStream<T>;
export declare function forEach<T>(s: AsyncPullStream<T>, f: Action<T> | AsyncAction<T>): Promise<void>;
export declare function map<T, K>(f: Selector<T, K> | AsyncSelector<T, K>): (s: AsyncPullStream<T>) => AsyncPullStream<K>;
export declare function filter<T>(f: Predicate<T> | AsyncPredicate<T>): (s: AsyncPullStream<T>) => AsyncPullStream<T>;
export declare function remove<T>(f: Predicate<T> | AsyncPredicate<T>): (s: AsyncPullStream<T>) => AsyncPullStream<T>;
export declare function take<T>(n: number): (s: AsyncPullStream<T>) => AsyncPullStream<T>;
export declare function takeWhile<T>(f: Predicate<T> | AsyncPredicate<T>): (s: AsyncPullStream<T>) => AsyncPullStream<T>;
export declare function skip<T>(n: number): (s: AsyncPullStream<T>) => AsyncPullStream<T>;
export declare function skipWhile<T>(f: Predicate<T> | AsyncPredicate<T>): (s: AsyncPullStream<T>) => AsyncPullStream<T>;
export declare function partition<T>(n: number): (s: AsyncPullStream<T>) => AsyncPullStream<T[]>;
export declare function partitionBy<T>(f: Selector<T, any>): (s: AsyncPullStream<T>) => AsyncPullStream<T[]>;
export declare function flatten<T extends K[], K>(s: AsyncPullStream<T>): AsyncPullStream<K>;
export declare function concat<T>(s1: AsyncPullStream<T>, s2: AsyncPullStream<T>): AsyncPullStream<T>;
export declare function concatAll<T>([s, ...ss]: AsyncPullStream<T>[]): AsyncPullStream<T>;
export declare function zip<T>(ss: AsyncPullStream<T>[]): AsyncPullStream<T[]>;
export declare function race<T>(ss: AsyncPullStream<T>[]): AsyncPullStream<T>;
export declare function reduce<T, K>(s: AsyncPullStream<T>, f: Aggregate<T, K> | AsyncAggregate<T, K>, v: K): Promise<K>;
export declare function count(s: AsyncPullStream<any>): Promise<number>;
export declare function include<T>(s: AsyncPullStream<T>, x: T): Promise<boolean>;
export declare function every<T>(s: AsyncPullStream<T>, f: Predicate<T> | AsyncPredicate<T>): Promise<boolean>;
export declare function some<T>(s: AsyncPullStream<T>, f: Predicate<T> | AsyncPredicate<T>): Promise<boolean>;
export declare function first<T>(s: AsyncPullStream<T>): Promise<any>;
export declare function last<T>(s: AsyncPullStream<T>): Promise<T | undefined>;
