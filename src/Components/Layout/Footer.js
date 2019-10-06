import React from "react";
import SvgEiffelTower from "../../Icons/EiffelTower";

export const Footer = () => {
  return (
    <div className="footer">
      <div className="pure-u-1 u-sm-1-2">
        <p className="legal-license">
          Made with ❤️ in Paris
          <span id="eiffel-tower">
            <SvgEiffelTower height={25} width={25} />
          </span>
        </p>
        <p className="legal-copyright">
          © 2019 - Present{" "}
          <a
            href="https://fr.linkedin.com/in/negraultthomas"
            rel="noopener noreferrer"
            target="_blank"
          >
            Thomas Negrault
          </a>
        </p>
        <p>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://icons8.com/icons/set/eiffel-tower"
          >
            Pastel
          </a>{" "}
          icon by{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://icons8.com"
          >
            Icons8
          </a>
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
