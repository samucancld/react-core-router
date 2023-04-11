import "./App.css";
import { Router } from "./components/Router";
import { Route } from "./components/Route";
import { routes } from "./routes";
import { lazy, Suspense } from "react";

const AboutPage = lazy(() => import("./pages/AboutPage"));
const HomePage = lazy(() => import("./pages/HomePage"));

interface Props {
  routeParams: any;
}

export type RoutedComponent = React.FC<Props>;

function App() {
  return (
    <main>
      <Suspense fallback={<h3>Loading...</h3>}>
        <Router routes={routes}>
          <Route path={["/", "/home"]} component={HomePage}></Route>
          <Route path={["/about"]} component={AboutPage}></Route>
        </Router>
      </Suspense>
    </main>
  );
}

export default App;
