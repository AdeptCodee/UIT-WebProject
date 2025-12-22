// Panel.jsx
function Panel({ title, children, isActive, onShow }) {
  return (
    <div style={styles.panel}>
      <h3>{title}</h3>
      {isActive ? (
        <div>
          <p>{children}</p>
          <button onClick={onShow}>Hide</button>
        </div>
      ) : (
        <button onClick={onShow}>Show</button>
      )}
    </div>
  );
}

const styles = {
  panel: {
    border: "1px solid #999",
    borderRadius: "8px",
    margin: "10px 0",
    padding: "12px",
  },
};

export default Panel;
