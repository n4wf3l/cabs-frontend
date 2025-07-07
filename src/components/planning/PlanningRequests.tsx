import { motion } from "framer-motion";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Check, X } from "lucide-react";

export function PlanningRequests({ requests, handleRequestAction }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mt-8 bg-gray-900 rounded-lg p-4"
    >
      <h3 className="text-lg font-medium mb-4">Demandes</h3>
      <div className="space-y-3">
        {requests
          .filter((request) => request.status === "pending")
          .map((request) => (
            <div
              key={request.id}
              className="flex items-center justify-between p-3 bg-gray-800 rounded-lg"
            >
              <div>
                <span className="block font-medium">
                  {request.chauffeurName}
                </span>
                <span className="text-sm text-gray-400">
                  {request.type === "work" && "Demande de Travail"}
                  {request.type === "holiday" && "Demande de Jour Libre"}
                  {request.type === "sick" && "Demande de Congé Maladie"}
                  {" - "}
                  {format(request.date, "dd/MM/yyyy", { locale: fr })} (
                  {request.shift})
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleRequestAction(request.id, true)}
                  className="p-2 bg-blue-600 hover:bg-blue-700 rounded-md"
                >
                  <Check size={16} />
                </button>
                <button
                  onClick={() => handleRequestAction(request.id, false)}
                  className="p-2 bg-gray-700 hover:bg-gray-600 rounded-md"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          ))}
      </div>
    </motion.div>
  );
}
