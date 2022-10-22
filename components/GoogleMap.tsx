import {FC, useRef, useEffect} from 'react'
import {MAP_TYPES, MapType} from '../constants';
import {Point} from '../utils/geometryUtils';

const renderHeatmapLayer = (google: typeof window.google, data: Point[], map: google.maps.Map) => {
  const heatmapData = data.map((point) => new google.maps.LatLng(point[0], point[1]))

  new google.maps.visualization.HeatmapLayer({
    data: heatmapData,
    map,
    radius: 20,
  })
}

type GoogleMapProps = {mapType: MapType, data: Point[]}

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

    if (mapType === MAP_TYPES.NOISE  || mapType === MAP_TYPES.POPULATION) renderHeatmapLayer(google, data, map)
  }, [ref, mapType, data])

  return <div style={{ height: '70vh', width: '80%' }} ref={ref} id="map" />
}
