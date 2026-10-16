// Configuração central da marca. Para trocar nome/links, edite só este arquivo
// (e as ocorrências em index.html / vite.config.ts / supabase/functions).
export const BRAND = {
  name: 'Kitsutoon',
  tagline: 'Fox Realm',
  realm: 'Reino das Raposas',
  description:
    'Seu refúgio de histórias. Descubra, leia e acompanhe os melhores mangás, manhwas e novels em português — uma experiência de leitura premium.',
  discordUrl: import.meta.env.VITE_DISCORD_URL || 'https://discord.gg/SEU_CONVITE',
} as const;
