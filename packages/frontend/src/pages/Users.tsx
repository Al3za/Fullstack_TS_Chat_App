import { useState } from 'react';
import axios from 'axios';
import createUser from '../../../shared/src/CreateUser';


axios.defaults.baseURL = 'http://localhost:3001';

export default function Users() {


    const [WriteUser, setWriteUser] = useState<string>('');
    const [user, setUser] = useState<createUser>();
    const [error,setErr]= useState<string>('')

    const addUser = async (item: string) => {
    
            const newUser: createUser = {
                user: item
            }
            const response = await axios.post<createUser>('/createUser', newUser)
             setUser(response.data)
            //console.log(response.data)
            /* when you have to send data to another server via axios,
               you have to send it as an object to get the body */
            
  };


    return (
        <>
            
            <h1> ange din användarnamn för att kunna  delta i chatten </h1>
            <p></p>

            ange användarnamn <input type="text" value={WriteUser} onChange={(e)=>setWriteUser(e.target.value)} />
            <button onClick={(e) => addUser(WriteUser)} > send  </button> 
            
            {error ? error: user}
           
        </>
    )
}

