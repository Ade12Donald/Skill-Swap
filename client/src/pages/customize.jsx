import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import axios from "axios";
import { X } from "lucide-react";
import "./customize.css";
import { userSchema } from "../schemas/userSchema";

const skillsSchema = userSchema.pick({
  skillToTeach: true,
  skillToLearn: true,
});

const Customize = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [reached, setReached] = useState(false);
  const [errors, setErrors] = useState({});
  const [skillsToLearn, setSkillsToLearn] = useState([]);
  const [skillsToTeach, setSkillsToTeach] = useState([]);

  const [offerTitle, setOfferTitle] = useState("");
  const [offerLevel, setOfferLevel] = useState("");
  const [learnTitle, setLearnTitle] = useState("");
  const [learnLevel, setLearnLevel] = useState("");

  useEffect(() => {
    const id = setTimeout(() => setReached(true), 100);
    return () => clearTimeout(id);
  }, []);

  if (!state) return <Navigate to="/signup" replace />;
  const { formData } = state;

  // `section` tells us which list the message belongs to
  const addSkill = (
    section,
    title,
    level,
    list,
    setList,
    clearTitle,
    clearLevel,
  ) => {
    const clean = title.trim().toLowerCase();
    if (!clean || !level)
      return setErrors({ [section]: "Enter a skill and pick a level" });
    if (list.some((s) => s.title === clean))
      return setErrors({ [section]: "Already added" });

    setList([...list, { title: clean, level }]);
    clearTitle("");
    clearLevel("");
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = skillsSchema.safeParse({
      skillToTeach: skillsToTeach,
      skillToLearn: skillsToLearn,
    });

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
      await axios.post(
        "http://localhost:5000/api/user/create",
        { ...formData, ...result.data },
        { withCredentials: true },
      );
      navigate("/login", { replace: true });
    } catch (err) {
      console.log(err); // the whole error
      console.log(err.response?.status, err.response?.data);
      setErrors({
        form:
          err.response?.data?.message ||
          err.response?.data?.error ||
          err.message, // e.g. "Network Error" or "Request failed with status code 404"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-dvh flex content-center">
      <div className="card card-border m-auto bg-base-100 w-auto">
        <div className="card-body ">
          <h2 className="card-title mx-auto mb-3 text-2xl">Almost Done !!!</h2>
          <ul className="steps mb-4">
            <li className="step step-primary">Getting Started</li>
            <li className="step step-primary">Sign Up</li>
            <li
              className={`step transition-all duration-3000 ${
                reached ? "step-primary" : ""
              }`}
            >
              Customize
            </li>
            <li className="step">DONE!!</li>
          </ul>

          <form onSubmit={handleSubmit} className="flex flex-col gap-2 ">
            {/* SKILL TO OFFER */}
            <div>
              <label htmlFor="offer-skill" className="my-auto text-[1rem] mr-2">
                Skills to Offer:{" "}
              </label>
              <input
                className="input input-bordered flex-1"
                placeholder="e.g. react"
                id="offer-skill"
                value={offerTitle}
                onChange={(e) => setOfferTitle(e.target.value)}
              />

              <div className="flex mt-1.5 mb-2">
                <div>
                  <select
                    className="select"
                    id="offer-level"
                    value={offerLevel}
                    onChange={(e) => setOfferLevel(e.target.value)}
                  >
                    <option value="" disabled>
                      LEVEL
                    </option>
                    <option value="intermediate">Intermediate</option>
                    <option value="expert">Expert</option>
                  </select>
                  <button
                    type="button"
                    className="btn ml-2"
                    onClick={() =>
                      addSkill(
                        "skillToTeach",
                        offerTitle,
                        offerLevel,
                        skillsToTeach,
                        setSkillsToTeach,
                        setOfferTitle,
                        setOfferLevel,
                      )
                    }
                  >
                    ADD
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {skillsToTeach.map((s) => (
                  <span key={s.title} className="badge badge-lg gap-1">
                    {s.title} · {s.level}
                    <button
                      type="button"
                      onClick={() =>
                        setSkillsToTeach(
                          skillsToTeach.filter((x) => x.title !== s.title),
                        )
                      }
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
              {errors.skillToTeach && (
                <p className="text-error text-sm mt-1">{errors.skillToTeach}</p>
              )}
            </div>

            {/* SKILL TO LEARN */}
            <div>
              <label htmlFor="learn-skill" className="my-auto text-[1rem] mr-2">
                Skills to Learn:{" "}
              </label>
              <input
                className="input input-bordered flex-1"
                placeholder="e.g. react"
                id="learn-skill"
                value={learnTitle}
                onChange={(e) => setLearnTitle(e.target.value)}
              />

              <div className="flex mt-1.5 mb-2">
                <div>
                  <select
                    className="select"
                    id="learn-level"
                    value={learnLevel}
                    onChange={(e) => setLearnLevel(e.target.value)}
                  >
                    <option value="" disabled>
                      LEVEL
                    </option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="expert">Expert</option>
                  </select>
                  <button
                    type="button"
                    className="btn ml-2"
                    onClick={() =>
                      addSkill(
                        "skillToLearn",
                        learnTitle,
                        learnLevel,
                        skillsToLearn,
                        setSkillsToLearn,
                        setLearnTitle,
                        setLearnLevel,
                      )
                    }
                  >
                    ADD
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {skillsToLearn.map((s) => (
                  <span key={s.title} className="badge badge-lg gap-1">
                    {s.title} · {s.level}
                    <button
                      type="button"
                      onClick={() =>
                        setSkillsToLearn(
                          skillsToLearn.filter((x) => x.title !== s.title),
                        )
                      }
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
              {errors.skillToLearn && (
                <p className="text-error text-sm mt-1">{errors.skillToLearn}</p>
              )}
            </div>

            {/* only the general (server) error stays at the bottom */}
            {errors.form && <p className="text-error text-sm">{errors.form}</p>}

            <div className="card-actions justify-center mt-2">
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default Customize;
