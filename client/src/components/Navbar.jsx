import { useEffect, useState } from "react";
import { NavLink } from "react-router";

const Navbar = () => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light",
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleThemeChange = (e) => {
    setTheme(e.target.checked ? "dark" : "light");
  };

  return (
    <div className="sticky top-px z-50 bg-base-100/80 backdrop-blur px-6 py-2">
      <nav className="mt-2 ml-2 flex">
        <div className="avatar avatar-placeholder flex-1">
          <div className="bg-neutral text-neutral-content w-8 rounded-full">
            <span id="UIlOGO" className="text-xs">
              UI
            </span>
          </div>
          <NavLink to="/">
            <label htmlFor="UIlOGO" className=" ml-2 text-xl">
              Skill Swap
            </label>
          </NavLink>
          <div></div>
        </div>
        <div>
          <NavLink to="/Login">
            <span>
              <button className="btn btn-ghost rounded-2xl text-buttonTextBlack mx-.75">
                Login
              </button>
            </span>
          </NavLink>
          <NavLink to="/signUp">
            <span className="mx-.75">
              <button className="btn btn-ghost rounded-2xl  text-buttonTextBlack">
                Create an Account
              </button>
            </span>
          </NavLink>
          <label className="toggle text-base-content">
            <input
              type="checkbox"
              value="dark"
              className="theme-controller"
              checked={theme === "dark"}
              onChange={handleThemeChange}
            />

            <svg
              aria-label="sun"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2"></path>
                <path d="M12 20v2"></path>
                <path d="m4.93 4.93 1.41 1.41"></path>
                <path d="m17.66 17.66 1.41 1.41"></path>
                <path d="M2 12h2"></path>
                <path d="M20 12h2"></path>
                <path d="m6.34 17.66-1.41 1.41"></path>
                <path d="m19.07 4.93-1.41 1.41"></path>
              </g>
            </svg>

            <svg
              aria-label="moon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
              </g>
            </svg>
          </label>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
