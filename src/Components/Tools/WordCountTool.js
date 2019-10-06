import React, { useCallback, useState } from "react";
import copyToClipBoard from "../../Utils/CopyToClipboard";
import { Metas } from "../Layout/Metas";
const TITLE = "Text Statistics Tool";
const DESCRIPTION =
  "Give detailed statistics about a text: number of characters (with and without spaces), number of words, line breaks and more.";
function WordCount() {
  const [text, setText] = useState("");

  const onTextChange = useCallback(event => {
    setText(event.target.value);
  }, []);

  return (
    <>
      <Metas title={TITLE} description={DESCRIPTION} />
      <div className="header">
        <h1>{TITLE}</h1>
        <h2>{DESCRIPTION}</h2>
      </div>
      <div className="content">
        <div className="pure-form">
          <fieldset>
            <textarea
              rows="6"
              cols="60"
              value={text}
              placeholder="Some interesting text"
              onChange={onTextChange}
              autoFocus
            />
            <button
              className="pure-button"
              title={"Copy to clipboard"}
              onClick={() => {
                copyToClipBoard(text);
              }}
            >
              <i className="fas fa-copy" />
            </button>
            <button
              className="pure-button"
              title={"Empty the input"}
              onClick={() => {
                setText("");
              }}
            >
              <i className="fas fa-undo" />
            </button>
          </fieldset>
        </div>
        <table className="pure-table">
          <thead>
            <tr>
              <th>Characters</th>
              <th>Characters (no spaces)</th>
              <th>Spaces</th>
              <th>Words</th>
              <th>Line Breaks</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{text.length}</td>
              <td>
                {text ? text.length - (text.match(/ /g) || []).length : 0}
              </td>
              <td>{(text.match(/ /g) || []).length}</td>
              <td>{text ? text.split(" ").length : 0}</td>
              <td>{(text.match(/\r?\n|\r/g) || []).length}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default WordCount;
