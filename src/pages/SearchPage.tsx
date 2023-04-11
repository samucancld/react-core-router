import { RoutedComponent } from "../App";

export const SearchPage: RoutedComponent = ({ routeParams }) => {
  return routeParams ? (
    <h1>{`Search results for ${routeParams?.query}`}</h1>
  ) : (
    <h1>u didn't searched nothing</h1>
  );
};
