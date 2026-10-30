import { useState } from "react";
import { FaGoogle } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaYahoo } from "react-icons/fa6";
import { PiMicrosoftOutlookLogoFill } from "react-icons/pi";
import { NavLink, useNavigate } from "react-router";
import "./signUp.css";
import axios from "axios";
import loginSchema from "../schemas/loginSchema";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      const found = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0];
        if (!found[field]) found[field] = issue.message;
      }
      return setErrors(found);
    }

    setErrors({});
    setLoading(true);

    try {
      await axios.post("http://localhost:5000/api/user/login", result.data, {
        withCredentials: true,
      });
      navigate("/dashboard", { replace: true });
    } catch (err) {
      const status = err.response?.status;

      if (status === 400) {
        setErrors({ form: "Invalid email or password" });
      } else if (status === 404) {
        setErrors({ form: "No account found with that email" });
      } else if (!err.response) {
        setErrors({ form: "Can't reach the server. Is it running?" });
      } else {
        setErrors({ form: "Something went wrong. Try again." });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="h-dvh flex content-center">
      <div className="card card-border m-auto bg-base-100 w-100">
        <div className="card-body ">
          <h2 className="card-title mx-auto mb-3 text-2xl uppercase">
            Sign In
          </h2>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-2 "
          >
            <div className="flex flex-col">
              <label htmlFor="email" className="my-auto text-[1rem] mr-2">
                Email:
              </label>
              <input
                type="email"
                placeholder="e.g johnSmith@gmail.com"
                name="email"
                id="email"
                value={formData.email}
                onChange={(e) => handleChange(e)}
                className="border rounded-l px-2.5 py-1
                flex-1"
                required
              />
              {errors.email && (
                <p className="text-error text-sm">{errors.email}</p>
              )}
            </div>
            <div className="flex flex-col justify-between">
              <label htmlFor="password" className="my-auto text-[1rem] mr-2">
                Password:
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={(e) => handleChange(e)}
                className="border rounded-l px-2.5 py-1 flex-1"
                placeholder="Enter your password"
                required
              />
              {errors.password && (
                <p className="text-error text-sm">{errors.password}</p>
              )}
            </div>
            {errors.form && (
              <p className="text-error text-sm text-start mb-0">
                {errors.form}
              </p>
            )}
            <div className="card-actions justify-center mt-2">
              <div className="card-actions justify-center">
                <button
                  type="submit"
                  className="btn btn-wide bg-base-200"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </div>
            </div>
            <p className="text-center">
              Don't have an Account?
              <NavLink to={"/signUp"} className=" text-base-200">
                {" "}
                Click here!
              </NavLink>
            </p>
            <div className="flex gap-6 justify-center mt-1.5">
              <FaGoogle size={20} />
              <FaGithub size={20} />
              <MdEmail size={20} />
              <FaYahoo size={20} />
              <PiMicrosoftOutlookLogoFill size={20} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
