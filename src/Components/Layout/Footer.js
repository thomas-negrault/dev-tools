import React from "react";

export const Footer = () => {
  return (
    <div className="footer">
      <div className="pure-u-1 u-sm-1-2">
        <p className="legal-copyright">
          {` © 2019 - ${new Date().getFullYear()} `}
          <a
            href="https://fr.linkedin.com/in/negraultthomas"
            rel="noopener noreferrer"
            target="_blank"
          >
            Thomas Negrault
          </a>
        </p>
        <p>
          Feel free to contact me at{" "}
          <a href="mailto:contact@devtools.best">contact@devtools.best</a>
        </p>
        <p>
          Icons made by{" "}
          <a href="https://www.flaticon.com/authors/becris" title="Becris">
            Becris
          </a>{" "}
          from{" "}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
        </p>
      </div>
    </div>
  );
};
