import { RoutedComponent } from "./App";
import AboutPage from "./pages/AboutPage";
// import { HomePage } from "./pages/HomePage";
import { SearchPage } from "./pages/SearchPage";

export interface RouteInterface {
  path: string[];
  title?: string;
  component: RoutedComponent;
}

export const routes: RouteInterface[] = [
  // { path: ["/", "/home"], title: "Home", component: HomePage },
  { path: ["/about"], title: "About", component: AboutPage },
  { path: ["/search/:query"], title: "Search", component: SearchPage },
];
