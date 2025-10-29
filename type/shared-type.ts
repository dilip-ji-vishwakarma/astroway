/* eslint-disable @typescript-eslint/no-explicit-any */
export type GenericDataType =
  | string
  | number
  | boolean
  | undefined
  | any
  | null
  | Date
  | FormData

export type GenericObjectType = {
  [key: string]: GenericDataType
}

export type AddressConfig = {
  street_address?: string
  apt_suite?: string
  state_province?: string
  city?: string
  postal_code?: string
  country?: string
  latitude?: string
  longitude?: string
}