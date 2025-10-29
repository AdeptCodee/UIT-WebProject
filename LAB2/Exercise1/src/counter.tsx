/** @jsx createElement */
import { createElement, useState } from "./jsx-runtime";

interface ButtonProps {
  onClick?: () => void;
  className?: string;
  children?: any;
}

const Button = ({ onClick, className, children }: ButtonProps) => {
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
};

interface CounterProps {
  initialCount?: number;
}

const Counter = ({ initialCount = 0 }: CounterProps) => {
  const [getCount, setCount] = useState(initialCount);

  const increment = () => setCount(getCount() + 1);
  const decrement = () => setCount(getCount() - 1);
  const reset = () => setCount(0);

  return (
    <div className="counter">
      <h2>Count: {getCount()}</h2>
      <div className="buttons">
        <Button onClick={increment}>+</Button>
        <Button onClick={decrement}>-</Button>
        <Button onClick={reset}>Reset</Button>
      </div>
    </div>
  );
};

export { Counter };
