import { useState } from 'react';
import axios from 'axios';
import createUser from '../../../shared/src/CreateUser';


axios.defaults.baseURL = 'http://localhost:3001';

export default function Users() {


    const [WriteUser, setWriteUser] = useState<string>('');
    const [user, setUser] = useState<createUser>();
    const [error,setErr]= useState<string>('')

  const addUser = async (user:string)=>{
      if (!user) {
          setErr('ange en valid username')
      } else {
          const response = await axios.post<createUser>('/createUser', { user })
          setUser(response.data)
          console.log(user)
                    
    }
  };


    return (
        <>
            {/* <h1> ange din användarnamn för att kunna  delta i chatten </h1>
            <p></p>

            ange användarnamn <input type="text" value={user} onChange={(e)=>setUser(e.target.value)} />
             <button  onClick={(e)=>  props.onSend(user) } > send  </button>  */}
            
            <h1> ange din användarnamn för att kunna  delta i chatten </h1>
            <p></p>

            ange användarnamn <input type="text" value={WriteUser} onChange={(e)=>setWriteUser(e.target.value)} />
            <button onClick={(e) => addUser(WriteUser)} > send  </button> 
            
            {error ? error: user}
           
        </>
    )
}

