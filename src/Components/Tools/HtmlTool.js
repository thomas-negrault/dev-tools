import React, { useCallback, useEffect, useState } from "react";
import copyToClipBoard from "../../Utils/CopyToClipboard";
import { Metas } from "../Layout/Metas";
import he from 'he';

const TITLE = "HTML Encoder/Decoder Tool";
const DESCRIPTION =
  "Encode or decode string containing HTML characters. Avoid errors using reserved characters like < or > in your text.";

function HtmlTool() {
  const [decodedHtml, setDecodedHtml] = useState("");
  const [encodedHtml, setEncodedHtml] = useState("");
  const [encodedHtmlError, setEncodedHtmlError] = useState(false);

  const onDecodedHtmlChange = useCallback(event => {
    setDecodedHtml(event.target.value);
  }, []);

  const onEncodedHtmlChange = useCallback(event => {
    setEncodedHtml(event.target.value);
  }, []);

  useEffect(() => {
    setEncodedHtml(he.encode(decodedHtml));
  }, [decodedHtml]);

  useEffect(() => {
    try {
      setDecodedHtml(he.decode(encodedHtml));
      setEncodedHtmlError(false);
    } catch (e) {
      setEncodedHtmlError(true);
    }
  }, [encodedHtml]);
  return (
    <>
      <Metas title={TITLE} description={DESCRIPTION}/>
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
              <button
                type="button"
                className="btn btn-outline-success"
                title={"Copy to clipboard"}
                onClick={() => {
                  copyToClipBoard(decodedHtml);
                }}
              >
                <i className="fas fa-copy"/>
              </button>
              <button
                type="button"
                className="btn btn-outline-success"
                title={"Empty the input"}
                onClick={() => {
                  setDecodedHtml("");
                }}
              >
                <i className="fas fa-undo"/>
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
              <button
                type="button"
                className="btn btn-outline-success"
                title={"Copy to clipboard"}
                onClick={() => {
                  copyToClipBoard(encodedHtml);
                }}
              >
                <i className="fas fa-copy"/>
              </button>
              <button
                type="button"
                className="btn btn-outline-success"
                title={"Empty the input"}
                onClick={() => {
                  setEncodedHtml("");
                }}
              >
                <i className="fas fa-undo"/>
              </button>
            </div>
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
