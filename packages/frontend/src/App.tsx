import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import LoadMongoData from './pages/LoadMongoData';
import { myGlobalContext } from './pages/Context_learning'
import Users from './pages/Users';
import { CreateUser } from './pages/CreateUser'


function App()  {  
  
  const navigate = useNavigate();
 
  const [userName, setUser] = useState<string>('')
  const [error,setError]=useState<string>('')
  
  const addUser = (item: string) => {
    if (!item || item === ' ') {
      setError('ange giltig username');
      return;
    }
    setUser(item)
    navigate('/todos') 
  }

  return (  

    <div className="App">

       <myGlobalContext.Provider  value={{userName,setUser}} >
        <Routes>
          <Route path='/' element={< CreateUser />} />
         <Route path='/login' element={< Users sendUser={addUser} />} />
        <Route path='/todos' element= <header className='App-header' > {<
           LoadMongoData  />} </header> />
        </Routes>
        </myGlobalContext.Provider> 

      {error && error}
      
    </div>
  );
}

export default App;

