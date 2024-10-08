/* eslint-disable react/prop-types */

import styles from './CountryList.module.css'
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from './CountryItem';
import { useCities } from '../contexts/CitiesContext';
// eslint-disable-next-line no-unused-vars
function CountriesList() {
    const{cities,isLoading}=useCities();
    if(isLoading){
        return <Spinner/>
    }

    if(!cities.length)
    {
        return(
            <Message message="Add your first city by clicking on a city on the map"/>
        )
    }

    const countries=cities.reduce((arr,city)=>
        {
        if(!arr.map(el=>el.country).includes(city.country))
        {
            return [...arr,{country:city.country, emoji:city.emoji}];
        }else{
            return arr;
        }
    },[]);
    return (
        <ul className={styles.countriesList}>
           {countries.map(country=><CountryItem country={country} key={country.id}/>)}
        </ul>
    )
}

export default CountriesList
