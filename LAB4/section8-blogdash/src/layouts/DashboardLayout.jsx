import { Link, Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div>
      <nav>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}
