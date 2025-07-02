import { useState } from "react";
import Dashboard from "@/components/Dashboard";
import AuthCard from "@/components/AuthCard";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <AuthCard onLogin={handleLogin} />;
  }

  return <Dashboard />;
};

export default Index;
