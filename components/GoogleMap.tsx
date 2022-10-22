import {useRef, useEffect} from 'react'

export const GoogleMap = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return

    const {google} = window

    const bratislava = new google.maps.LatLng(48.148598, 17.107748);
    new google.maps.Map(ref.current, {
      center: bratislava,
      zoom: 13,
    });

  }, [ref]);

  return <div style={{ height: '70vh', width: '80%' }} ref={ref} id="map" />
}
