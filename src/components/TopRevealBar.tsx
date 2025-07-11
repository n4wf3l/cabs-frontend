import { useState } from "react";
import { BellIcon, AlertTriangle, Lightbulb, MessageCircle, Globe, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

export const TopRevealBar = () => {
  // Notifications factices
  const [notifications] = useState([
    {
      id: 1,
      title: "Nouveau chauffeur",
      message: "Ali Baba vient de s'inscrire",
      time: "il y a 2min",
    },
    {
      id: 2,
      title: "Véhicule en maintenance",
      message: "La voiture AB-123-CD est désormais en maintenance",
      time: "il y a 5min",
    },
  ]);

  return (
    <div className="fixed top-3 right-3 z-50 flex items-center gap-2">
      {/* Menu Feedback */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="rounded-full h-10 px-4 bg-background/80 backdrop-blur hover:bg-accent"
          >
            Feedback
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-[280px]"
        >
          <DropdownMenuLabel className="text-base font-normal">
            Que souhaitez-vous partager&nbsp;?
          </DropdownMenuLabel>
          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <div>
              <div className="font-medium">Problème</div>
              <p className="text-xs text-muted-foreground">
                Signaler un bug ou un souci
              </p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
            <Lightbulb className="h-4 w-4 text-yellow-500" />
            <div>
              <div className="font-medium">Idée</div>
              <p className="text-xs text-muted-foreground">
                Suggérer une amélioration
              </p>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Menu Notifications */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-9 w-9 bg-background/90 backdrop-blur hover:bg-secondary/50 border-border/50"
          >
            <BellIcon size={16} />
            {notifications.length > 0 && (
              <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-yellow-500 text-background text-[10px]">
                {notifications.length}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-[320px] bg-background/95 backdrop-blur border-border/50"
        >
          <div className="py-2 px-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-medium">Notifications</h4>
              <Badge variant="outline" className="h-5">
                {notifications.length} nouvelles
              </Badge>
            </div>
          </div>
          <DropdownMenuSeparator />
          <div className="max-h-[300px] overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="py-2 px-3 hover:bg-secondary/50 cursor-pointer"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h5 className="text-sm font-medium">{notification.title}</h5>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {notification.message}
                    </p>
                  </div>
                  <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                    {notification.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <DropdownMenuSeparator />
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start px-3 py-2 text-xs font-normal hover:bg-secondary/50"
          >
            Voir toutes les notifications
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>

        

      {/* Menu Compte */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-9 w-9 bg-background/90 backdrop-blur hover:bg-secondary/50 border-border/50"
          >
            <User size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-[240px] bg-background/95 backdrop-blur border-border/50"
        >
          {/* Email connecté */}
          <DropdownMenuLabel className="text-sm font-medium">
            YourCompany
            <br />
            ajari.nawfel@hotmail.com
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          {/* Choix de langue */}
          <DropdownMenuLabel className="text-xs text-muted-foreground">
            Langue
          </DropdownMenuLabel>
          <DropdownMenuItem className="cursor-pointer">
            <Globe className="h-4 w-4 mr-2" /> Français
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Globe className="h-4 w-4 mr-2" /> English
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Globe className="h-4 w-4 mr-2" /> Nederlands
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          {/* Mode d'affichage */}
          <DropdownMenuLabel className="text-xs text-muted-foreground">
            Mode d'affichage
          </DropdownMenuLabel>
          <DropdownMenuItem className="cursor-pointer">Dark</DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">Light</DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">Classic Dark</DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">System</DropdownMenuItem>
          <DropdownMenuSeparator />

          {/* Déconnexion */}
          <DropdownMenuItem className="cursor-pointer text-destructive">
            Déconnexion
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TopRevealBar;
