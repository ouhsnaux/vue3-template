export interface Option {
  label: string;
  value: string | number;
  [x: string]: any;
}

export type Options = Array<Option>;

// eslint-disable-next-line no-unused-vars
export type RequestOptions = (...args: any) => Promise<Options>;

export type MaybeOptions = Options | Promise<Options>;
