import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import BlogLayout from './layouts/BlogLayout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ErrorPage from './pages/ErrorPage';
import BlogIndexPage, { blogIndexLoader } from './pages/BlogIndexPage';
import BlogPostPage, { blogPostLoader } from './pages/BlogPostPage';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// Hydration 중 보여줄 Fallback 컴포넌트
function HydrateFallback() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: 2
      }}
    >
      <CircularProgress />
      <Typography variant="body2" color="text.secondary">
        로딩 중...
      </Typography>
    </Box>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    HydrateFallback, // HydrateFallback 추가
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      {
        path: 'blog',
        element: <BlogLayout />,
        children: [
          { index: true, element: <BlogIndexPage />, loader: blogIndexLoader },
          { path: ':slug', element: <BlogPostPage />, loader: blogPostLoader },
        ],
      },
      { path: '*', element: <ErrorPage /> }, // 404 fallback
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}