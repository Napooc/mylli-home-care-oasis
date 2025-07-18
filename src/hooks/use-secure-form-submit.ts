
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
// EmailJS removed - no longer needed
import { securityValidator } from '@/utils/securityValidator';
import { securitySession } from '@/utils/securitySession';
import { securityMonitor } from '@/utils/securityMonitor';

type SecureSubmitOptions = {
  formName: string;
  templateId?: string;
  resetForm?: boolean;
  successMessage?: {
    title?: string;
    description?: string;
  };
  errorMessage?: {
    title?: string;
    description?: string;
  };
  skipRateLimit?: boolean;
  requireCSRFValidation?: boolean;
};

export const useSecureFormSubmit = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const submitForm = async (
    formData: Record<string, any>,
    options: SecureSubmitOptions,
    onReset?: () => void
  ) => {
    setIsSubmitting(true);
    
    try {
      // Rate limiting check
      if (!options.skipRateLimit) {
        const sessionId = securitySession.getSession().id;
        if (!securityValidator.checkRateLimit(sessionId, 'FORM_SUBMISSION')) {
          securityMonitor.logRateLimitHit('FORM_SUBMISSION', sessionId);
          toast({
            title: "Trop de tentatives",
            description: "Veuillez patienter avant de soumettre à nouveau le formulaire.",
            variant: "destructive",
          });
          return false;
        }
      }

      // CSRF validation
      if (options.requireCSRFValidation && formData.csrf_token) {
        if (!securitySession.validateCSRFToken(formData.csrf_token)) {
          securityMonitor.logSuspiciousActivity('INVALID_CSRF_TOKEN', { 
            formName: options.formName 
          });
          toast({
            title: "Erreur de sécurité",
            description: "Token de sécurité invalide. Veuillez recharger la page.",
            variant: "destructive",
          });
          return false;
        }
      }

      // Comprehensive input validation and sanitization
      const validation = securityValidator.validateFormData(formData);
      
      if (!validation.isValid) {
        securityMonitor.logFormSubmission(options.formName, false, validation.errors);
        toast({
          title: "Données invalides",
          description: validation.errors.join(', '),
          variant: "destructive",
        });
        return false;
      }

      // Remove CSRF token from submission data
      const { csrf_token, ...submissionData } = validation.sanitized;

      console.log('Secure form data prepared:', submissionData);
      
      // EmailJS has been removed - form data is just logged securely
      console.log('EmailJS removed - secure form would have been sent with:', {
        data: submissionData,
        formName: options.formName,
        templateId: options.templateId
      });

      // Log successful processing since EmailJS is removed
      securityMonitor.logFormSubmission(options.formName, true);
      securitySession.updateLastActivity();
      
      toast({
        title: options.successMessage?.title || "Formulaire traité",
        description: options.successMessage?.description || "Les données du formulaire ont été traitées de manière sécurisée (EmailJS supprimé).",
      });

      if (options.resetForm && onReset) {
        onReset();
      }
      return true;
    } catch (error) {
      console.error('Form submission error:', error);
      securityMonitor.logFormSubmission(options.formName, false, [String(error)]);
      
      toast({
        title: options.errorMessage?.title || "Erreur",
        description: options.errorMessage?.description || "Une erreur est survenue lors de l'envoi du formulaire.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitForm,
    isSubmitting
  };
};
