import './App.css';
import {Routes, Route} from "react-router-dom"
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LandingPage from './components/landingpage/landingpage'
import Nav from './components/nav/nav'
import Detail from './components/detail/detail'
import Footer from './components/footer/footer';
import {getAllCountries} from "./redux/actions"
import Home from './components/home/home';
import Error from './components/error/error';
import Form from './components/form/form';

function App() {

   const dispatch = useDispatch()
   const {countries} = useSelector(state=>state)

   useEffect(()=>{
      if(countries.length === 0) dispatch(getAllCountries())
  },[dispatch,countries])

  return (
    <div on className='App'>
         <Nav/>
         <Routes>
            <Route path='/' element={<LandingPage/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/detail/:id' element={<Detail/>}/>
            <Route path='/activities' element ={<Form/>}/>
            <Route path='*' element={<Error status={404} message={"Not Found!"}/>}/>
         </Routes>
         <Footer/>
    </div>
   )
}

export default App;
