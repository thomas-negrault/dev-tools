import React from "react";
import { Route, Switch } from "react-router-dom";
import getLinksConfig from "../../config/tools";
import { Homepage } from "./Homepage";

export const Content = () => {
  return (
    <div className="content container">
      <Switch>
        {getLinksConfig().map(link => (
          <Route path={link.path} key={link.path}>
            {link.component}
          </Route>
        ))}
        <Route path="/">
          <Homepage />
        </Route>
      </Switch>
    </div>
  );
};
