import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface ShiftSearchProps {
  onSearch: (term: string) => void;
}

export const ShiftSearch = ({ onSearch }: ShiftSearchProps) => {
  return (
    <div className="relative mb-6">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Rechercher par nom de chauffeur ou date..."
        className="pl-10"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};