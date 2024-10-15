import { useState } from "react"
import { useAppContext } from "../../../AppContext.tsx"
import { AppContextType } from "../../../types.ts"

function UserProfile() {
  const [ action , setAction] = useState("default")

  return (
    <div className="container mx-auto my-4">
      <div>
        {
          action === "default" &&
          <div className="px-5 rounded-sm">
            <h2 className="text-4xl">User Profile</h2>
            <Details/>
            <div className="my-5 h-[25px]">
              <div className="border-y-2 border-black h-[25px]"/>
            </div>
            <button type="button" className="btn btn-sm btn-primary mr-2" onClick={() => setAction("update_profile")}>
              Update Profile
            </button>
            <button type="button" className="btn btn-sm btn-warning" onClick={() => setAction("update_password")}>
              Update Password
            </button>
          </div>
        }
        
        {
          action === "update_profile" &&
          <div className="mx-auto rounded-sm border p-4">
            <h2 className="text-center mb-3 text-4xl">Update Profile</h2>
            <div className="my-5 h-[25px]">
              <div className="border-y-2 border-black h-[25px]"/>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-link no-underline decoration-blue-500" onClick={() => setAction("default")}>
                Back to Profile
              </button>
            </div>
          </div>
        }

        {
          action === "update_password" &&
          <div className="mx-auto rounded-sm border p-4 w-[400px]">
            <h2 className="text-center mb-3 text-4xl">Update Password</h2>
            <div className="my-5 h-[25px]">
              <div className="border-y-2 border-black h-[25px]"/>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-link no-underline decoration-blue-500" onClick={() => setAction("default")}>
              Back to Profile
              </button>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

function Details() {
  const {userCredentials} = useAppContext()
  return (
    <>
      <div className="my-3">
        <div>First Name</div>
        <div>{userCredentials.user.firstName}</div>
      </div>

      <div className="mb-3">
        <div>Email</div>
        <div>{userCredentials.user.email}</div>
      </div>
      
      <div className="mb-3">
        <div>Phone</div>
        <div>{userCredentials.user.phone}</div>
      </div>

      <div className="mb-3">
        <div>Address</div>
        <div>{userCredentials.user.address}</div>
      </div>

      <div className="mb-3">
        <div>Role</div>
        <div>{userCredentials.user.role === "admin" ? "Admin" : "Client"}</div>
      </div>
    </>
  )
}

export default UserProfile
