import React from "react";
import { Helmet } from "react-helmet";

export const Metas = ({ title, description }) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title} - Devtools</title>
      <meta
        name="description"
        content={`${description} - Free, fast and simple online tools`}
        data-react-helmet="true"
      />
    </Helmet>
  );
};
