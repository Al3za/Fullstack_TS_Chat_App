import { useState } from 'react';


export default function Users( props:{onSend:(item:string|undefined)=>void} ) {

    const [user, setUser] = useState<string|undefined>();

    return (
        <>
            <h1> ange din användarnamn för att kunna  delta i chatten </h1>
            <p></p>

            ange användarnamn <input type="text" value={user} onChange={(e)=>setUser(e.target.value)} />
             <button  onClick={(e)=>  props.onSend(user) } > send  </button> 
           
        </>
    )
}

