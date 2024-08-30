/* eslint-disable no-unused-vars */
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Product from "./pages/product";
import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout"
import Login from "./pages/Login";
import CityList from "./components/CityList";
import { useEffect, useState } from "react";
import CountryList from "./components/CountryList"
import City from "./components/City"
import Form from "./components/Form"
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContex";
import ProtectedRoute from "./pages/ProtectedRoute";
const BASE_URL = "http://localhost:9000/cities";

function App() {

  // const[cities,setCities]=useState([]);
  // const [isLoading,setIsLoading]=useState(false);

  // useEffect(function(){

  //   async function fetchCities()
  //   {
  //     try{
  //       setIsLoading(true);
  //       const res=await fetch("http://localhost:9000/cities");
  //       const data=await res.json();
  //       console.log(data);

  //       setCities(data);

  //     }catch{
  //       alert("There was an error loading data...");
  //     }finally{
  //       setIsLoading(false);
  //     }
  //   }

  //   fetchCities();
  // },[])




  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Homepage />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="product" element={<Product />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="app" element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>

            } >
              <Route index element={<Navigate replace to="cities" />} />
              <Route path='cities' element={<CityList />} />
              <Route path='countries' element={<CountryList />} />
              <Route path='form' element={<Form />} />
              <Route path='cities/:id' element={<City />} />
            </Route>

            <Route path="login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );

}

export default App
