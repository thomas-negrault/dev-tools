import React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import VerticalMenu from "./Components/Layout/VerticalMenu";
import { Content } from "./Components/Layout/Content";
import { Footer } from "./Components/Layout/Footer";
import { Helmet } from "react-helmet";
import "bootswatch/dist/darkly/bootstrap.min.css";
import { SideBarToggle } from "./Components/Layout/SidebarToggle";

function App() {
  return (
    <div className="wrapper d-flex" id="wrapper">
      <Helmet>
        <meta charSet="utf-8" />
        <title>DevTools.best</title>
        <meta
          name="description"
          content="A set of free, fast and simple online tools, useful for developers"
          data-react-helmet="true"
        />
      </Helmet>
      <Router>
        <VerticalMenu />
        <div id="content">
          <SideBarToggle />
          <Content />
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
