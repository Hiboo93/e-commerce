export type ProductsType = {
  id?: string;
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

export type UserCredentialsType = {
  firstName?: string;
  email?: string;
}

export type AppContextType = {
  userCredentials: UserCredentialsType;
  setUserCredentials: React.Dispatch<React.SetStateAction<UserCredentialsType>>;
}
