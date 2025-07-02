import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SensorCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  status: "optimal" | "warning" | "critical";
  trend: "up" | "down" | "stable";
}

const SensorCard = ({ title, value, icon, status, trend }: SensorCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "optimal": return "agriculture-green";
      case "warning": return "warning-orange";
      case "critical": return "alert-red";
      default: return "muted";
    }
  };

  const getTrendIcon = () => {
    if (trend === "up") return <ArrowUp className="h-3 w-3" />;
    if (trend === "down") return <ArrowDown className="h-3 w-3" />;
    return null;
  };

  const statusColor = getStatusColor(status);

  return (
    <Card className={cn(
      "bg-gradient-card shadow-soft hover:shadow-medium transition-all duration-300",
      "border-l-4",
      status === "optimal" && "border-l-agriculture-green",
      status === "warning" && "border-l-warning-orange", 
      status === "critical" && "border-l-alert-red"
    )}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className={cn(
            "p-2 rounded-lg",
            status === "optimal" && "bg-agriculture-green-light text-agriculture-green",
            status === "warning" && "bg-warning-orange-light text-warning-orange",
            status === "critical" && "bg-alert-red-light text-alert-red"
          )}>
            {icon}
          </div>
          <Badge 
            variant="outline" 
            className={cn(
              "text-xs",
              status === "optimal" && "border-agriculture-green text-agriculture-green",
              status === "warning" && "border-warning-orange text-warning-orange",
              status === "critical" && "border-alert-red text-alert-red"
            )}
          >
            {status === "optimal" ? "OK" : status === "warning" ? "Attention" : "Critique"}
          </Badge>
        </div>
        
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-foreground">{value}</p>
            <div className={cn(
              "flex items-center gap-1 text-xs",
              trend === "up" && "text-agriculture-green",
              trend === "down" && "text-alert-red",
              trend === "stable" && "text-muted-foreground"
            )}>
              {getTrendIcon()}
              <span className="capitalize">{trend === "stable" ? "Stable" : trend === "up" ? "Hausse" : "Baisse"}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SensorCard;