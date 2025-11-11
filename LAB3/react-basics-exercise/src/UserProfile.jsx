function UserProfile() {
      const user = {
        name: "Adept Truong",
        email: "adept.truong@example.com",
        avatarUrl: "https://i.ytimg.com/vi/yEdpUOOisFA/maxresdefault.jpg",
        imageSize: 90,
      };
  return (
    <>
      <h2>User Profile</h2>
      <img
        className="profile-avatar"
        src={user.avatarUrl}
        alt={user.name}
        width={user.imageSize}
        height={user.imageSize}
      />
      <p>Name: Trương Mạnh Nguyên</p>
      <p>Email: truongmanhnguyen@example.com</p>
    </>
  );
}

export default UserProfile;
