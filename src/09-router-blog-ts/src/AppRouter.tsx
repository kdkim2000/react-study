import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import BlogLayout from './layouts/BlogLayout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ErrorPage from './pages/ErrorPage';
import BlogIndexPage, { blogIndexLoader } from './pages/BlogIndexPage';
import BlogPostPage, { blogPostLoader } from './pages/BlogPostPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
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