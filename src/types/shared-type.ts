export type GenericDataType =
  | string
  | number
  | boolean
  | undefined
  | null
  | Date
  | FormData;

export type GenericObjectType = {
  [key: string]: GenericDataType;
};