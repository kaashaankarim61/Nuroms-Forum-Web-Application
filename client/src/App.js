import './App.css';
import Navbar from './Components/Navbar/Navbar';

// import { useDispatch, useSelector } from 'react-redux';
// import { setNavigation } from  './store/slices/navigationSlice'
// import { useState } from 'react';
import PageSelector from './Components/PageSelector/PageSelector';


function App() {
  return (
    <>
    <div className='Container'>
     <div className="navbar">
       <Navbar/>
      </div>
      <PageSelector/>
    </div>
    </>
  );
}

export default App;
