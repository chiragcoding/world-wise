/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Map.module.css';
import { MapContainer, TileLayer, Popup, Marker, useMap, useMapEvents } from "react-leaflet";
import { useEffect, useState } from 'react';
import { useCities } from '../contexts/CitiesContext';
import { useGeolocation } from '../../hooks/useGeolocation';
import Button from './Buttons';
import { useUrlPostion } from '../../hooks/useUrlPosition';


function Map() {
  const navigate = useNavigate();
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([40, 0]);

  

  const{isLoading:isLoadingPostiton,
    position:geolocationPostion,
    getPosition
  }=useGeolocation();


  const[mapLat,mapLng]=useUrlPostion();
  useEffect(function(){
    if(mapLat&&mapLng)
    {
      setMapPosition([mapLat,mapLng])
    }
   
  },[mapLat,mapLng])


  useEffect(function(){
    if(geolocationPostion)
    {
      setMapPosition([geolocationPostion.lng,geolocationPostion.lat])
    }
  },[geolocationPostion])

  return (
    <div className={styles.mapContainer}>
      {!geolocationPostion&&(<Button type='position' onClick={getPosition}>{isLoadingPostiton?'Loading...':'Use your positon'}</Button>)}
      <MapContainer center={mapPosition} zoom={13} scrollWheelZoom={true} className={styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        <ChangeCenter position={mapPosition}/>
        <DetectClick/>
      </MapContainer>

    </div>
  )
}


function ChangeCenter({position})
{
  const map=useMap();
  map.setView(position);
  return null;
}

function DetectClick()
{
  const navigate=useNavigate();
  useMapEvents({
    click:(e)=>{
      console.log(e);
      
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    }
  })
}

export default Map
