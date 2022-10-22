import {useState, ChangeEvent} from 'react'
import type {NextPage, GetStaticProps} from 'next'
import {Wrapper} from "@googlemaps/react-wrapper"
import Button from '@mui/material/Button';

import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import {Footer} from '../components/Footer';
import {GoogleMap} from '../components/GoogleMap';

import styles from '../styles/Visualization.module.css'
import {MAP_TYPES, MapType} from '../constants';

const capitalizeFirstLetter = (string: string) => string.charAt(0).toUpperCase() + string.slice(1);

type VisualizationProps = {googleApiKey?: string}

const Visualization: NextPage<VisualizationProps> = ({googleApiKey}) => {
  const [mapType, setMapType] = useState<MapType>(MAP_TYPES.DEVICES)

  const handleMapTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMapType(e.target.value as MapType)
  }

  return (
    <div className="container">
      <main className="main">

        {googleApiKey && (
          <Wrapper apiKey={googleApiKey} libraries={['visualization']}><GoogleMap mapType={mapType}/></Wrapper>
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


export const getStaticProps: GetStaticProps = (context) => {
  return {
    props: {
      googleApiKey: process.env.GOOGLE_API_KEY
    },
  }
}