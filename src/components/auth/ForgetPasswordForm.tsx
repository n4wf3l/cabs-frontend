import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Phone, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

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
    <div className="w-full">
      <img src="/cabslogo.png" alt="Cabs" className="h-10 mb-6 mx-auto" />
      <h2 className="text-2xl font-bold mb-4 text-center">
        Mot de passe oublié
      </h2>
      <p className="text-sm text-center text-gray-400 mb-6">
        Contactez-nous via WhatsApp pour réinitialiser votre mot de passe.
      </p>

      <form onSubmit={handleWhatsAppMessage} className="space-y-4">
        <Button
          type="submit"
          className="bg-yellow-600 hover:bg-yellow-500 text-white w-full"
          disabled={isSending}
        >
          {isSending ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
          ) : (
            <Phone className="mr-2 h-4 w-4" />
          )}
          {isSending ? "Préparation..." : "Contacter via WhatsApp"}
        </Button>
      </form>

      <Button
        variant="link"
        onClick={handleGoBack}
        className="text-yellow-400 mt-4 mx-auto block"
      >
        <ArrowLeft className="mr-1 h-3 w-3" />
        Retour à la connexion
      </Button>
    </div>
  );
};

export default ForgetPasswordForm;
