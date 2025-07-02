import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Droplets } from "lucide-react";
import Navbar from "./Navbar";

interface Terrain {
  id: string;
  name: string;
  superficie: number;
  location: string;
  lastUpdate: string;
  currentHumidity: number;
  status: "optimal" | "warning" | "critical";
}

interface TerrainListProps {
  terrains: Terrain[];
  onSelectTerrain: (id: string) => void;
  onLogout: () => void;
}

const TerrainList = ({ terrains, onSelectTerrain, onLogout }: TerrainListProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "optimal": return "agriculture-green";
      case "warning": return "warning-orange";
      case "critical": return "alert-red";
      default: return "muted";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "optimal": return "Optimal";
      case "warning": return "À surveiller";
      case "critical": return "Critique";
      default: return "Inconnu";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onLogout={onLogout} title="Mes Terrains" />
      
      <div className="p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
              Mes Terrains
            </h1>
            <p className="text-muted-foreground text-lg">
              Sélectionnez un terrain pour accéder à ses données détaillées
            </p>
          </div>

          {/* Terrains Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {terrains.map((terrain) => (
              <Card key={terrain.id} className="bg-gradient-card shadow-soft hover:shadow-medium transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl font-semibold text-foreground">
                        {terrain.name}
                      </CardTitle>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                        <MapPin className="h-3 w-3" />
                        {terrain.location}
                      </div>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`border-${getStatusColor(terrain.status)} text-${getStatusColor(terrain.status)}`}
                    >
                      {getStatusText(terrain.status)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Superficie</p>
                      <p className="font-semibold">{terrain.superficie.toLocaleString()} m²</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Humidité</p>
                      <div className="flex items-center gap-1">
                        <Droplets className="h-4 w-4 text-irrigation-blue" />
                        <p className="font-semibold">{terrain.currentHumidity}%</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    Dernière mise à jour: {terrain.lastUpdate}
                  </div>
                  
                  <Button 
                    onClick={() => onSelectTerrain(terrain.id)}
                    className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
                  >
                    Voir les détails
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerrainList;