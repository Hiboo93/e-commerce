import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { defaultCredentials, useAppContext } from "../../../AppContext.tsx";
import { UserType } from "../../../types.ts";

function UserList() {
  const [users, setUsers] = useState<UserType[]>([]);
  const { userCredentials, setUserCredentials } = useAppContext()
  
  const navigate = useNavigate()

  async function getUsers() {
    try {
      const response = await fetch(`http://localhost:4000/users`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + userCredentials.user.accessToken
        }
      })

      const data = await response.json()

      if (response.ok) {
        setUsers(data)
      }
      else if (response.status === 401) {
        setUserCredentials(defaultCredentials)
        navigate("/auth/login")
      }
      else {
        alert("Unable to read the data: " + data)
      }
    } catch (error) {
      alert("Unable to connect to the server")
    }
  }

  useEffect(() => {
    getUsers()
  }, [])
  

  return (
    <div className="container mx-auto my-4 p-4">
      <h2 className="text-3xl font-bold text-center mb-5">List of Users</h2>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users.map((user, index) => (
              <tr className="bg-base-200" key={index}>
                <th>{user.id}</th>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === "admin" ? (
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
                  ) : (
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
                  )}
                </td>
                <td>
                  <button className="btn btn-sm btn-primary">
                    <Link className="link link-hover" to={`/admin/users/details/${user.id}`}>Details</Link>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserList;
