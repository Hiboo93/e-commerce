import { createContext, ReactNode, useContext, useEffect } from "react";
import { useState } from "react";
import { AppContextType, UserCredentialsType } from "./types.ts";

export type ChildrenType = {
  children: ReactNode;
};

export const defaultCredentials: UserCredentialsType = {
  user: {
    firstName: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    role: '',
    accessToken: ""
  }
};

const AppContext = createContext<AppContextType>({
  userCredentials: defaultCredentials,
  setUserCredentials: () => {},
  setIsConnected: () => {},
  isConnected: false,
});

export const AppContextProvider = ({ children }: ChildrenType) => {
  const [userCredentials, setUserCredentials] = useState<UserCredentialsType>(
    getStoredCredentials() || defaultCredentials
  );
  
  const [isConnected, setIsConnected] = useState<boolean>(false);

  // Fonction pour récupérer les credentials stockés dans localStorage
  function getStoredCredentials(): UserCredentialsType | null {
    let data = localStorage.getItem("credentials");
    if (data) {
      let json = JSON.parse(data);
      return json as UserCredentialsType;
    }
    return null;
  }

  // useEffect pour stocker les credentials au montage du composant
  useEffect(() => {
    if (userCredentials && userCredentials.user.email) {
      localStorage.setItem("credentials", JSON.stringify(userCredentials));
    }
  }, [userCredentials]);

  return (
    <AppContext.Provider
      value={{
        userCredentials,
        setUserCredentials,
        isConnected,
        setIsConnected,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
