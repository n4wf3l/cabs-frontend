import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Phone, ArrowLeft } from "lucide-react";

interface ForgetPasswordFormProps {
  onCancel?: () => void;
  onSuccess?: () => void;
  redirectTo?: string;
}

export const ForgetPasswordForm = ({
  onCancel,
  onSuccess,
  redirectTo = "/login",
}: ForgetPasswordFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSending, setIsSending] = useState(false);

  const handleWhatsAppMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    const phoneNumber = "+32467686600";
    const message =
      "Bonjour, j'ai oublié mon mot de passe en tant qu'administrateur pour me connecter à la plateforme Cabs. Est-ce possible que vous me le réinitialisez?";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");

    toast({
      title: "Message prêt à être envoyé",
      description: `Un message a été préparé pour le numéro ${phoneNumber}.`,
    });

    setTimeout(() => {
      setIsSending(false);
      if (onSuccess) {
        onSuccess();
      } else if (redirectTo) {
        navigate(redirectTo);
      }
    }, 2000);
  };

  const handleGoBack = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigate(redirectTo);
    }
  };

  return (
    <div className="w-full p-6 md:p-8">
      <div className="mb-8 text-center">
        <img src="/tlogo.png" alt="Cabs" className="h-12 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2 text-white">
          Mot de passe oublié
        </h2>
        <p className="text-gray-400 text-sm">
          Contactez-nous via WhatsApp pour réinitialiser votre mot de passe.
        </p>
      </div>

      <motion.form
        onSubmit={handleWhatsAppMessage}
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          type="submit"
          className="bg-yellow-600 hover:bg-yellow-500 text-white w-full h-12"
          disabled={isSending}
        >
          {isSending ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Préparation...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <Phone className="h-4 w-4" />
              <span>Contacter via WhatsApp</span>
            </div>
          )}
        </Button>
      </motion.form>

      <div className="flex justify-center items-center mt-6">
        <ArrowLeft className="mr-1 h-3 w-3 text-yellow-500" />
        <Button
          variant="link"
          onClick={handleGoBack}
          className="text-yellow-500 hover:text-yellow-400 text-sm"
        >
          Retour à la connexion
        </Button>
      </div>

      <div className="mt-8 text-center">
        <p className="text-xs text-gray-500">
          En cas de problème, contactez notre support technique.
        </p>
      </div>
    </div>
  );
};

export default ForgetPasswordForm;
