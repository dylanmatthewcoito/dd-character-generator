import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import AuthPage from './pages/AuthPage'; // Import the AuthPage
import PromptPage from './pages/PromptPage';
import CharSheetPage from './pages/CharSheetPage';
import ProfilePageComponent from './pages/ProfilePage'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // App is now the root element for all routes
    children: [
      // AuthPage is now a child route of App
      {
        index: true,
        element: <AuthPage />,
      },
      {
        path: 'app',
        children: [
          {
            path: 'prompt',
            element: <PromptPage />,
          },
          {
            path: 'charsheet',
            element: <CharSheetPage />,
          },
          {
            path: 'profile',
            element: <ProfilePageComponent/>,
          },
          // other routes as needed
        ],
      },
    ],
  },
  // More routes or redirects
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
