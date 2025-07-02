import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Send, Droplets, User, Bot } from "lucide-react";

interface SensorData {
  soilHumidity: number;
  soilTemperature: number;
  ambientTemperature: number;
  weatherTemperature: number;
  rainProbability: number;
  area: number;
}

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatBotProps {
  sensorData: SensorData;
}

const ChatBot = ({ sensorData }: ChatBotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Bonjour ! Je suis votre assistant irrigation. Demandez-moi si vous devez arroser votre terrain.",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const getIrrigationRecommendation = () => {
    const { soilHumidity, area, rainProbability } = sensorData;
    
    let recommendation = "";
    let shouldWater = false;

    if (soilHumidity > 60) {
      recommendation = "💧 **Non, n'arrosez pas.** L'humidité du sol est optimale à " + soilHumidity + "%. Votre terrain n'a pas besoin d'eau actuellement.";
    } else if (soilHumidity < 30 && rainProbability < 30) {
      shouldWater = true;
      const waterAmount = Math.round((area * 12) / 1000); // 12L/m² converti en m³
      recommendation = "💧 **Oui, arrosez maintenant.** L'humidité est critiquement basse (" + soilHumidity + "%) et peu de pluie prévue (" + rainProbability + "%). Arrosez environ " + waterAmount + " m³ pour vos " + area.toLocaleString() + " m².";
    } else if (soilHumidity < 30 && rainProbability >= 30) {
      recommendation = "💧 **Attendez avant d'arroser.** L'humidité est basse (" + soilHumidity + "%) mais " + rainProbability + "% de pluie prévue. Surveillez la météo.";
    } else if (rainProbability >= 70) {
      recommendation = "💧 **Attendez avant d'arroser.** Humidité à " + soilHumidity + "% et forte probabilité de pluie (" + rainProbability + "%). Économisez l'eau.";
    } else {
      recommendation = "💧 **Surveillez l'évolution.** Humidité à " + soilHumidity + "%. Vérifiez dans quelques heures selon l'évolution météo.";
    }

    return recommendation;
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulation d'une réponse du bot
    setTimeout(() => {
      let botResponse = "";
      
      if (inputMessage.toLowerCase().includes("arros") || 
          inputMessage.toLowerCase().includes("irrigation") ||
          inputMessage.toLowerCase().includes("eau")) {
        botResponse = getIrrigationRecommendation();
      } else if (inputMessage.toLowerCase().includes("humidité")) {
        botResponse = `L'humidité actuelle de votre sol est de ${sensorData.soilHumidity}%. ${sensorData.soilHumidity > 60 ? "C'est optimal !" : sensorData.soilHumidity < 30 ? "C'est trop bas, attention !" : "C'est dans la moyenne."}`;
      } else if (inputMessage.toLowerCase().includes("météo") || inputMessage.toLowerCase().includes("pluie")) {
        botResponse = `Prévisions météo : ${sensorData.weatherTemperature}°C aujourd'hui, ${sensorData.rainProbability}% de probabilité de pluie demain.`;
      } else {
        botResponse = "Je peux vous aider avec l'irrigation de votre terrain. Demandez-moi si vous devez arroser, ou des informations sur l'humidité et la météo.";
      }

      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setInputMessage("");
  };

  return (
    <Card className="bg-gradient-card shadow-soft">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-irrigation-blue" />
          Assistant Irrigation
          <Badge variant="outline" className="border-agriculture-green text-agriculture-green">
            En ligne
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Messages */}
        <div className="h-64 overflow-y-auto space-y-3 p-2 border rounded-lg bg-background/50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.isBot ? "justify-start" : "justify-end"}`}
            >
              {message.isBot && (
                <div className="w-8 h-8 rounded-full bg-irrigation-blue-light flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-irrigation-blue" />
                </div>
              )}
              
              <div
                className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                  message.isBot
                    ? "bg-irrigation-blue-light text-foreground"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                <p className="whitespace-pre-wrap">{message.text}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString('fr-FR', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>

              {!message.isBot && (
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <User className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <Input
            placeholder="Demandez-moi si vous devez arroser..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage}
            size="icon"
            className="bg-gradient-primary hover:opacity-90"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setInputMessage("Dois-je arroser mon terrain ?");
              setTimeout(handleSendMessage, 100);
            }}
            className="text-xs"
          >
            <Droplets className="h-3 w-3 mr-1" />
            Dois-je arroser ?
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setInputMessage("Quelle est l'humidité actuelle ?");
              setTimeout(handleSendMessage, 100);
            }}
            className="text-xs"
          >
            Humidité actuelle ?
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatBot;