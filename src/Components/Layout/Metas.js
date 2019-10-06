import React from "react";
import { Helmet } from "react-helmet";

export const Metas = ({ title, description }) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title} - Devtools</title>
      <link rel="canonical" href="https://devtools.best" />
      <meta
        name="description"
        content={`${description} - Free, fast and simple online tools`}
      />
    </Helmet>
  );
};
