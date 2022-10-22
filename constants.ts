import { Enum } from "./tsUtils"

export const MAP_TYPES = {
    NOISE: 'noise',
    POPULATION: 'population',
    DEVICES: 'devices'
  } as const
  
export type MapType = Enum<typeof MAP_TYPES>

const ROAD_TYPES = {
  HIGHWAY: 'highway',
  FIRST_CLASS: '1.class',
  SECOND_CLASS: '2.class',
  THIRD_CLASS: '3.class',
  FOURTH_CLASS: '4.class',
}

export const ROAD_WEIGHTS = {
  [ROAD_TYPES.HIGHWAY]: 20,
  [ROAD_TYPES.FIRST_CLASS]: 10,
  [ROAD_TYPES.SECOND_CLASS]: 5,
  [ROAD_TYPES.THIRD_CLASS]: 2,
  [ROAD_TYPES.FOURTH_CLASS]: 1
} as const
