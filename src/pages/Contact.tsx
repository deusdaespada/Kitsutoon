import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { BRAND } from '@/config/brand';
import { useEffect } from "react";

const Contact = () => {
  useDocumentTitle('Contato');
  useEffect(() => {
    window.location.href = BRAND.discordUrl;
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <p className="text-muted-foreground">Redirecionando para o Discord...</p>
    </div>
  );
};

export default Contact;