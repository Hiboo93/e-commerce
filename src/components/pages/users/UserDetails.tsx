import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserType } from "../../../types.ts";
import { defaultCredentials, useAppContext } from "../../../AppContext.tsx";

export default function UserDetails() {
  const [user, setUser] = useState<UserType>({});
  const { userCredentials, setUserCredentials } = useAppContext()
  const params = useParams()
  const navigate = useNavigate()

  async function getUserDetails() {
    try {
      const response = await fetch(`http://localhost:4000/users/${params.id}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + userCredentials.user.accessToken
        }
      })

      const data = await response.json()

      if (response.ok) {
        setUser(data)
      }
      else if (response.status === 401) {
        setUserCredentials(defaultCredentials)
        navigate("/auth/login")
      }
      else {
        alert("Unable to read the user details: " + data)
      }
    } catch (error) {
      alert("Unable to connect to the server")
    }
  }

  useEffect(() => {
    getUserDetails()
  }, [])

  return (
    <div className="container my-4">
      <h2 className="text-3xl font-bold mb-3">User Details</h2>

      <hr />

      <div className="mb-3">
        <div className="grid grid-cols-4">ID</div>
        <div className="grid grid-cols-8">{user.id}</div>
      </div>

      <div className="mb-3">
        <div className="grid grid-cols-4">First Name</div>
        <div className="grid grid-cols-8">{user.firstName}</div>
      </div>

      <div className="mb-3">
        <div className="grid grid-cols-4">Last Name</div>
        <div className="grid grid-cols-8">{user.lastName}</div>
      </div>

      <div className="mb-3">
        <div className="grid grid-cols-4">Email</div>
        <div className="grid grid-cols-8">{user.email}</div>
      </div>

      <div className="mb-3">
        <div className="grid grid-cols-4">Phone</div>
        <div className="grid grid-cols-8">{user.phone}</div>
      </div>

      <div className="mb-3">
        <div className="grid grid-cols-4">Address</div>
        <div className="grid grid-cols-8">{user.address}</div>
      </div>

      <div className="mb-3">
        <div className="grid grid-cols-4">Role</div>
        <div className="grid grid-cols-8">
          {!user.id ? "" : user.role === "admin" ? 
            <div className="badge badge-warning gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-4 w-4 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
              Admin
            </div>
           : 
            <div className="badge badge-success gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-4 w-4 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
              Client
            </div>
          }
        </div>
      </div>

      <hr />

      <Link to="/admin/users" className="btn btn-sm btn-secondary my-3">
        Back
      </Link>
    </div>
  );
}
