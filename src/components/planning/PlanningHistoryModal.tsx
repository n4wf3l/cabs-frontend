import { X } from "lucide-react";
import { format } from "date-fns";

export function PlanningHistoryModal({
  show,
  onClose,
  requests,
}: {
  show: boolean;
  onClose: () => void;
  requests: any[];
}) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-900 rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Historique des Demandes</h3>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-800 rounded-full"
          >
            <X size={16} />
          </button>
        </div>
        <div className="flex gap-4 mb-4">
          <button className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700">
            Demandes Approuvées
          </button>
          <button className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700">
            Demandes Refusées
          </button>
        </div>
        <div className="overflow-y-auto flex-1 space-y-3">
          {requests
            .filter((request) => request.status !== "pending")
            .map((request) => (
              <div
                key={request.id}
                className={`p-3 rounded-lg ${
                  request.status === "approved"
                    ? "bg-green-900/20"
                    : "bg-red-900/20"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="block font-medium">
                      {request.chauffeurName}
                    </span>
                    <span className="text-sm text-gray-400">
                      {request.type === "work" && "Demande de Travail"}
                      {request.type === "holiday" && "Demande de Jour Libre"}
                      {request.type === "sick" && "Demande de Congé Maladie"}
                      {" - "}
                      {format(request.date, "dd/MM/yyyy")} ({request.shift})
                    </span>
                  </div>
                  <span
                    className={`text-sm px-2 py-1 rounded ${
                      request.status === "approved"
                        ? "bg-green-900/40 text-green-400"
                        : "bg-red-900/40 text-red-400"
                    }`}
                  >
                    {request.status === "approved" ? "Approuvé" : "Refusé"}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
