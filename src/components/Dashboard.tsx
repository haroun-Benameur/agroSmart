import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Droplets, Thermometer, CloudRain, AlertTriangle } from "lucide-react";
import SensorCard from "./SensorCard";
import ChatBot from "./ChatBot";

const Dashboard = () => {
  // Données simulées des capteurs
  const sensorData = {
    soilHumidity: 28,
    soilTemperature: 22,
    ambientTemperature: 25,
    weatherTemperature: 26,
    rainProbability: 70,
    area: 1200
  };

  const getHumidityStatus = (humidity: number): { status: "optimal" | "warning" | "critical", color: string, text: string } => {
    if (humidity > 60) return { status: "optimal" as const, color: "agriculture-green", text: "Optimal" };
    if (humidity < 30) return { status: "critical" as const, color: "alert-red", text: "Critique" };
    return { status: "warning" as const, color: "warning-orange", text: "À surveiller" };
  };

  const humidityStatus = getHumidityStatus(sensorData.soilHumidity);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            AgroSmart Irrigation
          </h1>
          <p className="text-muted-foreground text-lg">
            Gestion intelligente de l'irrigation agricole
          </p>
        </div>

        {/* Alert Banner */}
        <Card className="border-l-4 border-l-warning-orange bg-warning-orange-light/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-warning-orange" />
              <div>
                <p className="font-semibold text-foreground">
                  Attention: Humidité du sol à {sensorData.soilHumidity}%
                </p>
                <p className="text-sm text-muted-foreground">
                  Niveau en dessous du seuil optimal. Consultez les recommandations.
                </p>
              </div>
              <Badge 
                variant="outline" 
                className={`ml-auto border-${humidityStatus.color} text-${humidityStatus.color}`}
              >
                {humidityStatus.text}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Sensor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
            title="Probabilité Pluie"
            value={`${sensorData.rainProbability}%`}
            icon={<CloudRain className="h-6 w-6" />}
            status={"optimal" as const}
            trend={"up" as const}
          />
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
                <span className="font-semibold">{sensorData.area.toLocaleString()} m²</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Type de culture</span>
                <span className="font-semibold">Légumes</span>
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

        {/* ChatBot Section */}
        <ChatBot sensorData={sensorData} />
      </div>
    </div>
  );
};

export default Dashboard;