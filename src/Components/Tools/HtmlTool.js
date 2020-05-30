import React, { useCallback, useState } from "react";
import { Metas } from "../Layout/Metas";
import he from "he";
import ClipBoardCopyBtn from "../common/ClipboardCopyBtn";

const TITLE = "HTML Encoder/Decoder Tool";
const DESCRIPTION =
  "Encode or decode string containing HTML characters. Avoid errors using reserved characters like < or > in your text.";

function HtmlTool() {
  const [decodedHtml, setDecodedHtml] = useState("");
  const [encodedHtml, setEncodedHtml] = useState("");
  const [encodedHtmlError, setEncodedHtmlError] = useState(false);
  const [useNamedReferences, setUseNamedReferences] = useState(true);

  const onDecodedHtmlChange = useCallback(
    event => {
      const newDecodedHtml = event.target.value;
      setDecodedHtml(newDecodedHtml);
      setEncodedHtml(
        he.encode(newDecodedHtml, { useNamedReferences: useNamedReferences })
      );
    },
    [useNamedReferences]
  );

  const onEncodedHtmlChange = useCallback(event => {
    const newEncodedHtml = event.target.value;
    setEncodedHtml(newEncodedHtml);
    try {
      setDecodedHtml(he.decode(newEncodedHtml));
      setEncodedHtmlError(false);
    } catch (e) {
      setEncodedHtmlError(true);
    }
  }, []);

  const onUseNamedReferencesChange = useCallback(
    event => {
      const newUseNamedReferencesChange = event.target.checked;
      setUseNamedReferences(newUseNamedReferencesChange);
      setEncodedHtml(
        he.encode(decodedHtml, {
          useNamedReferences: newUseNamedReferencesChange
        })
      );
    },
    [decodedHtml]
  );

  return (
    <>
      <Metas title={TITLE} description={DESCRIPTION} />
      <div className="py-4 text-center tool-header">
        <h1>{TITLE}</h1>
        <h2>{DESCRIPTION}</h2>
      </div>

      <form>
        <div className="form-group row">
          <div className="col">
            <div className="row">
              <textarea
                className="dark"
                cols="60"
                rows="6"
                value={decodedHtml}
                placeholder="Decoded html"
                onChange={onDecodedHtmlChange}
                autoFocus
              />
            </div>
            <div className="action-buttons">
              <ClipBoardCopyBtn text={decodedHtml} />

              <button
                type="button"
                className="btn btn-outline-success"
                title={"Empty the input"}
                onClick={() => {
                  setDecodedHtml("");
                }}
              >
                <i className="fas fa-undo" />
              </button>
            </div>
          </div>
          <div className="col">
            <div className="row">
              <textarea
                className="dark"
                aria-invalid={encodedHtmlError}
                rows="6"
                cols="60"
                value={encodedHtml}
                onChange={onEncodedHtmlChange}
                placeholder="Encoded html"
              />
            </div>
            <div className="action-buttons">
              <ClipBoardCopyBtn text={encodedHtml} />
              <button
                type="button"
                className="btn btn-outline-success"
                title={"Empty the input"}
                onClick={() => {
                  setEncodedHtml("");
                }}
              >
                <i className="fas fa-undo" />
              </button>
            </div>

            <label>
              Use named references{" "}
              <input
                type={"checkbox"}
                checked={useNamedReferences}
                onChange={onUseNamedReferencesChange}
              />
            </label>
            <p>
              If checked, will display named entities like:{" "}
              <code>{"&amp;"}</code> instead of the hexadecimal form:{" "}
              <code>{"&#x26;"}</code>
            </p>
            {encodedHtmlError && (
              <div className="bs-component">
                <div className="alert alert-danger">
                  The html is not a valid encoded html
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </>
  );
}

export default HtmlTool;
