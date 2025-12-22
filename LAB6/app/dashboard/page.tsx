import React from "react";
import SettingsToggle from "./SettingsToggle";

async function getUserProfile() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return {
    name: "Nguyên - 23521065",
    role: "IT Student",
    major: "Web Development",
  };
}

export default async function DashboardPage() {
  const user = await getUserProfile();

  return (
    <div>
      <h1>User Profile (Server Component)</h1>
      <div
        style={{
          marginBottom: "20px",
          padding: "10px",
          border: "1px dashed blue",
        }}
      >
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>
        <p>
          <strong>Major:</strong> {user.major}
        </p>
        <p>
          <em>(Data fetched after 2 seconds delay)</em>
        </p>
      </div>

      <hr />
      <SettingsToggle />
    </div>
  );
}
