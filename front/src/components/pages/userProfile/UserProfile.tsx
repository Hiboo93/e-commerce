import { useState } from "react";
import { defaultCredentials, useAppContext } from "../../../AppContext.tsx";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const [action, setAction] = useState("default");

  return (
    <div className="container mx-auto my-4">
      <div className="flex">
        {action === "default" && (
          <div className="px-5 rounded-sm">
            <h2 className="text-4xl">User Profile</h2>
            <Details />
            <div className="my-5 h-[25px]">
              <div className="border-y-2 border-black h-[25px]" />
            </div>
            <button
              type="button"
              className="btn btn-sm btn-primary mr-2"
              onClick={() => setAction("update_profile")}
            >
              Update Profile
            </button>
            <button
              type="button"
              className="btn btn-sm btn-warning"
              onClick={() => setAction("update_password")}
            >
              Update Password
            </button>
          </div>
        )}

        {action === "update_profile" && (
          <div className="mx-auto rounded-sm border p-4">
            <h2 className="text-center mb-3 text-4xl">Update Profile</h2>
            <UpdateProfiile />
            <div className="my-5 h-[25px]">
              <div className="border-y-2 border-black h-[25px]" />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-link no-underline decoration-blue-500"
                onClick={() => setAction("default")}
              >
                Back to Profile
              </button>
            </div>
          </div>
        )}

        {action === "update_password" && (
          <div className="mx-auto rounded-sm border p-4 w-[400px]">
            <h2 className="text-center mb-3 text-4xl">Update Password</h2>
            <UpdatePassword />
            <div className="my-5 h-[25px]">
              <div className="border-y-2 border-black h-[25px]" />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-link no-underline decoration-blue-500"
                onClick={() => setAction("default")}
              >
                Back to Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Details() {
  const { userCredentials } = useAppContext();
  return (
    <>
      <div className="my-3">
        <div>First Name</div>
        <div>{userCredentials.user.firstName}</div>
      </div>

      <div className="my-3">
        <div>Last Name</div>
        <div>{userCredentials.user.lastName}</div>
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
  );
}

function UpdateProfiile() {
  const { userCredentials, setUserCredentials } = useAppContext();
  const navigate = useNavigate();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const elementForm = event.target as HTMLFormElement;
    const formData = new FormData(elementForm);
    const user = Object.fromEntries(formData.entries());

    if (!user.firstName || !user.lastName || !user.email) {
      alert("Please fill all the required fields !");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:4000/users/${userCredentials.user.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + userCredentials.user.accessToken,
          },
          body: JSON.stringify(user),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("User Profile updated correctly !");
        console.log("server response:", data);
        setUserCredentials({ ...userCredentials, user: data });
      } else if (response.status === 401) {
        setUserCredentials(defaultCredentials);
        navigate("/auth/login");
      } else {
        alert("Unable to update the profile" + data);
      }
    } catch (error) {
      alert("unable to connect to the server!");
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="my-2">
          <label htmlFor="firstName" className="mr-3">
            First Name
          </label>
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            className="input input-bordered w-full max-w-xs"
            defaultValue={userCredentials.user.firstName}
          />
        </div>

        <div className="my-2">
          <label htmlFor="lastName" className="mr-3">
            Last Name
          </label>
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            className="input input-bordered w-full max-w-xs"
            defaultValue={userCredentials.user.lastName}
          />
        </div>

        <div className="my-2">
          <label htmlFor="email" className="mr-12">
            Email
          </label>
          <input
            type="text"
            placeholder="Email"
            name="email"
            className="input input-bordered w-full max-w-xs"
            defaultValue={userCredentials.user.email}
          />
        </div>

        <div className="my-2">
          <label htmlFor="phone" className="mr-10">
            Phone
          </label>
          <input
            type="text"
            placeholder="Phone"
            name="phone"
            className="input input-bordered w-full max-w-xs"
            defaultValue={userCredentials.user.phone}
          />
        </div>

        <div className="my-2">
          <label htmlFor="address" className="mr-7">
            Address
          </label>
          <input
            type="text"
            placeholder="Address"
            name="address"
            className="input input-bordered w-full max-w-xs"
            defaultValue={userCredentials.user.address}
          />
        </div>

        <div className="text-end">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

function UpdatePassword() {
  const { userCredentials, setUserCredentials } = useAppContext();
  const navigate = useNavigate();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formElement = event.target as HTMLFormElement;

    const password = formElement.password.value;
    const confirm_password = formElement.confirm_password.value;

    if (!password) {
      alert("Please fill the new Password!");
      return;
    }

    if (password !== confirm_password) {
      alert("Password and confirm Password do not match");
      return;
    }

    const passwordObj = { password };

    try {
      const response = await fetch(
        `http://localhost:4000/users/${userCredentials.user.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + userCredentials.user.accessToken,
          },
          body: JSON.stringify(passwordObj),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Password Updated correctly !");
        console.log("server response:", data);
      } else if (response.status === 401) {
        setUserCredentials(defaultCredentials);
        navigate("/auth/login");
      } else {
        alert("Unable to update password" + data);
      }
    } catch (error) {
      alert("unable to connect to the server!");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="password ">New Password </label>
        <input
          type="password"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          name="password"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="confirm_password ">Confirm Password </label>
        <input
          type="password"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          name="confirm_password"
        />
      </div>

      <div className="text-end">
        <button type="submit" className="btn btn-warning">
          Submit
        </button>
      </div>
    </form>
  );
}

export default UserProfile;
