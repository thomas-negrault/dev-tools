import React, { useCallback, useState } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import "purecss/build/pure.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import VerticalMenu from "./Components/Layout/VerticalMenu";
import { Content } from "./Components/Layout/Content";
import { Footer } from "./Components/Layout/Footer";

function App() {
  const [mobileActive, setMobileActive] = useState(false);
  const toggleMobileActive = useCallback(() => {
    setMobileActive(!mobileActive);
  }, [mobileActive]);

  return (
    <div id="layout" className={mobileActive ? "active" : ""}>
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
