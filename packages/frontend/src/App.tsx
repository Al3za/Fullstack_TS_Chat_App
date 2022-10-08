import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Users from './pages/Users';
import LoadMongoData from './pages/LoadMongoData';


 

function App()  {  
  
  
 

  return (  


    <div className="App">

      <Routes>
        <Route path='/createUser' element={< Users />} />
        <Route path='TestFunc' element= <header className='App-header' > {<
           LoadMongoData  />} </header> />
      </Routes>

      
    </div>
  );
}

export default App;
