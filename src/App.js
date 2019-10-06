import React, { useCallback, useState } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import "purecss/build/pure.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import VerticalMenu from "./Components/Layout/VerticalMenu";
import { Content } from "./Components/Layout/Content";
import { Footer } from "./Components/Layout/Footer";
import { Helmet } from "react-helmet";

function App() {
  const [mobileActive, setMobileActive] = useState(false);
  const toggleMobileActive = useCallback(() => {
    setMobileActive(!mobileActive);
  }, [mobileActive]);

  return (
    <div id="layout" className={mobileActive ? "active" : ""}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>DevTools.best</title>
        <meta
          name="description"
          content="A set of free, fast and simple online tools, useful for developers"
        />
      </Helmet>
      <span id="menuLink" className="menu-link" onClick={toggleMobileActive}>
        <span />
      </span>
      <Router>
        <VerticalMenu />
        <div id="main">
          <Content />
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
