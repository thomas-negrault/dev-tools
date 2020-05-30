import React, { useCallback, useEffect, useState } from "react";
import JSONFormatter from "json-formatter-js";
import { Metas } from "../Layout/Metas";
import ClipBoardCopyBtn from "../common/ClipboardCopyBtn";

const TITLE = "Json Prettier Tool";
const DESCRIPTION =
  "Input a json string and navigate through the visual representation of the decoded json.";

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
    if (Object.keys(jsonParsed).length !== 0) {
      const formatter = new JSONFormatter(jsonParsed, "Infinity", {
        hoverPreviewEnabled: false,
        hoverPreviewArrayCount: 100,
        hoverPreviewFieldCount: 5,
        theme: "dark",
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
      <div className="py-4 text-center tool-header">
        <h1>{TITLE}</h1>
        <h2>{DESCRIPTION}</h2>
      </div>

      <form>
        <div className="form-group">
          <div className="text-center">
            <textarea
              className="dark"
              rows="10"
              cols="80"
              value={json}
              placeholder={'{"id": 42, "foo":"bar"}'}
              onChange={onJsonChange}
              autoFocus
            />
          </div>
          <div className="action-buttons">
            <ClipBoardCopyBtn text={json} />

            <button
              type="button"
              className="btn btn-outline-success"
              title={"Empty the input"}
              onClick={() => {
                setJson("");
              }}
            >
              <i className="fas fa-undo" />
            </button>
          </div>
          {jsonError && (
            <div className="bs-component py-4">
              <div className="alert alert-danger">
                The string is not a valid json
              </div>
            </div>
          )}
        </div>
      </form>
      <div id="json-formatter" className="dark" />
      <div className="bs-component">
        <div className="alert alert-secondary">
          <strong>{"Tips: "}</strong>
          {"You can easily generate dummy test json using "}
          <a href="https://www.json-generator.com" className="alert-link">
            json-generator.com
          </a>
        </div>
      </div>
    </>
  );
}

export default JsonPrettierTool;
