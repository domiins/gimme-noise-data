import { Enum } from "./tsUtils"

export const MAP_TYPES = {
  NOISE: 'noise polution',
  POPULATION: 'population',
  DEVICES: 'sensore placement'
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
  [ROAD_TYPES.HIGHWAY]: 12,
  [ROAD_TYPES.FIRST_CLASS]: 8,
  [ROAD_TYPES.SECOND_CLASS]: 5,
  [ROAD_TYPES.THIRD_CLASS]: 2,
  [ROAD_TYPES.FOURTH_CLASS]: 1
} as const


// 0.0001 = 7.419 m
// 0.001  = 74.19 m

export const INFUENCING_DISTANCE_COEFICIENT = 0.001 //74.19 m
export const UNIQUE_NOISES_MIN_DISTANCE_COEFICITENT = 0.0005 //37.10m

export const POPULATION_SCORE_WEIGHT = 1.3
export const NOISES_NUMBER_SCORE_WEIGHT = 1