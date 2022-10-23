import {useState, ChangeEvent} from 'react'
import {map} from 'lodash'
import type {NextPage, GetStaticProps} from 'next'
import {Wrapper} from "@googlemaps/react-wrapper"
import Button from '@mui/material/Button';

import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField'
import {Footer} from '../components/Footer';
import {GoogleMap, Data} from '../components/GoogleMap';

import styles from '../styles/Visualization.module.css'
import {MAP_TYPES, MapType, ROAD_WEIGHTS} from '../constants';

import roadsRawData from '../data/roads.json'
import populationRawData from '../data/population_density.json'
import { lineToPoints, rawToLine } from '../utils/geometryUtils';
import { evaluatePopulationAreas } from '../model';

const capitalizeFirstLetter = (string: string) => string.charAt(0).toUpperCase() + string.slice(1);

type VisualizationProps = {
  googleApiKey?: string
  data: Data
}

const DEFAULT_DATA_DISPLAYED = {
  [MAP_TYPES.NOISE]: true,
  [MAP_TYPES.POPULATION]: false,
  [MAP_TYPES.DEVICES]: false
}

const DEFAULT_DEVICES_NUMBER = 5

const Visualization: NextPage<VisualizationProps> = ({googleApiKey, data}) => {
  const [isDataDisplayed, setIsDataDisplayed] = useState<Partial<Record<MapType, boolean>>>(DEFAULT_DATA_DISPLAYED)
  const [devicesNumber, setDevicesNumber] = useState(DEFAULT_DEVICES_NUMBER)

  const handleDisplayedDataToggle = (e: ChangeEvent<HTMLInputElement>) => {
    setIsDataDisplayed((previous) => ({...previous, [e.target.name]: e.target.checked}))
  }

  const handleDevicesNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDevicesNumber(parseInt(e.target.value))
  }

  return (
    <div>
      <main className={styles.main}>

        {googleApiKey && (
          <Wrapper apiKey={googleApiKey} libraries={['visualization']}>
            <GoogleMap isDataDisplayed={isDataDisplayed} data={{
              ...data,
              [MAP_TYPES.DEVICES]: data[MAP_TYPES.DEVICES].slice(0, devicesNumber)
            }}/>
          </Wrapper>
        )}
        
        <FormControl className={styles.radio}>
          <FormLabel id="demo-checkboxes-group-label">Displayed data</FormLabel>
          <FormGroup row aria-labelledby="demo-checkboxes-group-label">
            {Object.values(MAP_TYPES).map((option) => 
              <FormControlLabel key={option} label={capitalizeFirstLetter(option)} className={styles.radioLabel} control={
                <Checkbox checked={isDataDisplayed[option]} name={option} onChange={handleDisplayedDataToggle}/>
              }/>
            )}

          <TextField
            type="number"
            disabled={!isDataDisplayed[MAP_TYPES.DEVICES]}
            value={devicesNumber} onChange={handleDevicesNumberChange}
            inputProps={{ inputMode: 'numeric', min: '0' }}
          />

          </FormGroup>
          <Button href="/" variant="contained" size="large" className={styles.radio}>Back</Button>
        </FormControl>

      </main>
      <Footer />
    </div>
  )
}

export default Visualization

export const getStaticProps: GetStaticProps = () => {
  const roadsData = map(roadsRawData, (data, roadType) => {
    const weight = ROAD_WEIGHTS[roadType]
    return data.flatMap((road) => lineToPoints(rawToLine(road))).map((point) => ({point, weight}))
  }).flat()
  
  const noiseData = roadsData
  
  const populationData = map(populationRawData, (data, weight) => 
    data.map((point) => ({point: [parseFloat(point.x), parseFloat(point.y)], weight: parseInt(weight)}))
  ).flat()

  const orderedPopulationData = evaluatePopulationAreas(populationData, noiseData)
  const devices = orderedPopulationData.map(({point}) => point)

  return {
    props: {
      googleApiKey: process.env.GOOGLE_API_KEY,
      data: {
        [MAP_TYPES.NOISE]: noiseData,
        [MAP_TYPES.POPULATION]: populationData,
        [MAP_TYPES.DEVICES]: devices
      }
    },
  }
}