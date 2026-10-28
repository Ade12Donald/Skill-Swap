import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router";
import { X } from "lucide-react";
import "./customize.css";

const Customize = () => {
  const { state } = useLocation();
  const [reached, setReached] = useState(false);
  const [error, setError] = useState("");
  const [skillsToLearn, setSkillsToLearn] = useState([]);
  const [skillsToTeach, setSkillsToTeach] = useState([]);

  const [offerTitle, setOfferTitle] = useState("");
  const [offerLevel, setOfferLevel] = useState("");
  const [learnTitle, setLearnTitle] = useState("");
  const [learnLevel, setLearnLevel] = useState("");
  const [formdata, setFormdata] = useState();

  useEffect(() => {
    const id = setTimeout(() => setReached(true), 100);
    return () => clearTimeout(id);
  }, []);

  if (!state) return <Navigate to="/signup" replace />;
  let { formData } = state;

  const addSkill = (title, level, list, setList, clearTitle, clearLevel) => {
    const clean = title.trim().toLowerCase();
    if (!clean || !level) return setError("Enter a skill and pick a level");
    if (list.some((s) => s.title === clean)) return setError("Already added");

    setList([...list, { title: clean, level }]);
    clearTitle("");
    clearLevel("");
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormdata({ ...formData, skillsToTeach, skillsToLearn });
    console.log(formdata);
    if (skillsToTeach.length === 0 || skillsToLearn.length === 0) {
      return setError("Add at least one skill to offer and one to learn");
    }
    console.log(error);
  };
  //   const handleChange = (e) => {
  //     setFormData({ ...formData, [e.target.name]: e.target.value });
  //   };
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
              <label
                htmlFor="offer-skill"
                className=" my-auto text-[1rem] mr-2"
              >
                Skills to Offer:{" "}
              </label>
              <input
                className="input input-bordered flex-1"
                placeholder="e.g. react"
                id="offer-skill"
                value={offerTitle}
                onChange={(e) => setOfferTitle(e.target.value)}
              />

              <div className="flex  mt-1.5 mb-2">
                <div>
                  <select
                    name="level"
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
                    {" "}
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
            </div>
            {/* SKILL TO LEARN */}
            <div>
              <label htmlFor="learn-skill" className="my-auto text-[1rem] mr-2">
                Skills to Learn:{" "}
              </label>
              <input
                className="input input-bordered flex-1"
                placeholder="e.g. react"
                value={learnTitle}
                id="learn-skill"
                onChange={(e) => setLearnTitle(e.target.value)}
              />
              <div className="flex  mt-1.5 mb-2">
                <div>
                  <select
                    name="level"
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
            </div>

            {error && <p className="text-error text-sm">{error}</p>}
            <div className="card-actions justify-center mt-2">
              <button type="submit" className="btn btn-wide bg-base-200">
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Customize;
