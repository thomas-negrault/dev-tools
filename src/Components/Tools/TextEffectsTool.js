import React, { useCallback, useState } from "react";
import { Metas } from "../Layout/Metas";
import copyToClipBoard from "../../Utils/CopyToClipboard";

const TITLE = "Text Effects Tool";
const effects = {
  'Crossed (big)': (plainText) => plainText.split('').map(char => char + '\u0336').join(''),
  'Crossed (small)': (plainText) => plainText.split('').map(char => char + '\u0335').join(''),
  'Slash Crossed (small)': (plainText) => plainText.split('').map(char => char + '\u0337').join(''),
  'Slash Crossed (big)': (plainText) => plainText.split('').map(char => char + '\u0338').join(''),
  'Underline (simple)': (plainText) => plainText.split('').map(char => char + '\u035f').join(''),
  'Underline (double)': (plainText) => plainText.split('').map(char => char + '\u0347').join(''),
  'Underline (dot)': (plainText) => plainText.split('').map(char => char + '\u0324').join(''),
  'Underline (wave)': (plainText) => plainText.split('').map(char => char + '\u0330').join(''),
  'To Upper Case': (plainText) => plainText.toUpperCase(),
  'To Lower Case': (plainText) => plainText.toLowerCase(),
  'Upside down (flipped)': (plainText) => flipString(plainText),
};
const DESCRIPTION =
  "Apply various effects to a text: " + Object.keys(effects).sort().join(', ');

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
           placeholder="Plain text string"
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
          {Object.keys(effects).sort().map((effectName) =>
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

function flipString(aString)
{
  const last = aString.length - 1;
  //Thanks to Brook Monroe for the
  //suggestion to use Array.join
  const result = new Array(aString.length)
  for (let i = last; i >= 0; --i)
  {
    const c = aString.charAt(i);
    const r = flipTable[c];
    result[last - i] = r !== undefined ? r : c
  }
  return result.join('')
}

const flipTable = {
  '\u0021' : '\u00A1',
  '\u0022' : '\u201E',
  '\u0026' : '\u214B',
  '\u0027' : '\u002C',
  '\u0028' : '\u0029',
  '\u002E' : '\u02D9',
  '\u0033' : '\u0190',
  '\u0034' : '\u152D',
  '\u0036' : '\u0039',
  '\u0037' : '\u2C62',
  '\u003B' : '\u061B',
  '\u003C' : '\u003E',
  '\u003F' : '\u00BF',
  '\u0041' : '\u2200',
  '\u0042' : '\u10412',
  '\u0043' : '\u2183',
  '\u0044' : '\u25D6',
  '\u0045' : '\u018E',
  '\u0046' : '\u2132',
  '\u0047' : '\u2141',
  '\u004A' : '\u017F',
  '\u004B' : '\u22CA',
  '\u004C' : '\u2142',
  '\u004D' : '\u0057',
  '\u004E' : '\u1D0E',
  '\u0050' : '\u0500',
  '\u0051' : '\u038C',
  '\u0052' : '\u1D1A',
  '\u0054' : '\u22A5',
  '\u0055' : '\u2229',
  '\u0056' : '\u1D27',
  '\u0059' : '\u2144',
  '\u005B' : '\u005D',
  '\u005F' : '\u203E',
  '\u0061' : '\u0250',
  '\u0062' : '\u0071',
  '\u0063' : '\u0254',
  '\u0064' : '\u0070',
  '\u0065' : '\u01DD',
  '\u0066' : '\u025F',
  '\u0067' : '\u0183',
  '\u0068' : '\u0265',
  '\u0069' : '\u0131',
  '\u006A' : '\u027E',
  '\u006B' : '\u029E',
  '\u006C' : '\u0283',
  '\u006D' : '\u026F',
  '\u006E' : '\u0075',
  '\u0072' : '\u0279',
  '\u0074' : '\u0287',
  '\u0076' : '\u028C',
  '\u0077' : '\u028D',
  '\u0079' : '\u028E',
  '\u007B' : '\u007D',
  '\u203F' : '\u2040',
  '\u2045' : '\u2046',
  '\u2234' : '\u2235'
}

export default TextEffectsTool;
