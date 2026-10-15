# Kitsutoon

Plataforma de leitura de mangá/manhwa/webtoon (clone rebrandado do Wolftoon).
Stack: React + TypeScript + Vite + Tailwind + shadcn/ui + Supabase.

## Rodar local
```sh
cp .env.example .env     # preencha com o NOVO projeto Supabase
npm i
npm run dev
```

## Banco / backend (novo projeto Supabase)
1. Crie um projeto novo no Supabase e preencha o `.env`.
2. Aplique as migrations: `supabase link --project-ref SEU_PROJECT_ID && supabase db push`
3. Publique as edge functions: `supabase functions deploy` (check-ip-block, serve-image, notify-new-chapter, notify-vip-expiration, redeem-vip-code, delete-account).
4. Configure os secrets das functions (ex.: service role e o segredo de assinatura usado em `serve-image`) no painel do Supabase.
5. Ajuste `project_id` em `supabase/config.toml`.

## Estrutura do código
```
src/
  config/brand.ts        marca (nome, slogan, Discord)
  routes/AppRoutes.tsx   tabela única de rotas (lazy + ErrorBoundary)
  pages/                 uma página por rota
  components/
    layout/              Header, sidebar, footer, ErrorBoundary, PageLoader
    home/                seções da home (carrossel, atualizações, enquetes...)
    manga/               card, comentários, avaliação, editor
    gamification/        conquistas e VIP
    admin/ profile/ ui/  painel admin, perfil e shadcn/ui
  hooks/                 dados (React Query) e utilitários (useDocumentTitle...)
  contexts/              AuthContext
  integrations/supabase/ client e tipos
supabase/                migrations e edge functions
```
Scripts: `npm run dev`, `npm run build`, `npm run typecheck`, `npm run lint`, `npm run check` (tudo junto). CI em `.github/workflows/ci.yml`.

## Trocar nome/links
- `src/config/brand.ts` (nome, slogan, Discord via `VITE_DISCORD_URL`)
- `index.html` (título, meta tags), `vite.config.ts` (manifest PWA)
- `src/assets/brand-logo.svg`, `public/pwa-*.png`, `public/favicon.ico`
- Cor principal: variáveis `--primary`/`--accent` em `src/index.css`

## Atenção
- Em `supabase/functions/check-ip-block` e `serve-image` há uma lista de domínios/referers permitidos (`'kitsutoon'`). **Inclua o domínio real do site**, senão as imagens e a proteção podem bloquear o acesso.
- Rotas, tabelas, VIP, gamificação e painel admin continuam iguais ao original.
