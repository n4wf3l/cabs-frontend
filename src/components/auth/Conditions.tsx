import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

interface ConditionsProps {
  onBack: () => void;
}

const Conditions = ({ onBack }: ConditionsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="w-full p-6 md:p-8"
    >
      <Button
        type="button"
        variant="ghost"
        className="text-gray-400 hover:text-white mb-6 p-0 h-auto flex items-center gap-1.5 text-sm"
        onClick={onBack}
      >
        <ArrowLeft size={16} />
        Retour
      </Button>

      <h2 className="text-2xl font-bold mb-6 text-white">
        Conditions d'utilisation
      </h2>

      <div className="space-y-4 text-gray-300 text-sm">
        <p>
          En utilisant Cabs, vous acceptez les conditions d'utilisation suivantes :
        </p>

        <div className="space-y-4">
          <section>
            <h3 className="text-white font-semibold mb-2">1. Utilisation du service</h3>
            <p>
              Cabs est une plateforme destinée exclusivement aux sociétés de taxi
              et à leurs chauffeurs. L'utilisation de la plateforme est soumise
              à l'acceptation des présentes conditions.
            </p>
          </section>

          <section>
            <h3 className="text-white font-semibold mb-2">2. Responsabilités</h3>
            <p>
              Les utilisateurs sont responsables de maintenir la confidentialité
              de leurs identifiants de connexion et de toutes les activités
              effectuées sous leur compte.
            </p>
          </section>

          <section>
            <h3 className="text-white font-semibold mb-2">3. Données personnelles</h3>
            <p>
              Les données collectées sont utilisées uniquement dans le cadre
              de la gestion de la flotte et conformément à notre politique
              de confidentialité.
            </p>
          </section>

          <section>
            <h3 className="text-white font-semibold mb-2">4. Modifications</h3>
            <p>
              Cabs se réserve le droit de modifier ces conditions à tout moment.
              Les utilisateurs seront informés des changements importants.
            </p>
          </section>
        </div>

        <p className="mt-6 text-xs text-gray-400">
          Dernière mise à jour : 11 juillet 2025
        </p>
      </div>
    </motion.div>
  );
};

export default Conditions;
