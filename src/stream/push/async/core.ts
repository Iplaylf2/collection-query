import { EmitForm, Emitter } from "./type";
import {
  Selector,
  AsyncSelector,
  Predicate,
  AsyncPredicate,
  Action,
  Aggregate,
  AsyncAggregate,
} from "../../../type";
import { EmitType, EmitItem } from "../type";

export function map<T, K>(
  emit: EmitForm<K, never>,
  f: Selector<T, K> | AsyncSelector<T, K>
) {
  return async (x: T) => {
    const r = await f(x);
    await emit(EmitType.Next, r);
  };
}

export function filter<T>(
  emit: EmitForm<T, never>,
  f: Predicate<T> | AsyncPredicate<T>
) {
  return async (x: T) => {
    const p = await f(x);
    if (p) {
      await emit(EmitType.Next, x);
    }
  };
}

export function remove<T>(
  emit: EmitForm<T, never>,
  f: Predicate<T> | AsyncPredicate<T>
) {
  return async (x: T) => {
    const p = await f(x);
    if (!p) {
      await emit(EmitType.Next, x);
    }
  };
}

export function take<T>(emit: EmitForm<T, never>, n: number) {
  return async (x: T) => {
    if (n > 0) {
      n--;
      await emit(EmitType.Next, x);
    } else {
      await emit(EmitType.Complete);
    }
  };
}

export function takeWhile<T>(
  emit: EmitForm<T, never>,
  f: Predicate<T> | AsyncPredicate<T>
) {
  return async (x: T) => {
    const p = await f(x);
    if (p) {
      await emit(EmitType.Next, x);
    } else {
      await emit(EmitType.Complete);
    }
  };
}

export function skip<T>(emit: EmitForm<T, never>, n: number) {
  let skip = true;
  return async (x: T) => {
    if (skip) {
      if (n > 0) {
        n--;
      } else {
        skip = false;
        await emit(EmitType.Next, x);
      }
    } else {
      await emit(EmitType.Next, x);
    }
  };
}

export function skipWhile<T>(
  emit: EmitForm<T, never>,
  f: Predicate<T> | AsyncPredicate<T>
) {
  let skip = true;
  return async (x: T) => {
    if (skip) {
      const p = await f(x);
      if (!p) {
        skip = false;
        await emit(EmitType.Next, x);
      }
    } else {
      await emit(EmitType.Next, x);
    }
  };
}

export function concat<T, Te>(
  emitter1: Emitter<T, Te>,
  emitter2: Emitter<T, Te>,
  emit: EmitForm<T, Te>
) {
  let cancel2: Action<void> = function () {};

  const cancel1 = emitter1(async (t, x?) => {
    switch (t) {
      case EmitType.Next:
        await emit(EmitType.Next, x as T);
        break;
      case EmitType.Complete:
        cancel2 = emitter2(emit);
        break;
      case EmitType.Error:
        emit(EmitType.Error, x as Te);
        break;
    }
  });

  const cancel = function () {
    cancel1();
    cancel2();
  };

  return cancel;
}

export * from "./core/zip";
export * from "./core/race";

export function reduce<T, K>(
  resolve: Action<K>,
  reject: Action<any>,
  f: Aggregate<T, K> | AsyncAggregate<T, K>,
  v: K
) {
  let r = v;
  return async (...[t, x]: EmitItem<T, any>) => {
    switch (t) {
      case EmitType.Next:
        r = await f(r, x);
        break;
      case EmitType.Complete:
        resolve(r);
        break;
      case EmitType.Error:
        reject(x);
        break;
    }
  };
}

export function count(resolve: Action<number>, reject: Action<any>) {
  let n = 0;
  return async (...[t, x]: EmitItem<any, any>) => {
    switch (t) {
      case EmitType.Next:
        n++;
        break;
      case EmitType.Complete:
        resolve(n);
        break;
      case EmitType.Error:
        reject(x);
        break;
    }
  };
}

export function include<T>(
  resolve: Action<boolean>,
  reject: Action<any>,
  v: T
) {
  return async (...[t, x]: EmitItem<T, any>) => {
    switch (t) {
      case EmitType.Next:
        if (x === v) {
          resolve(true);
        }
        break;
      case EmitType.Complete:
        resolve(false);
        break;
      case EmitType.Error:
        reject(x);
        break;
    }
  };
}

export function every<T>(
  resolve: Action<boolean>,
  reject: Action<any>,
  f: Predicate<T> | AsyncPredicate<T>
) {
  return async (...[t, x]: EmitItem<T, any>) => {
    switch (t) {
      case EmitType.Next:
        const p = await f(x);
        if (!p) {
          resolve(false);
        }
        break;
      case EmitType.Complete:
        resolve(true);
        break;
      case EmitType.Error:
        reject(x);
        break;
    }
  };
}

export function some<T>(
  resolve: Action<boolean>,
  reject: Action<any>,
  f: Predicate<T> | AsyncPredicate<T>
) {
  return async (...[t, x]: EmitItem<T, any>) => {
    switch (t) {
      case EmitType.Next:
        const p = await f(x);
        if (p) {
          resolve(true);
        }
        break;
      case EmitType.Complete:
        resolve(false);
        break;
      case EmitType.Error:
        reject(x);
        break;
    }
  };
}

export function first<T>(resolve: Action<T | void>, reject: Action<any>) {
  return async (...[t, x]: EmitItem<T, any>) => {
    switch (t) {
      case EmitType.Next:
        resolve(x);
        break;
      case EmitType.Complete:
        resolve();
        break;
      case EmitType.Error:
        reject(x);
        break;
    }
  };
}

export function last<T>(resolve: Action<T | void>, reject: Action<any>) {
  let last: T | void;
  return async (...[t, x]: EmitItem<T, any>) => {
    switch (t) {
      case EmitType.Next:
        last = x;
        break;
      case EmitType.Complete:
        resolve(last);
        break;
      case EmitType.Error:
        reject(x);
        break;
    }
  };
}