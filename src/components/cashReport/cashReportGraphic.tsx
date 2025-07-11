import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

interface CashReportGraphicProps {
  selectedView: string;
  selectedDriver: string;
  weekData: any[];
  driverStats: any[];
  drivers: Array<{ id: number; name: string; }>;
}

export const CashReportGraphic = ({
  selectedView,
  selectedDriver,
  weekData,
  driverStats,
  drivers,
}: CashReportGraphicProps) => {
  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Évolution des recettes</h3>
        <p className="text-sm text-gray-500">
          {selectedView === "daily" 
            ? "Progression journalière" 
            : "Comparaison par conducteur"}
        </p>
      </div>
      
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          {selectedView === "daily" ? (
            <LineChart data={weekData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="displayDate"
                tick={{ fontSize: 12 }}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              {selectedDriver === "all" ? (
                drivers.map(driver => (
                  <Line
                    key={driver.id}
                    type="monotone"
                    dataKey={`driver${driver.id}`}
                    name={driver.name}
                    stroke={`hsl(${driver.id * 100}, 70%, 50%)`}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 8 }}
                  />
                ))
              ) : (
                <Line
                  type="monotone"
                  dataKey={`driver${selectedDriver}`}
                  name={drivers.find(d => d.id.toString() === selectedDriver)?.name}
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 8 }}
                />
              )}
            </LineChart>
          ) : (
            <BarChart data={driverStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalAmount" name="Total semaine" fill="#3B82F6" />
              <Bar dataKey="avgAmount" name="Moyenne journalière" fill="#93C5FD" />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
