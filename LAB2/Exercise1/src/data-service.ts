
interface DataPoint {
  label: string;
  value: number;
}

export class DataService {
  static generateData(count: number = 5): DataPoint[] {
    return Array.from({ length: count }, (_, i) => ({
      label: `Item ${i + 1}`,
      value: Math.floor(Math.random() * 100) + 10,
    }));
  }

  static updateData(data: DataPoint[]): DataPoint[] {
    return data.map((d) => ({
      ...d,
      value: Math.max(10, d.value + (Math.random() * 20 - 10)),
    }));
  }
}
