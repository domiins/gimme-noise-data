import {orderBy, minBy, maxBy} from 'lodash'

import {Location} from './components/GoogleMap'
import { getDistance} from './utils/geometryUtils'

// 0.0001 = 7.419 m
// 0.001  = 74.19 m

const INFUENCING_DISTANCE_COEFICIENT = 0.001 //74.19 m
const UNIQUE_NOISES_MIN_DISTANCE_COEFICITENT = 0.0005 //37.10m

const isInfluencingNoiseSource = (noise: Location, populationPoint: Location['point']) => {
  const distance = getDistance(noise.point, populationPoint)
  return distance <= INFUENCING_DISTANCE_COEFICIENT * noise.weight
}

const isUniqueNoiseSource = (influencingNoises: Location['point'][], point: Location['point']) =>
  influencingNoises.every((influencingNoisePoint) => getDistance(influencingNoisePoint, point) > UNIQUE_NOISES_MIN_DISTANCE_COEFICITENT)

const determineInfluencingNoiseSources = (noiseData: Location[]) => (populationArea: Location) => {
  const {point: populationPoint} = populationArea
  const influencingNoises = new Set<Location['point']>()

  noiseData.map((noise) => {
    if (isInfluencingNoiseSource(noise, populationPoint) && isUniqueNoiseSource(Array.from(influencingNoises), noise.point))
      influencingNoises.add(noise.point)
  })

  return {...populationArea, noisesNumber: influencingNoises.size}
}

const getLimits = (populationAreas: (Location & {noisesNumber: number})[]) => ({
  population: {
    min: minBy(populationAreas, 'weight')?.['weight'] || 0,
    max: maxBy(populationAreas, 'weight')?.['weight'] || 0
  },
  noisesNumber: {
    min: minBy(populationAreas, 'noisesNumber')?.['noisesNumber'] || 0,
    max: maxBy(populationAreas, 'noisesNumber')?.['noisesNumber'] || 0
  }
})

const evaluatePopulationArea = (limits: ReturnType<typeof getLimits>) => (populationArea: Location & {noisesNumber: number}) => {
  const {noisesNumber, weight: population} = populationArea

  const POPULATION_WEIGHT = 1.3
  const NOISES_NUMBER_WEIGHT = 1

  const populationScore = (population - limits.population.min) / ((limits.population.max - limits.population.min) || 1)
  const noisesNumberScore = (noisesNumber - limits.noisesNumber.min) / ((limits.noisesNumber.max - limits.noisesNumber.min) || 1)

  console.log({
    population,
    noisesNumber,
    populationScore,
    noisesNumberScore,
    score: populationScore * POPULATION_WEIGHT + noisesNumberScore * NOISES_NUMBER_WEIGHT
  })
  return populationScore * POPULATION_WEIGHT + noisesNumberScore * NOISES_NUMBER_WEIGHT
}

export const evaluatePopulationAreas = (populationData: Location[], noiseData: Location[]) => {
  const enhancedPopulationData = populationData.map(determineInfluencingNoiseSources(noiseData))
  const limits = getLimits(enhancedPopulationData)
  return orderBy(enhancedPopulationData, evaluatePopulationArea(limits), ['desc'])
}
