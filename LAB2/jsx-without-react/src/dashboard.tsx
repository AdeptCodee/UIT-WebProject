/** @jsx createElement */
import { createElement, useState } from "./jsx-runtime";
import { Card, Form } from "./components";
import { Chart } from "./chart";
import { DataService } from "./data-service";

export const Dashboard = () => {
  const [getData, setData] = useState(DataService.generateData());
  const [getType, setType] = useState<"bar" | "line" | "pie">("bar");

  const updateData = () => setData(DataService.updateData(getData()));

  return (
    <div style={{ fontFamily: "sans-serif", padding: "20px" }}>
      <h1 style={{ color: "#4f46e5" }}>📊 Dashboard</h1>
      <Form onSubmit={(e) => e.preventDefault()}>
        <select
          value={getType()}
          onChange={(e: Event) => {
            const target = e.target as HTMLSelectElement;
            setType(target.value as "bar" | "line" | "pie");
          }}
        >
          <option value="bar">Bar</option>
          <option value="line">Line</option>
          <option value="pie">Pie</option>
        </select>
        <button type="button" onClick={updateData}>
          Refresh Data
        </button>
      </Form>

      <Card title={`Chart Type: ${getType()}`}>
        <Chart data={getData()} type={getType()} />
      </Card>
    </div>
  );
};
