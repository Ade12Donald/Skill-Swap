import Image from "./Image.jsx";

const Avatar = ({ photo, firstName, lastName, size }) => {
  return (
    <Image
      key={photo}
      photo={photo}
      firstName={firstName}
      lastName={lastName}
      size={size}
    />
  );
};

export default Avatar;
