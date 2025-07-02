import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Droplets, Mail, Lock, User } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

interface AuthCardProps {
  onLogin: () => void;
}

const AuthCard = ({ onLogin }: AuthCardProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    farmName: "",
    area: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation de connexion
    onLogin();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-irrigation dark:bg-gradient-to-br dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Theme Toggle */}
        <div className="absolute top-6 right-6">
          <ThemeToggle />
        </div>
        
        {/* Logo et titre */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-glow">
              <Droplets className="h-8 w-8 text-irrigation-blue" />
            </div>
            <h1 className="text-3xl font-bold text-white dark:text-white">AgroSmart</h1>
          </div>
          <p className="text-white/80 dark:text-white/80 text-lg">
            Gestion intelligente de l'irrigation
          </p>
          <Badge variant="outline" className="mt-2 border-white/30 text-white dark:border-white/30 dark:text-white">
            Version 1.0
          </Badge>
        </div>

        <Card className="bg-card/95 backdrop-blur-sm shadow-soft border-border">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-foreground">
              {isLogin ? "Connexion" : "Créer un compte"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Champs inscription */}
              {!isLogin && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Nom complet
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Jean Dupont"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required={!isLogin}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="farmName">Nom de l'exploitation</Label>
                    <Input
                      id="farmName"
                      type="text"
                      placeholder="Ferme des Champs Verts"
                      value={formData.farmName}
                      onChange={(e) => handleInputChange("farmName", e.target.value)}
                      required={!isLogin}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="area">Superficie (m²)</Label>
                    <Input
                      id="area"
                      type="number"
                      placeholder="1200"
                      value={formData.area}
                      onChange={(e) => handleInputChange("area", e.target.value)}
                      required={!isLogin}
                    />
                  </div>
                </>
              )}

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>

              {/* Mot de passe */}
              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Mot de passe
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  required
                />
              </div>

              {/* Bouton de soumission */}
              <Button 
                type="submit" 
                className="w-full bg-gradient-primary text-white font-semibold py-3 hover:opacity-90 transition-opacity"
              >
                {isLogin ? "Se connecter" : "Créer mon compte"}
              </Button>
            </form>

            <Separator />

            {/* Lien pour basculer */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">
                {isLogin ? "Pas encore de compte ?" : "Déjà un compte ?"}
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsLogin(!isLogin)}
                className="w-full"
              >
                {isLogin ? "Créer un compte gratuit" : "Se connecter"}
              </Button>
            </div>

            {/* Demo access */}
            <div className="pt-4 border-t">
              <Button
                type="button"
                variant="ghost"
                onClick={onLogin}
                className="w-full text-irrigation-blue hover:text-irrigation-blue hover:bg-irrigation-blue-light"
              >
                Accès démo (sans inscription)
              </Button>
            </div>

            {/* Informations produit */}
            <div className="text-center text-xs text-muted-foreground pt-4">
              <p>• Capteurs d'humidité en temps réel</p>
              <p>• Prévisions météo intégrées</p>
              <p>• Assistant IA pour l'irrigation</p>
              <p>• Réduction du gaspillage d'eau</p>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-white/60 dark:text-white/60 text-xs mt-6">
          © 2024 AgroSmart - Irrigation intelligente pour l'agriculture durable
        </p>
      </div>
    </div>
  );
};

export default AuthCard;