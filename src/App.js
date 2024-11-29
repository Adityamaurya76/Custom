import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import './App.css'
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Country from './pages/Country';
import Navbar from './Component/navbar/Navbar';
import Footer from './Component/footer/Footer';
import ErrorPage from './pages/ErrorPage';
import { CountryDetails } from './Component/CountryDetail/CountryDetail';
 

function App() {
  return (
    <Router>
    <Navbar/>
      <Routes>
     <Route path='/' element={<Home/>} errorElement={<ErrorPage/>}/> 
    <Route path='/about/' element={<About/>}/>
    <Route path='/contact' element={<Contact/>}/>
    <Route  path='/country' element={<Country/>}/>
    <Route  path='/country/:id' element={<CountryDetails/>}/>
   </Routes>
   <Footer/>
    </Router>
  );
}

export default App;
