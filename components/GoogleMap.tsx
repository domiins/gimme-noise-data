import {FC, useRef, useEffect} from 'react'
import {MAP_TYPES, MapType} from '../constants';
import {Point} from '../utils/geometryUtils';

export type Location = {
  point: Point
  weight: number
}

export type Data = {
  [MAP_TYPES.NOISE]: Location[]
  [MAP_TYPES.POPULATION]: Location[]
  [MAP_TYPES.DEVICES]: Location['point'][]
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

// const CIRCLE_COLOURS = ['#F5CBA7', '#F0B27A', '#EB984E', '#E67E22', '#CA6F1E', '#935116']
const CIRCLE_COLOURS = ['White', 'Yellow', 'Orange', 'Red', 'Purple', 'Black']
const renderCirclesLayer = (
  google: typeof window.google,
  data: Location[],
  options: google.maps.CircleOptions
) => {
  data.map(({point, weight = 0}) => {
    new google.maps.Circle({
      center: new google.maps.LatLng(point[0], point[1]),
      radius: 500,
      strokeOpacity: 0.1,
      fillOpacity: 0.5,
      fillColor: CIRCLE_COLOURS[weight],
      ...options,
    })
  })
}

const renderMarkersLayer = (
  google: typeof window.google,
  data: Location['point'][],
  options: google.maps.CircleOptions
) => {
  data.map((point) => {
    new google.maps.Marker({
      position: new google.maps.LatLng(point[0], point[1]),
      ...options,
    })
  })
}

type GoogleMapProps = {isDataDisplayed: Partial<Record<MapType, boolean>>, data: Data}

export const GoogleMap: FC<GoogleMapProps> = ({isDataDisplayed, data}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return

    const {google} = window

    const bratislava = new google.maps.LatLng(48.148598, 17.107748);
    const map = new google.maps.Map(ref.current, {
      center: bratislava,
      zoom: 13,
      zoomControl: false,
      disableDoubleClickZoom: true,
      mapTypeId: 'hybrid'
    })

    if (isDataDisplayed[MAP_TYPES.NOISE]) renderHeatmapLayer(google, data[MAP_TYPES.NOISE], {map, radius: 10})
    if (isDataDisplayed[MAP_TYPES.POPULATION]) renderHeatmapLayer(google, data[MAP_TYPES.POPULATION], {map, radius: 100, gradient: ['rgba(255,255,255,0)', '#E0FFFF', '#87CEFA', '#00BFFF', '#1E90FF', '#4169E1', '#0000FF']})
    if (isDataDisplayed[MAP_TYPES.DEVICES]) renderMarkersLayer(google, data[MAP_TYPES.DEVICES], {map})
  }, [ref, isDataDisplayed, data])

  return <div style={{ height: '70vh', width: '100%' }} ref={ref} id="map" />
}
