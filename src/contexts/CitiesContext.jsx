/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useState, useEffect, useContext, useReducer, act } from "react";
const CitiesContext = createContext();

function reducer(state,action){
    switch(action.type)
    {
        case 'loading':
            return{...state,
                isLoading:true,
            }
        case 'cities/loaded':
            return{
                ...state,
                isLoading:false,
                cities:action.payload,
            }

        case "city/loaded":
            return {
                ...state,
                isLoading:false,
                currentCity:action.payload,

            }
        case 'city/created':
            return{
                ...state,
                isLoading:false,
                cities:[...state.cities,action.payload],
                currentCity:action.payload
            }

        case 'cities/deleted':
            return{
                ...state,
                isLoading:false,
                cities:state.cities.filter((city)=>city.id!==action.payload),
                currentCity:{}
            }

        case "rejected":
            return{
                ...state,isLoading:false,error:action.payload
            }
        
        default:
            throw new Error("Unknow action type");
    }
}
const initialState={
    cities:[],
    isLoading:false,
    currentCity:{},
    error:"",
}

const BASE_URL="http://localhost:9000"
function CitiesProvider({ children }) {
    // const [cities, setCities] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);
    // const [currentCity, setCurrentCity] = useState({});

    const[{cities,isLoading,currentCity,error},dispatch]=useReducer(reducer,initialState);

    
    useEffect(function () {

        async function fetchCities() {
            dispatch({type:"loading"})
            try {
                // setIsLoading(true);
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();
                // console.log(data);

                // setCities(data);
                dispatch({type:"cities/loaded", payload:data})

            } catch {
                //alert("There was an error loading data...");
                dispatch({type:'rejected',payload:"There was an error loading data"})
            }
            //finally {
            //     setIsLoading(false);
            // }
        }

        fetchCities();
    }, [])

    //current city
    async function getCity(id) {
        if(Number(id)===currentCity.id) return;
        dispatch({type:"loading"});
        try {
            //setIsLoading(true);
            const res = await fetch(`http://localhost:9000/cities/${id}`);
    
            const data = await res.json();
       
            // setCurrentCity(data);
            dispatch({type:"city/loaded",payload:data})
        } catch(err) {
            //console.log("err: ", err);
            dispatch({type:"rejected",payload:"There was and error loading data..."})
            //alert("There was an error loading data...");
        } 
        // finally {
        //     setIsLoading(false);
        // }

    }

    

    async function createCity(newCity) {
        dispatch({type:"loading"})
        try {
            // setIsLoading(true);
            const res = await fetch(`http://localhost:9000/cities/`,{
                method:'POST',
                body:JSON.stringify(newCity),
                headers:{
                    "Content-Type":"application/json"
                }
            });
    
            const data = await res.json();
            //setCities((cities)=>[...cities,data]);
            dispatch({type:"city/created",payload:data})
        } catch(err) {
            console.log("err: ", err);
            dispatch({type:"rejected",payload:"There was an error creating city"})
            //alert("There was an error creating city...");
        } 
        // finally {
        //     setIsLoading(false);
        // }

    }

    async function deleteCity(id) {
        dispatch({type:"loading"})
        try {
            // setIsLoading(true);
            await fetch(`http://localhost:9000/cities/${id}`,{
                method:'DELETE',
                
            });
            dispatch({type:"cities/deleted",payload:id})
            //setCities((cities)=>cities.filter((city)=>city.id!=id));
        } catch(err) {
            // console.log("err: ", err);
            // alert("There was an error deleting data...");
            dispatch({type:"rejected",payload:"There was an error deleting data..."})
        } 

    }
    return <CitiesContext.Provider
        value={{
            cities,
            isLoading,
            currentCity,
            getCity,
            error,
            createCity,
            deleteCity
        }}
    >
        {children}
    </CitiesContext.Provider>

}


function useCities() {
    const context = useContext(CitiesContext);

    if (context === undefined) {
        throw new Error("CitiesContext was used outside the CitiesProvider");
    }

    return context;
}
export { CitiesProvider, useCities };