import { Check, Wrench, Hammer } from "lucide-react";
import { motion } from "framer-motion";

export default function LegendVehicle() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-[#1a1f2c] rounded-lg px-4 py-3 mt-6 w-full max-w-3xl mx-auto shadow-sm"
    >
      <div className="flex flex-wrap items-center gap-x-8 gap-y-2 justify-between text-xs">
        {/* Bloc 1 */}
        <div>
          <div className="text-gray-400 font-semibold mb-1">Chauffeur</div>
          <span className="inline-flex items-center gap-1 text-yellow-500 mr-3">
            <span className="bg-yellow-950 rounded-full w-2 h-2" /> Jour
          </span>
          <span className="inline-flex items-center gap-1 text-purple-500">
            <span className="bg-purple-950 rounded-full w-2 h-2" /> Nuit
          </span>
          <div className="text-gray-400 font-semibold mt-2 mb-1">Spécifications</div>
          <span className="inline-flex items-center gap-1 mr-2">
            <span className="w-5 h-5 flex items-center justify-center rounded bg-[#2a2f3c] text-gray-200">A</span>Auto
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="w-5 h-5 flex items-center justify-center rounded bg-[#2a2f3c] text-gray-200">M</span>Manu
          </span>
        </div>
        {/* Bloc 2 */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Check className="w-4 h-4 text-green-400" />
            <span className="bg-green-900/30 text-green-400 px-2 py-0.5 rounded">Bon état</span>
            <span className="text-gray-400 ml-2">Véhicule 100% fonctionnel, propre, conforme</span>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <Wrench className="w-4 h-4 text-yellow-400" />
            <span className="bg-yellow-900/30 text-yellow-400 px-2 py-0.5 rounded">En maintenance</span>
            <span className="text-gray-400 ml-2">Entretien préventif ou réglages mineurs</span>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <Hammer className="w-4 h-4 text-red-400" />
            <span className="bg-red-900/30 text-red-400 px-2 py-0.5 rounded">En réparation</span>
            <span className="text-gray-400 ml-2">Panne ou dégât nécessitant intervention</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="bg-emerald-900/30 text-emerald-400 px-2 py-0.5 rounded">En service</span>
            <span className="text-gray-400">→ Disponible</span>
            <span className="bg-slate-900/30 text-slate-400 px-2 py-0.5 rounded ml-2">Hors service</span>
            <span className="text-gray-400">→ Indisponible</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}