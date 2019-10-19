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
              value={decodedString}
              placeholder="Decoded string"
              onChange={onDecodedStringChange}
              autoFocus
            />
            <button
              className="pure-button"
              title={"Copy to clipboard"}
              onClick={() => {
                copyToClipBoard(decodedString);
              }}
            >
              <i className="fas fa-copy" />
            </button>
            <button
              className="pure-button"
              title={"Empty the input"}
              onClick={() => {
                setDecodedString("");
              }}
            >
              <i className="fas fa-undo" />
            </button>
            <textarea
              aria-invalid={encodedStringError}
              rows="6"
              cols="60"
              value={encodedString}
              onChange={onEncodedStringChange}
              placeholder="Encoded string"
            />
            <button
              className="pure-button"
              title={"Copy to clipboard"}
              onClick={() => {
                copyToClipBoard(encodedString);
              }}
            >
              <i className="fas fa-copy" />
            </button>
            <button
              className="pure-button"
              title={"Empty the input"}
              onClick={() => {
                setEncodedString("");
              }}
            >
              <i className="fas fa-undo" />
            </button>
            {encodedStringError && (
              <p className="error">
                The string is not a valid base 64 encoded string
              </p>
            )}
          </fieldset>
        </div>
      </div>
    </>
  );
}

export default Base64Tools;
