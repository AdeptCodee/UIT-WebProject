// Card.jsx
function Card({ title, children }) {
  return (
    <div className="card" style={styles.card}>
      <h3>{title}</h3>
      <hr />
      {children}
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "16px",
    margin: "10px 0",
    boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
  },
};

export default Card;
