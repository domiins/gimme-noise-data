import {useState, ChangeEvent} from 'react'
import {map} from 'lodash'
import type {NextPage, GetStaticProps} from 'next'
import {Wrapper} from "@googlemaps/react-wrapper"
import Button from '@mui/material/Button';

import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import {Footer} from '../components/Footer';
import {GoogleMap, Location} from '../components/GoogleMap';

import styles from '../styles/Visualization.module.css'
import {MAP_TYPES, MapType, ROAD_WEIGHTS} from '../constants';

import roadsRawData from '../data/roads.json'
import { lineToPoints, rawToLine } from '../utils/geometryUtils';

const capitalizeFirstLetter = (string: string) => string.charAt(0).toUpperCase() + string.slice(1);

type VisualizationProps = {
  googleApiKey?: string
  data: Record<MapType, Location[]>
}

const Visualization: NextPage<VisualizationProps> = ({googleApiKey, data}) => {
  const [mapType, setMapType] = useState<MapType>(MAP_TYPES.DEVICES)

  const handleMapTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMapType(e.target.value as MapType)
  }

  return (
    <div className="container">
      <main className="main">

        {googleApiKey && (
          <Wrapper apiKey={googleApiKey} libraries={['visualization']}>
            <GoogleMap mapType={mapType} data={data[mapType]}/>
          </Wrapper>
        )}
        
        <FormControl className={styles.radio}>
          <FormLabel id="demo-radio-buttons-group-label">Map type</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            value={mapType}
            onChange={handleMapTypeChange}
          >
            {Object.values(MAP_TYPES).map(
              (option) => <FormControlLabel key={option} value={option} control={<Radio />} label={capitalizeFirstLetter(option)} />
            )}
          </RadioGroup>
          <Button href="/" variant="contained" size="large" className={styles.radio}>Back</Button>
        </FormControl>

      </main>
      <Footer />
    </div>
  )
}

export default Visualization


// const PLACEHOLDER_HEATMAP_DATA = [[48.146, 17.108], [48.146, 17.109], [48.146, 17.110], [48.146, 17.111], [48.146, 17.112]]
const PLACEHOLDER_HEATMAP_DATA = lineToPoints({startX: 48.146, startY: 17.108, endX: 48.146, endY: 17.112}).map((point) => ({point, weight: 1}))

export const getStaticProps: GetStaticProps = () => {
  const roadsData = map(roadsRawData, (data, roadType) => {
    const weight = ROAD_WEIGHTS[roadType]
    return data.flatMap((road) => lineToPoints(rawToLine(road))).map((point) => ({point, weight}))
  }).flat()
  
  const noiseData = roadsData

  return {
    props: {
      googleApiKey: process.env.GOOGLE_API_KEY,
      data: {
        noise: noiseData,
        population: PLACEHOLDER_HEATMAP_DATA,
        devices: []
      }
    },
  }
}