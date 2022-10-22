import { Enum } from "./tsUtils"

export const MAP_TYPES = {
    NOISE: 'noise',
    POPULATION: 'population',
    DEVICES: 'devices'
  } as const
  
export type MapType = Enum<typeof MAP_TYPES>