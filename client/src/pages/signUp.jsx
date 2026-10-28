import { useState } from "react";
import { FaGoogle } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaYahoo } from "react-icons/fa6";
import { PiMicrosoftOutlookLogoFill } from "react-icons/pi";
import { NavLink, useNavigate } from "react-router";
import "./signUp.css";
import { userSchema } from "../schemas/userSchema";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    password: "",
  });
  const detailsSchema = userSchema.omit({
    skillToTeach: true,
    skillToLearn: true,
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = detailsSchema.safeParse(formData);

    if (!result.success) {
      const found = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0];
        if (!found[field]) found[field] = issue.message;
      }
      return setErrors(found);
    }

    setErrors({});
    navigate("/customize", { state: { formData: result.data } }); // send the cleaned copy
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="h-dvh flex content-center">
      <div className="card card-border m-auto bg-base-100 w-auto">
        <div className="card-body ">
          <h2 className="card-title mx-auto mb-3 text-2xl">
            Create an Account
          </h2>
          <ul className="steps mb-4">
            <li className="step step-primary">Getting Started</li>
            <li className="step step-primary">Sign Up</li>
            <li className="step ">Customize</li>
            <li className="step">DONE!!</li>
          </ul>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-2 "
          >
            <div className="flex gap-3">
              <div className="flex flex-col">
                <label htmlFor="firstName" className="text-s">
                  First Name:
                </label>

                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  required
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={(e) => handleChange(e)}
                  className="border rounded-l px-2.5 py-1 flex-1 "
                />
                {errors.firstName && (
                  <p className="text-error text-sm">{errors.firstName}</p>
                )}
              </div>

              <div className="flex flex-col">
                <label htmlFor="lastName" className="text-s">
                  Last Name:
                </label>

                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={(e) => handleChange(e)}
                  required
                  className="border rounded-l px-2.5 py-1 flex-1"
                />
                {errors.lastName && (
                  <p className="text-error text-sm">{errors.lastName}</p>
                )}
              </div>
            </div>
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
            <div className="flex flex-col">
              <label htmlFor="age" className="my-auto text-[1rem] mr-2">
                Age:
              </label>
              <input
                type="number"
                placeholder="e.g 21"
                name="age"
                id="age"
                value={formData.age}
                onChange={(e) => handleChange(e)}
                className="border rounded-l px-2.5 py-1 
              w-18.75"
                required
              />
              {errors.age && <p className="text-error text-sm">{errors.age}</p>}
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
            <div className="card-actions justify-center mt-2">
              <button type="submit" className="btn btn-wide bg-base-200">
                Next
              </button>
            </div>
            <p className="text-center">
              Already have an Account?
              <NavLink to={"/login"} className=" text-base-200">
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
