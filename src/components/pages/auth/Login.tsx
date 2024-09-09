import { MdEmail } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAppContext } from "../../../AppContext.tsx";

function Login() {
  const navigate = useNavigate()
  const { userCredentials, setUserCredentials} = useAppContext()

  if (userCredentials) {
    return <Navigate to="/" />
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => { 
    event.preventDefault()

    const elementForm = event.target as HTMLFormElement
    let email = elementForm.email.value
    let password = elementForm.password.value

    if (!email || !password) {
      alert("Please fill the login form")
    }

    const credentials = {email, password}
    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(credentials)
      })

      const data = await response.json()

      if (response.ok) {
        console.log("server response: ", data);
        setUserCredentials(data)
        navigate("/")
      }else {
        alert("Unable to login: " + data)
      }
    } catch (error) {
      alert("Unable to connect to the server")
    }
   }
  return (
    <div className="h-screen">
      <div className="container mx-auto h-full  flex justify-center items-center ">
        <div className="w-[400px] px-7 py-9 bg-slate-300 border rounded-2xl h-[300px]">
          <div className="text-center mb-5">
            <h1 className="text-2xl">Welcome, please login</h1>
          </div>

          <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
            <label className="input input-bordered flex items-center gap-2">
              <MdEmail />
              <input
                type="text"
                className="grow"
                placeholder="Email"
                name="email"
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <FaKey />
              <input type="password" className="grow" placeholder="Password"  name="password" />
            </label>
            
            <div className="flex gap-4">
              <div>
                <button type="submit" className="btn btn-sm btn-primary">Login</button>
              </div>
              <div>
                <Link to="/" className="btn btn-sm btn-outline btn-primary" role="button">Cancel</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
