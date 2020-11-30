import { Selector, AsyncSelector, Predicate, AsyncPredicate, Func } from "../../../type";
export declare function map<T, K>(iterator: AsyncIterableIterator<T>, f: Selector<T, K> | AsyncSelector<T, K>): AsyncGenerator<K, void, unknown>;
export declare function filter<T>(iterator: AsyncIterableIterator<T>, f: Predicate<T> | AsyncPredicate<T>): AsyncGenerator<T, void, unknown>;
export declare function remove<T>(iterator: AsyncIterableIterator<T>, f: Predicate<T> | AsyncPredicate<T>): AsyncGenerator<T, void, unknown>;
export declare function take<T>(iterator: AsyncIterableIterator<T>, n: number): AsyncGenerator<T, void, unknown>;
export declare function takeWhile<T>(iterator: AsyncIterableIterator<T>, f: Predicate<T> | AsyncPredicate<T>): AsyncGenerator<T, void, unknown>;
export declare function skip<T>(iterator: AsyncIterableIterator<T>, n: number): AsyncGenerator<T, void, undefined>;
export declare function skipWhile<T>(iterator: AsyncIterableIterator<T>, f: Predicate<T> | AsyncPredicate<T>): AsyncGenerator<T, void, undefined>;
export declare function partition<T>(iterator: AsyncIterableIterator<T>, n: number): AsyncGenerator<T[], void, unknown>;
export declare function partitionBy<T>(iterator: AsyncIterableIterator<T>, f: Predicate<T>): AsyncGenerator<T[], void, unknown>;
export declare function flatten<T>(iterator: AsyncIterableIterator<T[]>): AsyncGenerator<T, void, unknown>;
export declare function concat<T>(s1: Func<AsyncIterableIterator<T>>, s2: Func<AsyncIterableIterator<T>>): AsyncGenerator<T, void, unknown>;
export declare function zip<T>(ss: Func<AsyncIterableIterator<T>>[]): AsyncGenerator<T[], void, undefined>;
export declare function race<T>(ss: Func<AsyncIterableIterator<T>>[]): AsyncGenerator<T, void, undefined>;