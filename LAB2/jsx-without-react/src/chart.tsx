/** @jsx createElement */
import { createElement, useState } from "./jsx-runtime";

interface ChartProps {
  data: { label: string; value: number }[];
  type: "bar" | "line" | "pie";
}

export const Chart = ({ data, type }: ChartProps) => {
  const [getCanvas, setCanvas] = useState<HTMLCanvasElement | null>(null);

  const drawChart = () => {
    const canvas = getCanvas();
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (type === "bar") drawBar(ctx, data);
    else if (type === "line") drawLine(ctx, data);
    else drawPie(ctx, data);
  };

  const drawBar = (ctx: CanvasRenderingContext2D, d: any[]) => {
    const w = 50,
      gap = 20;
    d.forEach((item, i) => {
      const x = i * (w + gap) + 30;
      const y = 200 - item.value * 1.5;
      ctx.fillStyle = "#4f46e5";
      ctx.fillRect(x, y, w, item.value * 1.5);
      ctx.fillText(item.label, x, 220);
    });
  };

  const drawLine = (ctx: CanvasRenderingContext2D, d: any[]) => {
    ctx.beginPath();
    ctx.strokeStyle = "#22c55e";
    ctx.moveTo(50, 200 - d[0].value);
    d.forEach((item, i) => ctx.lineTo(50 + i * 80, 200 - item.value));
    ctx.stroke();
  };

  const drawPie = (ctx: CanvasRenderingContext2D, d: any[]) => {
    const total = d.reduce((sum, x) => sum + x.value, 0);
    let start = 0;
    d.forEach((item) => {
      const slice = (item.value / total) * 2 * Math.PI;
      ctx.beginPath();
      ctx.moveTo(150, 100);
      ctx.arc(150, 100, 80, start, start + slice);
      ctx.closePath();
      ctx.fillStyle = `hsl(${Math.random() * 360},70%,60%)`;
      ctx.fill();
      start += slice;
    });
  };

  // Re-draw
  setTimeout(drawChart, 50);

  return (
    <canvas
      width="400"
      height="250"
      style={{ border: "1px solid #ccc", borderRadius: "8px" }}
      ref={(el: HTMLCanvasElement) => setCanvas(el)}
    ></canvas>
  );
};
