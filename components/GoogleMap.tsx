import {FC, useRef, useEffect} from 'react'
import {MAP_TYPES, MapType} from '../constants';
import {Point} from '../utils/geometryUtils';

export type Location = {
  point: Point
  weight?: number
}

const renderHeatmapLayer = (
  google: typeof window.google,
  data: Location[],
  options: google.maps.visualization.HeatmapLayerOptions
) => {
  const heatmapData = data.map(({point, weight = 1}) => ({
    location: new google.maps.LatLng(point[0], point[1]),
    weight
  }))
  
  new google.maps.visualization.HeatmapLayer({
    data: heatmapData,
    ...options,
  })
}

const CIRCLE_COLOURS = ['White', 'Yellow', 'Red', 'Purple', 'Black']

const renderCirclesLayer = (
  google: typeof window.google,
  data: Location[],
  options: google.maps.CircleOptions
) => {
  data.map(({point, weight = 0}) => {
  console.log(CIRCLE_COLOURS[weight])
    new google.maps.Circle({
      center: new google.maps.LatLng(point[0], point[1]),
      radius: 500,
      fillColor: CIRCLE_COLOURS[weight],
      ...options,
    })
  })
}

type GoogleMapProps = {mapType: MapType, data: Location[]}

export const GoogleMap: FC<GoogleMapProps> = ({mapType, data}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return

    const {google} = window

    const bratislava = new google.maps.LatLng(48.148598, 17.107748);
    const map = new google.maps.Map(ref.current, {
      center: bratislava,
      zoom: 13,
    })

    if (mapType === MAP_TYPES.NOISE) renderHeatmapLayer(google, data, {map, radius: 20})
    if (mapType === MAP_TYPES.POPULATION) renderCirclesLayer(google, data, {map})
  }, [ref, mapType, data])

  return <div style={{ height: '70vh', width: '80%' }} ref={ref} id="map" />
}
