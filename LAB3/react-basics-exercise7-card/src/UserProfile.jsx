import PropTypes from "prop-types";
import React from "react";

function UserProfile({ userData, theme = "light" }) {
  // userData được truyền từ App.jsx; theme mặc định = 'light'

  return (
    <div className={`profile-card theme-${theme}`}>
      <>
        <h2>User Profile</h2>
        <img
          className="profile-avatar"
          src={userData.avatarUrl}
          alt={userData.name}
          width={userData.imageSize}
          height={userData.imageSize}
        />
        <p>Name: {userData.name}</p>
        <p>Email: {userData.email}</p>
      </>
    </div>
  );
}

// Prop validation
UserProfile.propTypes = {
  userData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string,
    avatarUrl: PropTypes.string,
    imageSize: PropTypes.number,
  }).isRequired,
  theme: PropTypes.string,
};

export default UserProfile;
