import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import PromptPage from './pages/PromptPage'; // Make sure to import PromptPage
import CharSheetPage from './pages/CharSheetPage';

// Create a router with createBrowserRouter
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // App will be the layout component
    children: [
      {
        index: true,
        element: <PromptPage />, // Set PromptPage as the index route
      },
      {
        path: 'charsheet',
        element: <CharSheetPage />,
      },
      // Define other routes as needed here
    ],
  },
]);

// Use the router with RouterProvider in the root render
ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
