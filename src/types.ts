export type ProductsType = {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  description?: string;
  imageFilename: string;
  createdAt: string;
}

export type ValidationErrorsType = {
  name?: string;
  brand?: string;
  category?: string;
  price?: string;
  description?: string;
  image?: string;
}

export type UserType = {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  password?: string;
  role?: string;
  accessToken?: string;
}

export type UserCredentialsType = {
  user: UserType;
};

export type AppContextType = {
  userCredentials: UserCredentialsType;
  setUserCredentials: React.Dispatch<React.SetStateAction<UserCredentialsType>>;
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>
  isConnected: boolean;
}


