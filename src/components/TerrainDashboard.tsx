import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Droplets, Thermometer, Beaker, CloudRain, AlertTriangle } from "lucide-react";
import SensorCard from "./SensorCard";
import ChatBot from "./ChatBot";
import HumidityChart from "./charts/HumidityChart";
import HumidityStatusChart from "./charts/HumidityStatusChart";

interface TerrainData {
  id: string;
  name: string;
  superficie: number;
  location: string;
  sensorData: {
    soilHumidity: number;
    soilTemperature: number;
    ambientTemperature: number;
    weatherTemperature: number;
    rainProbability: number;
    soilPH: number;
  };
  historicalData: Array<{
    date: string;
    humidity: number;
    temperature: number;
    ph: number;
  }>;
}

interface TerrainDashboardProps {
  terrain: TerrainData;
  onBack: () => void;
}

const TerrainDashboard = ({ terrain, onBack }: TerrainDashboardProps) => {
  const { sensorData } = terrain;

  const getHumidityStatus = (humidity: number): { status: "optimal" | "warning" | "critical", color: string, text: string } => {
    if (humidity > 60) return { status: "optimal" as const, color: "agriculture-green", text: "Optimal" };
    if (humidity < 30) return { status: "critical" as const, color: "alert-red", text: "Critique" };
    return { status: "warning" as const, color: "warning-orange", text: "À surveiller" };
  };

  const getPHStatus = (ph: number): { status: "optimal" | "warning" | "critical", text: string } => {
    if (ph >= 6.0 && ph <= 7.5) return { status: "optimal" as const, text: "Équilibré" };
    if (ph < 5.5 || ph > 8.0) return { status: "critical" as const, text: ph < 5.5 ? "Trop acide" : "Trop basique" };
    return { status: "warning" as const, text: ph < 6.0 ? "Légèrement acide" : "Légèrement basique" };
  };

  const humidityStatus = getHumidityStatus(sensorData.soilHumidity);
  const phStatus = getPHStatus(sensorData.soilPH);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour aux terrains
          </Button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              {terrain.name}
            </h1>
            <p className="text-muted-foreground">
              {terrain.location} • {terrain.superficie.toLocaleString()} m²
            </p>
          </div>
        </div>

        {/* Alert Banner */}
        {(humidityStatus.status !== "optimal" || phStatus.status !== "optimal") && (
          <Card className="border-l-4 border-l-warning-orange bg-warning-orange-light/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-warning-orange" />
                <div>
                  <p className="font-semibold text-foreground">
                    Attention: {humidityStatus.status !== "optimal" && `Humidité ${sensorData.soilHumidity}%`}
                    {humidityStatus.status !== "optimal" && phStatus.status !== "optimal" && " • "}
                    {phStatus.status !== "optimal" && `pH ${sensorData.soilPH}`}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Consultez les recommandations de votre assistant.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Sensor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <SensorCard
            title="Humidité du Sol"
            value={`${sensorData.soilHumidity}%`}
            icon={<Droplets className="h-6 w-6" />}
            status={humidityStatus.status}
            trend="down"
          />
          <SensorCard
            title="Température Sol"
            value={`${sensorData.soilTemperature}°C`}
            icon={<Thermometer className="h-6 w-6" />}
            status="optimal"
            trend="stable"
          />
          <SensorCard
            title="Température Ambiante"
            value={`${sensorData.ambientTemperature}°C`}
            icon={<Thermometer className="h-6 w-6" />}
            status="optimal"
            trend="up"
          />
          <SensorCard
            title="pH du Sol"
            value={sensorData.soilPH.toFixed(1)}
            icon={<Beaker className="h-6 w-6" />}
            status={phStatus.status}
            trend="stable"
          />
          <SensorCard
            title="Probabilité Pluie"
            value={`${sensorData.rainProbability}%`}
            icon={<CloudRain className="h-6 w-6" />}
            status="optimal"
            trend="up"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <HumidityChart data={terrain.historicalData} />
          <HumidityStatusChart data={terrain.historicalData} />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Terrain Info */}
          <Card className="bg-gradient-card shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-primary rounded-full"></div>
                Informations Terrain
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Superficie totale</span>
                <span className="font-semibold">{terrain.superficie.toLocaleString()} m²</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Type de culture</span>
                <span className="font-semibold">Légumes</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">pH du sol</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{sensorData.soilPH.toFixed(1)}</span>
                  <Badge 
                    variant="outline" 
                    className={`border-${phStatus.status === "optimal" ? "agriculture-green" : phStatus.status === "warning" ? "warning-orange" : "alert-red"} text-${phStatus.status === "optimal" ? "agriculture-green" : phStatus.status === "warning" ? "warning-orange" : "alert-red"}`}
                  >
                    {phStatus.text}
                  </Badge>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Dernière irrigation</span>
                <span className="font-semibold">Il y a 2 jours</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Consommation d'eau</span>
                <span className="font-semibold text-irrigation-blue">180L aujourd'hui</span>
              </div>
            </CardContent>
          </Card>

          {/* Weather Forecast */}
          <Card className="bg-gradient-card shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CloudRain className="h-5 w-5 text-irrigation-blue" />
                Prévisions Météo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Aujourd'hui</span>
                <div className="text-right">
                  <div className="font-semibold">{sensorData.weatherTemperature}°C</div>
                  <div className="text-sm text-muted-foreground">Ensoleillé</div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Demain</span>
                <div className="text-right">
                  <div className="font-semibold">24°C</div>
                  <div className="text-sm text-irrigation-blue">Pluie {sensorData.rainProbability}%</div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Après-demain</span>
                <div className="text-right">
                  <div className="font-semibold">27°C</div>
                  <div className="text-sm text-muted-foreground">Nuageux</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced ChatBot Section */}
        <ChatBot sensorData={{...sensorData, area: terrain.superficie}} />
      </div>
    </div>
  );
};

export default TerrainDashboard;