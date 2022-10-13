import { useState } from 'react';


//import TodoItem from '@app-todo/shared'




const Users = (props:{sendUser:(item:string)=>void}) => {

    const [WriteUser, setWriteUser] = useState<string>('');
    
   
    
    
    return (
        <>
            
            <h1> ange din användarnamn för att kunna  delta i chatten </h1>
            <p></p>

            ange användarnamn <input type="text" value={WriteUser} onChange={(e)=>setWriteUser(e.target.value)} />
            <button onClick={(e)=> props.sendUser(WriteUser) } > send  </button> 
            
           
        </>
    )
}

export default Users;