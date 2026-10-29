import { useState } from "react";

export default function Avatar({
  photo,
  firstName = "",
  lastName = "",
  size = "w-10",
}) {
  const [broken, setBroken] = useState(false);

  const initials =
    `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase() || "?";

  if (photo && !broken) {
    return (
      <div className="avatar">
        <div className={`${size} rounded-full `}>
          <img
            src={photo}
            alt={`${firstName} ${lastName}`}
            onError={() => setBroken(true)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="avatar avatar-placeholder">
      <div className={`${size} rounded-full bg-neutral text-neutral-content`}>
        <span className="text-sm">{initials}</span>
      </div>
    </div>
  );
}
