import { Navigate } from "react-router-dom"
import { ChildrenType, useAppContext } from "../../AppContext.tsx"


export function AdminRoute({children}: ChildrenType) {
  const {userCredentials} = useAppContext()

  if (!userCredentials || userCredentials.user.role !== "admin") {
    return <Navigate to="/"/>
  }

  return (
    <>
      {children}
    </>
  )
}

export function AuthenticationUserRoute({children}: ChildrenType) {
  const {userCredentials} = useAppContext()

  if (!userCredentials) {
    return <Navigate to="/"/>
  }

  return (
    <>
      {children}
    </>
  )
}

export function VisitorRoute({children}: ChildrenType) {
  const {userCredentials} = useAppContext()

  if (userCredentials) {
    return <Navigate to="/"/>
  }

  return (
    <>
      {children}
    </>
  )
}

