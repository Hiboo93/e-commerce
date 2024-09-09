import { FaPhoneAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAppContext } from "../../../AppContext.tsx";

function Register() {
  const navigate = useNavigate()
  const {userCredentials, setUserCredentials} = useAppContext()

  if (userCredentials) {
    return <Navigate to="/" />
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => { 
    event.preventDefault()

    const formElement = event.target as HTMLFormElement;
    let formData = new FormData(formElement)
    let user = Object.fromEntries(formData.entries())

    if (!user.firstName || !user.lastName || !user.phone || !user.address || !user.email || !user.password || !user.confirm_password) {
      alert("Please fill all the fields")
      return
    }

    if (user.password !== user.confirm_password) {
      alert("Password and Confirm Password do not match")
      return
    }

    delete user.confirm_password

    try {
      const response = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(user)
      })

      const data = await response.json()

      if (response.ok) {
        console.log("server response: ", data);
        setUserCredentials(data)
        navigate("/")
      }else {
        alert("Unable to register: " + data)
      }
    } catch (error) {
      alert("Unable to connect to the server")
    }
   }
  return (
    <div className="h-screen">
      <div className="container mx-auto h-full  flex justify-center items-center ">
        <div className="w-[400px] px-7 py-9 bg-slate-300 border rounded-2xl h-[600px]">
          <div className="text-center mb-5">
            <h1 className="text-2xl">Create new Account</h1>
          </div>

          <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
            <label className="input input-bordered flex items-center gap-2">
              <FaUser />
              <input
                type="text"
                className="grow"
                placeholder="First Name"
                name="firstName"
                required
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <FaUser />
              <input
                type="text"
                className="grow"
                placeholder="Last Name"
                name="lastName"
                required
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <FaPhoneAlt />
              <input
                type="text"
                className="grow"
                placeholder="Phone"
                name="phone"
                required
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <FaMapMarkerAlt />
              <input
                type="text"
                className="grow"
                placeholder="Address"
                name="address"
                required
              />
            </label>
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
              <input type="password" className="grow"  name="password" />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <FaKey />
              <input type="password" className="grow"  name="confirm_password" placeholder="Confirm password" />
            </label>

            <div className="flex gap-4">
              <div>
                <button type="submit" className="btn btn-sm btn-primary">Register</button>
              </div>
              <div>
                <Link to="/" className="btn btn-sm btn-outline btn-primary" role="button">Cancel</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
