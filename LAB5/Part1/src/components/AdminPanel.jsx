import React from "react";

// Simple Admin panel component placed in components folder as requested
const AdminPanel = () => {
  const heavy = React.useMemo(() => {
    const arr = new Array(150000).fill(0).map((_, i) => i);
    return arr.length;
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <h2>Admin Panel</h2>
      <p>Simulated heavy module content. Computation size: {heavy}</p>
    </div>
  );
};

export default AdminPanel;
