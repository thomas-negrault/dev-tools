import React, { useCallback, useState } from "react";
import { Metas } from "../Layout/Metas";
import copyToClipBoard from "../../Utils/CopyToClipboard";

function flipString(aString) {
  const last = aString.length - 1;
  //Thanks to Brook Monroe for the
  //suggestion to use Array.join
  const result = new Array(aString.length);
  for (let i = last; i >= 0; --i) {
    const c = aString.charAt(i);
    const r = flipTable[c];
    result[last - i] = r !== undefined ? r : c;
  }
  return result.join("");
}

const flipTable = {
  "\u0021": "\u00A1",
  "\u0022": "\u201E",
  "\u0026": "\u214B",
  "\u0027": "\u002C",
  "\u0028": "\u0029",
  "\u002E": "\u02D9",
  "\u0033": "\u0190",
  "\u0034": "\u152D",
  "\u0036": "\u0039",
  "\u0037": "\u2C62",
  "\u003B": "\u061B",
  "\u003C": "\u003E",
  "\u003F": "\u00BF",
  A: "\u2200",
  B: "\u10412",
  C: "\u2183",
  D: "\u25D6",
  E: "\u018E",
  F: "\u2132",
  G: "\u2141",
  J: "\u017F",
  K: "\u22CA",
  L: "\u2142",
  M: "\u0057",
  N: "\u1D0E",
  P: "\u0500",
  Q: "\u038C",
  R: "\u1D1A",
  T: "\u22A5",
  U: "\u2229",
  V: "\u1D27",
  Y: "\u2144",
  "\u005B": "\u005D",
  _: "\u203E",
  a: "\u0250",
  b: "\u0071",
  c: "\u0254",
  d: "\u0070",
  e: "\u01DD",
  f: "\u025F",
  g: "\u0183",
  h: "\u0265",
  i: "\u0131",
  j: "\u027E",
  k: "\u029E",
  l: "\u0283",
  m: "\u026F",
  n: "\u0075",
  r: "\u0279",
  t: "\u0287",
  v: "\u028C",
  w: "\u028D",
  y: "\u028E",
  "\u007B": "\u007D",
  "\u203F": "\u2040",
  "\u2045": "\u2046",
  "\u2234": "\u2235"
};

const TITLE = "Text Effects Tool";
const effects = {
  "Crossed (big)": plainText =>
    plainText
      .split("")
      .map(char => char + "\u0336")
      .join(""),
  "Crossed (small)": plainText =>
    plainText
      .split("")
      .map(char => char + "\u0335")
      .join(""),
  "Slash Crossed (small)": plainText =>
    plainText
      .split("")
      .map(char => char + "\u0337")
      .join(""),
  "Slash Crossed (big)": plainText =>
    plainText
      .split("")
      .map(char => char + "\u0338")
      .join(""),
  "Underline (simple)": plainText =>
    plainText
      .split("")
      .map(char => char + "\u035f")
      .join(""),
  "Underline (double)": plainText =>
    plainText
      .split("")
      .map(char => char + "\u0347")
      .join(""),
  "Underline (dot)": plainText =>
    plainText
      .split("")
      .map(char => char + "\u0324")
      .join(""),
  "Underline (wave)": plainText =>
    plainText
      .split("")
      .map(char => char + "\u0330")
      .join(""),
  "To Upper Case": plainText => plainText.toUpperCase(),
  "To Lower Case": plainText => plainText.toLowerCase(),
  "Upside down (flipped)": plainText => flipString(plainText)
};
const DESCRIPTION =
  "Apply various effects to a text: " +
  Object.keys(effects)
    .sort()
    .map(name => {
      return effects[name](name);
    })
    .join(", ");

function TextEffectsTool() {
  const [plainText, setPlainText] = useState("");

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
            {Object.keys(effects)
              .sort()
              .map(effectName => (
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
                      <i className="fas fa-copy" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TextEffectsTool;
