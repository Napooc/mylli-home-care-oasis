
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
// EmailJS removed - no longer needed

type SubmitOptions = {
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
};

export const useFormSubmit = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const submitForm = async (
    formData: Record<string, any>,
    options: SubmitOptions,
    onReset?: () => void
  ) => {
    setIsSubmitting(true);
    
    try {
      // Ensure all form data is properly stringified
      const sanitizedFormData: Record<string, string> = {};
      
      // Explicitly process and sanitize each form field
      Object.keys(formData).forEach(key => {
        const value = formData[key];
        
        // Handle each data type explicitly
        if (value === null || value === undefined) {
          sanitizedFormData[key] = '';
        } else if (typeof value === 'object') {
          try {
            sanitizedFormData[key] = JSON.stringify(value);
          } catch {
            sanitizedFormData[key] = '[Object]';
          }
        } else {
          // Convert everything else to string
          sanitizedFormData[key] = String(value);
        }
      });

      console.log('Form data prepared:', sanitizedFormData);
      
      // EmailJS has been removed - form data is just logged
      console.log('EmailJS removed - form would have been sent with:', {
        data: sanitizedFormData,
        formName: options.formName,
        templateId: options.templateId
      });

      // Simulate successful submission since EmailJS is removed
      toast({
        title: options.successMessage?.title || "Formulaire préparé",
        description: options.successMessage?.description || "Les données du formulaire ont été traitées (EmailJS supprimé).",
      });

      if (options.resetForm && onReset) {
        onReset();
      }
      return true;
    } catch (error) {
      console.error('Form submission error:', error);
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
