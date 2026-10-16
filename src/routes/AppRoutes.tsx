import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Index from '@/pages/Index';
import PageLoader from '@/components/layout/PageLoader';
import ErrorBoundary from '@/components/layout/ErrorBoundary';

// Páginas carregadas sob demanda (code splitting por rota)
const Catalog = lazy(() => import('@/pages/Catalog'));
const MangaDetails = lazy(() => import('@/pages/MangaDetails'));
const Reader = lazy(() => import('@/pages/Reader'));
const Search = lazy(() => import('@/pages/Search'));
const Auth = lazy(() => import('@/pages/Auth'));
const Admin = lazy(() => import('@/pages/Admin'));
const TitleCreator = lazy(() => import('@/pages/TitleCreator'));
const ChapterUpload = lazy(() => import('@/pages/ChapterUpload'));
const BatchChapterUpload = lazy(() => import('@/pages/BatchChapterUpload'));
const Vip = lazy(() => import('@/pages/Vip'));
const VipStatus = lazy(() => import('@/pages/VipStatus'));
const Profile = lazy(() => import('@/pages/Profile'));
const Terms = lazy(() => import('@/pages/Terms'));
const Privacy = lazy(() => import('@/pages/Privacy'));
const Contact = lazy(() => import('@/pages/Contact'));
const Dmca = lazy(() => import('@/pages/Dmca'));
const Ranking = lazy(() => import('@/pages/Ranking'));
const Install = lazy(() => import('@/pages/Install'));
const MyList = lazy(() => import('@/pages/MyList'));
const Notifications = lazy(() => import('@/pages/Notifications'));
const NotFound = lazy(() => import('@/pages/NotFound'));

/** Tabela única de rotas: para criar/alterar uma página, edite só aqui. */
const routes: { path: string; element: JSX.Element }[] = [
  { path: '/', element: <Index /> },
  { path: '/catalog', element: <Catalog /> },
  { path: '/search', element: <Search /> },
  { path: '/ranking', element: <Ranking /> },
  { path: '/manga/:slug', element: <MangaDetails /> },
  { path: '/read/:id/:chapter', element: <Reader /> },
  { path: '/auth', element: <Auth /> },
  { path: '/profile', element: <Profile /> },
  { path: '/my-list', element: <MyList /> },
  { path: '/notifications', element: <Notifications /> },
  { path: '/vip', element: <Vip /> },
  { path: '/vip/status', element: <VipStatus /> },
  // Administração / criação de conteúdo (cada página valida a permissão internamente)
  { path: '/admin', element: <Admin /> },
  { path: '/admin/create', element: <TitleCreator /> },
  { path: '/admin/create-comic', element: <TitleCreator /> }, // legado
  { path: '/admin/create-novel', element: <TitleCreator /> }, // legado
  { path: '/create', element: <TitleCreator /> },
  { path: '/manga/:id/edit', element: <TitleCreator /> },
  { path: '/admin/upload-chapter', element: <ChapterUpload /> },
  { path: '/admin/batch-upload', element: <BatchChapterUpload /> },
  { path: '/upload/chapter/:titleId', element: <ChapterUpload /> },
  { path: '/upload/bulk/:titleId', element: <BatchChapterUpload /> },
  // Institucional
  { path: '/terms', element: <Terms /> },
  { path: '/privacy', element: <Privacy /> },
  { path: '/contact', element: <Contact /> },
  { path: '/dmca', element: <Dmca /> },
  { path: '/install', element: <Install /> },
];

const AppRoutes = () => {
  const location = useLocation();
  return (
    <ErrorBoundary resetKey={location.pathname}>
      <AnimatePresence mode="wait">
        <Suspense fallback={<PageLoader />} key={location.pathname}>
          <Routes location={location}>
            {routes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </ErrorBoundary>
  );
};

export default AppRoutes;
