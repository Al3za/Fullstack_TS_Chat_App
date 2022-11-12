import { createContext, useContext } from "react";

export type globalContent = {
    userName: string,
    setUser:(c:string)=>void
};

export const myGlobalContext = createContext<globalContent>({
    userName:'allo',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setUser: () => {}
});

export const UseGlobalContext =()  => useContext(myGlobalContext);