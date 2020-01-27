import React, { useCallback, useEffect, useState } from "react";
import copyToClipBoard from "../../Utils/CopyToClipboard";
import { Metas } from "../Layout/Metas";

const TITLE = "Base64 encoder/decoder";
const DESCRIPTION = "Encode or decode base64 strings.";

function Base64Tools() {
  const [decodedString, setDecodedString] = useState("");
  const [encodedString, setEncodedString] = useState("");
  const [encodedStringError, setEncodedStringError] = useState(false);

  const onDecodedStringChange = useCallback(event => {
    setDecodedString(event.target.value);
  }, []);

  const onEncodedStringChange = useCallback(event => {
    setEncodedString(event.target.value);
  }, []);

  useEffect(() => {
    setEncodedString(btoa(decodedString));
  }, [decodedString]);

  useEffect(() => {
    try {
      setDecodedString(atob(encodedString));
      setEncodedStringError(false);
    } catch (e) {
      setEncodedStringError(true);
    }
  }, [encodedString]);

  return (
    <>
      <Metas title={TITLE} description={DESCRIPTION} keywords={['base64 encode', 'base64 decode', 'base64encode', 'base64decode', 'base 64', 'base 64 encoder', 'base64 decoder', 'base64 generator']}/>
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
                rows="6"
                cols="60"
                value={decodedString}
                placeholder="Decoded string"
                onChange={onDecodedStringChange}
                autoFocus
              />
            </div>

            <div className="action-buttons">
              <button
                type="button"
                className="btn btn-outline-success"
                title={"Copy to clipboard"}
                onClick={() => {
                  copyToClipBoard(decodedString);
                }}
              >
                <i className="fas fa-copy"/>
              </button>
              <button
                type="button"
                className="btn btn-outline-success"
                title={"Empty the input"}
                onClick={() => {
                  setDecodedString("");
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
                aria-invalid={encodedStringError}
                rows="6"
                cols="60"
                value={encodedString}
                onChange={onEncodedStringChange}
                placeholder="Encoded string"
              />
            </div>
            <div className="action-buttons">
              <button
                type="button"
                className="btn btn-outline-success"
                title={"Copy to clipboard"}
                onClick={() => {
                  copyToClipBoard(encodedString);
                }}
              >
                <i className="fas fa-copy"/>
              </button>
              <button
                type="button"
                className="btn btn-outline-success"
                title={"Empty the input"}
                onClick={() => {
                  setEncodedString("");
                }}
              >
                <i className="fas fa-undo"/>
              </button>
              {encodedStringError && (
                <div className="bs-component">
                  <div className="alert alert-danger">
                    The string is not a valid base 64 encoded string
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default Base64Tools;
