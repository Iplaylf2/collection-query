import { EmitForm, Emitter, EmitItem } from "./type";
import { Selector, Predicate, Action, Aggregate } from "../../type";
export declare function map<T, K>(emit: EmitForm<K, never>, f: Selector<T, K>): (x: T) => void;
export declare function filter<T>(emit: EmitForm<T, never>, f: Predicate<T>): (x: T) => void;
export declare function remove<T>(emit: EmitForm<T, never>, f: Predicate<T>): (x: T) => void;
export declare function take<T>(emit: EmitForm<T, never>, n: number): (x: T) => void;
export declare function takeWhile<T>(emit: EmitForm<T, never>, f: Predicate<T>): (x: T) => void;
export declare function skip<T>(emit: EmitForm<T, never>, n: number): (x: T) => void;
export declare function skipWhile<T>(emit: EmitForm<T, never>, f: Predicate<T>): (x: T) => void;
export declare function partition<T, Te>(emitter: Emitter<T, Te>, emit: EmitForm<T[], Te>, n: number): Action<void>;
export declare function partitionBy<T, Te>(emitter: Emitter<T, Te>, emit: EmitForm<T[], Te>, f: Selector<T, any>): Action<void>;
export declare function concat<T, Te>(emitter1: Emitter<T, Te>, emitter2: Emitter<T, Te>, emit: EmitForm<T, Te>): () => void;
export * from "./core/zip";
export declare function race<T, Te>(ee: Emitter<T, Te>[], emit: EmitForm<T, Te>): () => void;
export declare function reduce<T, K>(resolve: Action<K>, reject: Action<any>, f: Aggregate<T, K>, v: K): (...[t, x]: EmitItem<T, any>) => void;
export declare function count(resolve: Action<number>, reject: Action<any>): (...[t, x]: EmitItem<any, any>) => void;
export declare function include<T>(resolve: Action<boolean>, reject: Action<any>, v: T): (...[t, x]: EmitItem<T, any>) => void;
export declare function every<T>(resolve: Action<boolean>, reject: Action<any>, f: Predicate<T>): (...[t, x]: EmitItem<T, any>) => void;
export declare function some<T>(resolve: Action<boolean>, reject: Action<any>, f: Predicate<T>): (...[t, x]: EmitItem<T, any>) => void;
export declare function first<T>(resolve: Action<T | void>, reject: Action<any>): (...[t, x]: EmitItem<T, any>) => void;
export declare function last<T>(resolve: Action<T | void>, reject: Action<any>): (...[t, x]: EmitItem<T, any>) => void;
