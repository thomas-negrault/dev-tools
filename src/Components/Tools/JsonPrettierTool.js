import React, { useCallback, useEffect, useState } from "react";
import copyToClipBoard from "../../Utils/CopyToClipboard";
import JSONFormatter from "json-formatter-js";
import { Metas } from "../Layout/Metas";

const TITLE = "Json Prettier Tool";
const DESCRIPTION =
  "Input a json string and navigate through the visual representation of the decoded json";

function JsonPrettierTool() {
  const [json, setJson] = useState("");
  const [jsonError, setJsonError] = useState(false);

  const onJsonChange = useCallback(event => {
    setJson(event.target.value);
  }, []);

  useEffect(() => {
    const jsonFormatter = document.getElementById("json-formatter");
    let jsonParsed = {};
    try {
      jsonParsed = JSON.parse(json);
    } catch (e) {
      setJsonError(true);
    }
    if (jsonParsed !== {}) {
      const formatter = new JSONFormatter(jsonParsed, "Infinity", {
        hoverPreviewEnabled: false,
        hoverPreviewArrayCount: 100,
        hoverPreviewFieldCount: 5,
        theme: "",
        animateOpen: true,
        animateClose: true,
        useToJSON: true
      });
      jsonFormatter.innerHTML = "";
      jsonFormatter.appendChild(formatter.render());
      setJsonError(false);
    }
  }, [json]);

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
              value={json}
              placeholder={'{"id": 42, "foo":"bar"}'}
              onChange={onJsonChange}
              autoFocus
            />
            {jsonError && (
              <p className="error">The string is not a valid json</p>
            )}
            <button
              className="pure-button"
              title={"Copy to clipboard"}
              onClick={() => {
                copyToClipBoard(json);
              }}
            >
              <i className="fas fa-copy" />
            </button>
            <button
              className="pure-button"
              title={"Empty the input"}
              onClick={() => {
                setJson("");
              }}
            >
              <i className="fas fa-undo" />
            </button>
          </fieldset>
          <div id="json-formatter" />
        </div>
      </div>
    </>
  );
}

export default JsonPrettierTool;
