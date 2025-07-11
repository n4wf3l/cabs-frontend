import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";

interface SeeMoreProps {
  onBack: () => void;
}

const SeeMore: React.FC<SeeMoreProps> = ({ onBack }) => {
  return (
    <div className="w-full p-6 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <Button
          variant="ghost"
          className="text-gray-400 hover:text-white p-0 h-auto flex items-center gap-1.5 text-sm"
          onClick={onBack}
        >
          <ArrowLeft size={16} />
          <span>Retour</span>
        </Button>
        <img src="/tlogo.png" alt="Cabs" className="h-8" />
      </div>

      <h2 className="text-2xl font-bold mb-6 text-white">À propos de Cabs</h2>

      <div className="space-y-6 text-gray-300 text-sm overflow-y-auto max-h-[60vh] pr-2">
        <div className="bg-gray-800/50 rounded-lg p-5 border border-gray-700/50">
          <h3 className="text-lg font-medium text-white mb-3">Notre mission</h3>
          <p className="mb-4">
            Cabs est né d'une simple observation : la gestion de flotte de taxis
            reste souvent complexe et manque cruellement d'outils adaptés aux
            besoins spécifiques de cette industrie.
          </p>
          <p>
            Notre mission est de simplifier la vie des gestionnaires de flottes
            et des chauffeurs grâce à une solution intuitive, fiable et
            complète.
          </p>
        </div>

        <div className="bg-gradient-to-br from-yellow-900/20 to-yellow-500/10 rounded-lg p-5 border border-yellow-700/30">
          <h3 className="text-lg font-medium text-white mb-3">
            Une solution complète
          </h3>
          <ul className="space-y-3 list-disc pl-5">
            <li>
              <span className="font-medium text-yellow-400">
                Gestion des véhicules
              </span>
              <p className="mt-1">
                Suivez l'état de chaque véhicule, gérez la maintenance et
                optimisez l'utilisation de votre flotte.
              </p>
            </li>
            <li>
              <span className="font-medium text-yellow-400">
                Planning intelligent
              </span>
              <p className="mt-1">
                Organisez les horaires de vos chauffeurs, gérez les
                remplacements et visualisez les disponibilités en un coup d'œil.
              </p>
            </li>
            <li>
              <span className="font-medium text-yellow-400">
                Rapports et analyses
              </span>
              <p className="mt-1">
                Accédez à des données précises sur les performances de votre
                flotte et prenez des décisions éclairées.
              </p>
            </li>
            <li>
              <span className="font-medium text-yellow-400">
                Application mobile
              </span>
              <p className="mt-1">
                Permettez à vos chauffeurs d'accéder à leur planning, de signaler
                des problèmes et de communiquer efficacement.
              </p>
            </li>
          </ul>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-5 border border-gray-700/50">
          <h3 className="text-lg font-medium text-white mb-3">
            Pourquoi choisir Cabs?
          </h3>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="bg-blue-500/20 p-2 rounded-lg h-min">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-400"
                >
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-white">
                  Conçu pour les professionnels
                </h4>
                <p className="text-gray-400">
                  Développé en collaboration avec des sociétés de taxi pour
                  répondre à leurs besoins réels.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="bg-green-500/20 p-2 rounded-lg h-min">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-green-400"
                >
                  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-white">Hautement adaptable</h4>
                <p className="text-gray-400">
                  Personnalisez la solution selon la taille de votre flotte et
                  vos besoins spécifiques.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="bg-purple-500/20 p-2 rounded-lg h-min">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-purple-400"
                >
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                  <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                  <path d="M4 22h16" />
                  <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                  <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                  <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-white">Support dédié</h4>
                <p className="text-gray-400">
                  Une équipe d'experts à votre disposition pour vous accompagner
                  dans l'utilisation de la plateforme.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-5 border border-yellow-500/30 rounded-lg bg-yellow-500/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="text-lg font-medium text-white">
                Prêt à révolutionner la gestion de votre flotte?
              </h3>
              <p className="text-gray-300 mt-1">
                Contactez-nous pour une démonstration personnalisée.
              </p>
            </div>
            <Button className="bg-yellow-500 hover:bg-yellow-400 text-black font-medium flex items-center gap-2 whitespace-nowrap">
              <span>Demander une démo</span>
              <ExternalLink size={14} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeeMore;
