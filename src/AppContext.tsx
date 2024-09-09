import { createContext, ReactNode, useContext } from "react"
import { useState } from "react";
import { AppContextType, UserCredentialsType } from "./types.ts";


export type childrenType = {
  children : ReactNode
}

const appContext = createContext<AppContextType>({
  userCredentials : {},
  setUserCredentials : ()=>{},
})

export const AppContextProvider = ({ children }: childrenType) => {
  const [userCredentials, setUserCredentials] = useState<UserCredentialsType>({});

  return (
    <appContext.Provider value={{ userCredentials, setUserCredentials }}>
      {children}
    </appContext.Provider>
  )
}



export const useAppContext = () => useContext(appContext)