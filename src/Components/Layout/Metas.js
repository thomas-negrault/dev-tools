import React from "react";
import { Helmet } from "react-helmet";

const  defaultKeywords = ['developer tool', 'debug', 'tools'];
export const Metas = ({ title, description, keywords }) => {
  if(!keywords){
    keywords=[];
  }
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title} - Devtools</title>
      <meta name="keywords" content={[...keywords, defaultKeywords].join(', ')}/>

      <meta
        name="description"
        content={`${description} - Free, fast and simple online tools - ${new Date().getFullYear()}`}
        data-react-helmet="true"
      />
    </Helmet>
  );
};
