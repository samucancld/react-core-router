import React from "react";
import { RoutedComponent } from "../App";
import { Link } from "../components/Link";

const AboutPage: RoutedComponent = () => {
  return (
    <React.Fragment>
      <h1>About</h1>
      <div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Ryan-Thomas-Gosling.jpg/128px-Ryan-Thomas-Gosling.jpg"
          alt=""
        />
      </div>
      <p>
        <i>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse quos
          quisquam vitae, provident sequi, odit temporibus ad enim aliquam
          tempora ex quis, adipisci voluptatem dolorem facere exercitationem
          corporis est? Cumque.
        </i>
      </p>
      <Link to="/home">Home</Link>
    </React.Fragment>
  );
};

export default AboutPage;
