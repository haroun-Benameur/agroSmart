import { useState } from "react";
import AuthCard from "@/components/AuthCard";
import TerrainList from "@/components/TerrainList";
import TerrainDashboard from "@/components/TerrainDashboard";

// Mock data for terrains
const mockTerrains = [
  {
    id: "1",
    name: "Champ Nord",
    superficie: 1200,
    location: "Secteur A - Nord",
    lastUpdate: "Il y a 15 min",
    currentHumidity: 28,
    status: "warning" as const,
  },
  {
    id: "2", 
    name: "Parcelle Sud",
    superficie: 800,
    location: "Secteur B - Sud",
    lastUpdate: "Il y a 1h",
    currentHumidity: 65,
    status: "optimal" as const,
  },
  {
    id: "3",
    name: "Terrain Est",
    superficie: 950,
    location: "Secteur C - Est",
    lastUpdate: "Il y a 30 min",
    currentHumidity: 22,
    status: "critical" as const,
  },
];

const mockTerrainData = {
  "1": {
    id: "1",
    name: "Champ Nord",
    superficie: 1200,
    location: "Secteur A - Nord",
    sensorData: {
      soilHumidity: 28,
      soilTemperature: 22,
      ambientTemperature: 25,
      weatherTemperature: 26,
      rainProbability: 70,
      soilPH: 5.8,
    },
    historicalData: [
      { date: "2024-01-01", humidity: 45, temperature: 20, ph: 6.1 },
      { date: "2024-01-02", humidity: 38, temperature: 22, ph: 5.9 },
      { date: "2024-01-03", humidity: 32, temperature: 24, ph: 5.8 },
      { date: "2024-01-04", humidity: 28, temperature: 22, ph: 5.8 },
      { date: "2024-01-05", humidity: 52, temperature: 19, ph: 6.0 },
      { date: "2024-01-06", humidity: 48, temperature: 21, ph: 6.1 },
      { date: "2024-01-07", humidity: 35, temperature: 23, ph: 5.9 },
    ],
  },
  "2": {
    id: "2",
    name: "Parcelle Sud",
    superficie: 800,
    location: "Secteur B - Sud",
    sensorData: {
      soilHumidity: 65,
      soilTemperature: 24,
      ambientTemperature: 27,
      weatherTemperature: 28,
      rainProbability: 30,
      soilPH: 6.5,
    },
    historicalData: [
      { date: "2024-01-01", humidity: 58, temperature: 22, ph: 6.4 },
      { date: "2024-01-02", humidity: 62, temperature: 23, ph: 6.5 },
      { date: "2024-01-03", humidity: 59, temperature: 25, ph: 6.3 },
      { date: "2024-01-04", humidity: 65, temperature: 24, ph: 6.5 },
      { date: "2024-01-05", humidity: 68, temperature: 21, ph: 6.6 },
      { date: "2024-01-06", humidity: 64, temperature: 23, ph: 6.4 },
      { date: "2024-01-07", humidity: 65, temperature: 24, ph: 6.5 },
    ],
  },
  "3": {
    id: "3",
    name: "Terrain Est",
    superficie: 950,
    location: "Secteur C - Est",
    sensorData: {
      soilHumidity: 22,
      soilTemperature: 26,
      ambientTemperature: 29,
      weatherTemperature: 30,
      rainProbability: 15,
      soilPH: 5.2,
    },
    historicalData: [
      { date: "2024-01-01", humidity: 35, temperature: 24, ph: 5.3 },
      { date: "2024-01-02", humidity: 28, temperature: 25, ph: 5.2 },
      { date: "2024-01-03", humidity: 25, temperature: 26, ph: 5.1 },
      { date: "2024-01-04", humidity: 22, temperature: 26, ph: 5.2 },
      { date: "2024-01-05", humidity: 19, temperature: 27, ph: 5.0 },
      { date: "2024-01-06", humidity: 24, temperature: 25, ph: 5.1 },
      { date: "2024-01-07", humidity: 22, temperature: 26, ph: 5.2 },
    ],
  },
};

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedTerrain, setSelectedTerrain] = useState<string | null>(null);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setSelectedTerrain(null);
  };

  const handleSelectTerrain = (terrainId: string) => {
    setSelectedTerrain(terrainId);
  };

  const handleBackToList = () => {
    setSelectedTerrain(null);
  };

  if (!isAuthenticated) {
    return <AuthCard onLogin={handleLogin} />;
  }

  if (selectedTerrain && mockTerrainData[selectedTerrain as keyof typeof mockTerrainData]) {
    return (
      <TerrainDashboard 
        terrain={mockTerrainData[selectedTerrain as keyof typeof mockTerrainData]}
        onBack={handleBackToList}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <TerrainList 
      terrains={mockTerrains}
      onSelectTerrain={handleSelectTerrain}
      onLogout={handleLogout}
    />
  );
};

export default Index;
