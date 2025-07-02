import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, ReferenceLine } from "recharts";
import { TrendingUp } from "lucide-react";

interface ChartData {
  date: string;
  humidity: number;
  temperature: number;
  ph: number;
}

interface HumidityChartProps {
  data: ChartData[];
}

const HumidityChart = ({ data }: HumidityChartProps) => {
  const chartConfig = {
    humidity: {
      label: "Humidité (%)",
      color: "hsl(var(--irrigation-blue))",
    },
    temperature: {
      label: "Température (°C)",
      color: "hsl(var(--warning-orange))",
    },
  };

  return (
    <Card className="bg-gradient-card shadow-soft">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-irrigation-blue" />
          Historique Humidité & Température
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => new Date(value).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <ChartTooltip 
                content={<ChartTooltipContent />}
                formatter={(value, name) => [
                  `${value}${name === 'humidity' ? '%' : '°C'}`,
                  name === 'humidity' ? 'Humidité' : 'Température'
                ]}
                labelFormatter={(label) => new Date(label).toLocaleDateString('fr-FR')}
              />
              
              {/* Reference lines for humidity thresholds */}
              <ReferenceLine y={30} stroke="hsl(var(--alert-red))" strokeDasharray="5 5" />
              <ReferenceLine y={60} stroke="hsl(var(--agriculture-green))" strokeDasharray="5 5" />
              
              <Bar 
                dataKey="humidity" 
                fill="var(--color-humidity)"
                name="humidity"
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default HumidityChart;