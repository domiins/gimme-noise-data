import {useState, ChangeEvent} from 'react'
import type { NextPage } from 'next'
import Button from '@mui/material/Button';

import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import { Footer } from '../components/Footer';

import styles from '../styles/Visualization.module.css'

const capitalizeFirstLetter = (string: string) => string.charAt(0).toUpperCase() + string.slice(1);

const MAP_TYPES = {
  NOISE: 'noise',
  POPULATION: 'population',
  DEVICES: 'devices'
} as const

type Enum<T> = T[keyof T]
type MapTypes = Enum<typeof MAP_TYPES>

type VisualizationProps = {}

const Visualization: NextPage<VisualizationProps> = () => {
  const [mapType, setMapType] = useState<MapTypes>(MAP_TYPES.DEVICES)

  const handleMapTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMapType(e.target.value as MapTypes)
  }

  return (
    <div className="container">
      <main className="main">
        <h1>Here comes map</h1>
        
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Map type</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            value={mapType}
            onChange={handleMapTypeChange}
          >
            {Object.values(MAP_TYPES).map((option) => <FormControlLabel key={option} value={option} control={<Radio />} label={capitalizeFirstLetter(option)} />)}
          </RadioGroup>
        </FormControl>

        <Button href="/" variant="contained" size="large" className="description">Back</Button>
      </main>
      <Footer />
    </div>
  )
}

export default Visualization
