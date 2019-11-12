import React, { useCallback, useState } from "react";
import Hashes from "jshashes";

import { Metas } from "../Layout/Metas";
import copyToClipBoard from "../../Utils/CopyToClipboard";

const TITLE = "String hash generator tool";
const effects = {
  'Crossed': (plainText) => plainText.split('').map(char => char + '\u0336').join(''),
};
const DESCRIPTION =
  "Apply effects to a text: " + Object.keys(effects).join(',');

function TextEffectsTool() {
  const [plainText, setPlainText] = useState('');

  const onPlainTextChange = useCallback(event => {
    setPlainText(event.target.value);
  }, []);

  return (
    <>
      <Metas title={TITLE} description={DESCRIPTION} />
      <div className="py-4 text-center tool-header">
        <h1>{TITLE}</h1>
        <h2>{DESCRIPTION}</h2>
      </div>
      <div className="row">
         <textarea
           className="dark"
           rows="6"
           cols="60"
           value={plainText}
           onChange={onPlainTextChange}
           placeholder="Plain text string to hash"
         />
      </div>
      <div className="row py-4">
        <table className="table" id="hashTable">
          <thead>
          <tr>
            <th>Effect</th>
            <th>Result</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          {Object.keys(effects).map((effectName) =>
            <tr key={effectName}>
              <td>{effectName}</td>
              <td>{effects[effectName](plainText)}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-outline-success"
                  title={"Copy to clipboard"}
                  onClick={() => {
                    copyToClipBoard(effects[effectName](plainText));
                  }}
                >
                  <i className="fas fa-copy"/>
                </button>
              </td>
            </tr>)
          }
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TextEffectsTool;
