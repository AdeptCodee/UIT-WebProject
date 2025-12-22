import React from "react";

const ListItem = React.memo(function ListItem({ item, onDelete }) {

  console.log("ListItem render:", item.id);
  return (
    <li
      style={{
        padding: 8,
        borderBottom: "1px solid var(--border)",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <span style={{ color: "inherit" }}>
        {item.text} (value: {item.value})
      </span>
      <button
        onClick={() => onDelete(item.id)}
        style={{
          background: "#dc3545",
          color: "#fff",
          border: "none",
          padding: "6px 10px",
          borderRadius: 4,
        }}
      >
        Delete
      </button>
    </li>
  );
});

const HeavyList = () => {
  // create 10k items once
  const items = React.useMemo(() => {
    return Array.from({ length: 10000 }, (_, i) => ({
      id: i + 1,
      value: Math.floor(Math.random() * 100000),
      text: `Item ${i + 1}`,
    }));
  }, []);

  const [theme, setTheme] = React.useState("light");


  const sorted = React.useMemo(() => {
    const copy = [...items];
    copy.sort((a, b) => a.value - b.value);
    return copy;
  }, [items]);


  const handleDelete = React.useCallback((id) => {
    console.log("handleDelete", id);
  }, []);

  return (
    <div
      style={{
        padding: 12,
        background: theme === "light" ? "#fff" : "#111",
        color: theme === "light" ? "#111" : "#eee",
        "--border": theme === "light" ? "#eee" : "#333",
      }}
    >
      <h2 style={{ marginTop: 0 }}>
        Part 2: Heavy List (useMemo & React.memo)
      </h2>
      <div style={{ marginBottom: 8 }}>
        <button
          onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
          style={{ padding: "8px 12px", borderRadius: 6 }}
        >
          Toggle theme ({theme})
        </button>
      </div>

      <p style={{ margin: "8px 0" }}>
        Large list (10,000 items). Toggling theme should not re-sort or
        re-render list items.
      </p>

      <div
        style={{
          maxHeight: 420,
          overflow: "auto",
          border: "1px solid var(--border)",
        }}
      >
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {sorted.map((item) => (
            <ListItem key={item.id} item={item} onDelete={handleDelete} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HeavyList;
