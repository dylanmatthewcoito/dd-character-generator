import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import AuthPage from './pages/AuthPage'; // Import the AuthPage
import PromptPage from './pages/PromptPage';
import CharSheetPage from './pages/CharSheetPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthPage />, // Set AuthPage as the root route
  },
  {
    path: '/app',
    element: <App />,
    children: [
      {
        path: 'prompt',
        element: <PromptPage />,
      },
      {
        path: 'charsheet',
        element: <CharSheetPage />,
      },
      // other routes as needed
    ],
  },
  // More routes or redirects
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
