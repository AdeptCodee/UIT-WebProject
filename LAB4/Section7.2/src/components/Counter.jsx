import useLocalStorage from "../hooks/useLocalStorage";

export default function Counter() {
  const [count, setCount] = useLocalStorage("myCounter", 0);

  return (
    <div>
      <h2>Persistent Counter: {count}</h2>
      <button onClick={() => setCount(count + 1)}>+ Increase</button>
    </div>
  );
}
