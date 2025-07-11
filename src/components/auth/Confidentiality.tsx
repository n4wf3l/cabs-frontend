import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

interface ConfidentialityProps {
  onBack: () => void;
}

const Confidentiality = ({ onBack }: ConfidentialityProps) => {
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
        Politique de confidentialité
      </h2>

      <div className="space-y-4 text-gray-300 text-sm">
        <p>
          Chez Cabs, nous accordons une grande importance à la protection de vos données personnelles.
        </p>

        <div className="space-y-4">
          <section>
            <h3 className="text-white font-semibold mb-2">1. Collecte des données</h3>
            <p>
              Nous collectons uniquement les données nécessaires au bon fonctionnement
              du service, incluant les informations de profil, les données de
              localisation et les informations de course.
            </p>
          </section>

          <section>
            <h3 className="text-white font-semibold mb-2">2. Utilisation des données</h3>
            <p>
              Vos données sont utilisées exclusivement pour :
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>La gestion de votre flotte</li>
              <li>L'amélioration de nos services</li>
              <li>La conformité aux obligations légales</li>
            </ul>
          </section>

          <section>
            <h3 className="text-white font-semibold mb-2">3. Protection des données</h3>
            <p>
              Nous mettons en œuvre des mesures de sécurité robustes pour protéger
              vos données contre tout accès non autorisé, modification, divulgation
              ou destruction.
            </p>
          </section>

          <section>
            <h3 className="text-white font-semibold mb-2">4. Vos droits</h3>
            <p>
              Conformément au RGPD, vous disposez d'un droit d'accès, de rectification,
              de suppression et de portabilité de vos données.
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

export default Confidentiality;
