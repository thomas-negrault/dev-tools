import React from "react";
import { Route, Switch } from "react-router-dom";
import getLinksConfig from "../../config/tools";

export const Content = () => {
  return (
    <div className="content">
      <Switch>
        {getLinksConfig().map(link => (
          <Route path={link.path} key={link.path}>
            {link.component}
          </Route>
        ))}
        <Route path="/">
          <p> Homepage - 🏗 Work in progress 🚧</p>
          <p> 👈🏼 Access any tool by clicking on the left menu</p>
        </Route>
      </Switch>
    </div>
  );
};
