import { X } from "lucide-react";

export function PlanningAssignDriverModal({
  show,
  onClose,
  selectedShift,
  chauffeurs,
  onAssign,
}: {
  show: boolean;
  onClose: () => void;
  selectedShift: { day: string; type: "Jour" | "Nuit" } | null;
  chauffeurs: { id: string; name: string }[];
  onAssign: (chauffeur: { id: string; name: string }) => void;
}) {
  if (!show || !selectedShift) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">
            Assigner un Chauffeur - {selectedShift.day} ({selectedShift.type})
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-800 rounded-full"
          >
            <X size={16} />
          </button>
        </div>
        <div className="max-h-96 overflow-y-auto space-y-2 mb-4">
          {chauffeurs.map((driver) => (
            <button
              key={driver.id}
              onClick={() => {
                onAssign(driver);
                onClose();
              }}
              className="w-full text-left p-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              {driver.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
