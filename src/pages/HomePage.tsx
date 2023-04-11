import React from "react";
import { RoutedComponent } from "../App";
import { Link } from "../components/Link";

const aboutPath = ["/about"];

const HomePage: RoutedComponent = () => {
  return (
    <React.Fragment>
      <h1>Home</h1>
      <p>This is a react-router clone</p>
      <Link to="/about">About us</Link>
    </React.Fragment>
  );
};

export default HomePage;
