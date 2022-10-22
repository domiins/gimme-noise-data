import {FC, useRef, useEffect} from 'react'
import {MAP_TYPES, MapType} from '../constants';

const PLACEHOLDER_HEATMAP_DATA = [[48.146, 17.108], [48.146, 17.109], [48.146, 17.110], [48.146, 17.111], [48.146, 17.112]]

const renderHeatmapLayer = (map: google.maps.Map, google: any) => {
  const heatmapData = PLACEHOLDER_HEATMAP_DATA.map((point) => new google.maps.LatLng(point[0], point[1]))

  new google.maps.visualization.HeatmapLayer({
    data: heatmapData,
    map
  })
}

type GoogleMapProps = {mapType: MapType}

export const GoogleMap: FC<GoogleMapProps> = ({mapType}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return

    const {google} = window

    const bratislava = new google.maps.LatLng(48.148598, 17.107748);
    const map = new google.maps.Map(ref.current, {
      center: bratislava,
      zoom: 13,
    })

    if (mapType === MAP_TYPES.NOISE  || mapType === MAP_TYPES.POPULATION) renderHeatmapLayer(map, google)
  }, [ref, mapType])

  return <div style={{ height: '70vh', width: '80%' }} ref={ref} id="map" />
}
