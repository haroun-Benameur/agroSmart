import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { PieChart as PieChartIcon } from "lucide-react";

interface ChartData {
  date: string;
  humidity: number;
  temperature: number;
  ph: number;
}

interface HumidityStatusChartProps {
  data: ChartData[];
}

const HumidityStatusChart = ({ data }: HumidityStatusChartProps) => {
  // Calculate status distribution
  const statusCounts = data.reduce((acc, item) => {
    if (item.humidity > 60) acc.optimal++;
    else if (item.humidity < 30) acc.critical++;
    else acc.warning++;
    return acc;
  }, { optimal: 0, warning: 0, critical: 0 });

  const total = data.length;
  const pieData = [
    {
      name: "Optimal",
      value: statusCounts.optimal,
      percentage: Math.round((statusCounts.optimal / total) * 100),
      color: "hsl(var(--agriculture-green))",
    },
    {
      name: "À surveiller",
      value: statusCounts.warning,
      percentage: Math.round((statusCounts.warning / total) * 100),
      color: "hsl(var(--warning-orange))",
    },
    {
      name: "Critique",
      value: statusCounts.critical,
      percentage: Math.round((statusCounts.critical / total) * 100),
      color: "hsl(var(--alert-red))",
    },
  ].filter(item => item.value > 0);

  const chartConfig = {
    optimal: {
      label: "Optimal",
      color: "hsl(var(--agriculture-green))",
    },
    warning: {
      label: "À surveiller",
      color: "hsl(var(--warning-orange))",
    },
    critical: {
      label: "Critique",
      color: "hsl(var(--alert-red))",
    },
  };

  return (
    <Card className="bg-gradient-card shadow-soft">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PieChartIcon className="h-5 w-5 text-agriculture-green" />
          Répartition États d'Humidité
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={40}
                paddingAngle={2}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip 
                content={<ChartTooltipContent />}
                formatter={(value, name) => [`${value} jours (${pieData.find(d => d.name === name)?.percentage}%)`, name]}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
        
        {/* Legend */}
        <div className="flex justify-center gap-4 mt-4">
          {pieData.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-muted-foreground">
                {item.name} ({item.percentage}%)
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default HumidityStatusChart;