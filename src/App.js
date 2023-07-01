import './App.css';
import Home from './pages/Home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RecipePage from './pages/RecipePage';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      children: [
        { index: true, element: <Home /> },
        { path: ':id', element: <RecipePage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
