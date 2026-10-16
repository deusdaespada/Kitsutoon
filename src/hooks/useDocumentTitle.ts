import { useEffect } from 'react';
import { BRAND } from '@/config/brand';

/**
 * Define o título da aba (SEO + usabilidade). Passe `undefined` enquanto os dados carregam
 * para manter o título padrão.
 */
export const useDocumentTitle = (title?: string | null) => {
  useEffect(() => {
    const previous = document.title;
    document.title = title ? `${title} | ${BRAND.name}` : previous;
    return () => {
      document.title = previous;
    };
  }, [title]);
};
