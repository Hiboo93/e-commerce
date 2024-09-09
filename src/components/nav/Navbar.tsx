import { Link } from "react-router-dom";
import { NAVLINKS, NAVLINKSADMIN } from "../../constants.ts";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {NAVLINKS.map((link, index) => (
              <li key={index}>
                <Link to={link.href}>{link.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">Best Store</Link>
      </div>
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1">
          {NAVLINKS.map((link, index) => (
            <li key={index}>
              <Link to={link.href}>{link.title}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end">
        <ul className="menu menu-horizontal px-3">
          <li>
            <details>
              <summary>Admin</summary>
              <ul className="bg-base-100 rounded-t-none p-2">
                {NAVLINKSADMIN.map((link, index) => (
                  <li key={index}>
                    <Link to={link.href}>{link.title}</Link>
                  </li>
                ))}
              </ul>
            </details>
          </li>
        </ul>
      </div>

      <ul>
        <li className="mx-1">
          <Link to={"/auth/register"} className="btn btn-sm btn-outline btn-primary" role="button">Register</Link>
        </li>
        <li className="mx-1">
          <Link to={"/auth/login"} className="btn btn-sm btn-primary" role="button">Login</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
