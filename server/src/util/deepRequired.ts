export type DeepRequired<T> = T extends object
  ? {
      [k in keyof Required<T>]: DeepRequired<T[k]>;
    }
  : Exclude<T, undefined>;
