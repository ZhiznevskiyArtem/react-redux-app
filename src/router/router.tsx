import { createBrowserRouter } from "react-router"
import ErrorPage from '../pages/error-page';
import MainPage from '../pages/main-page';
import { DETAILED_PAGE_ROUTE, HOME_ROUTE } from './routes';
import DetailedPage from "../pages/detailed-page";
import Layout from "../components/layout";

const router = createBrowserRouter([
  {
      path: HOME_ROUTE,
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
          {
              path: HOME_ROUTE,
              element: <MainPage />
          },
          {
              path: DETAILED_PAGE_ROUTE,
              element: <DetailedPage />
          }
      ]
  }
]);

export default router;