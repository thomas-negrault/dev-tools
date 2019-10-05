import React, { useCallback, useEffect, useState } from "react";
import copyToClipBoard from "../../Utils/CopyToClipboard";

function UrlTool() {
  const [decodedUrl, setDecodedUrl] = useState("");
  const [encodedUrl, setEncodedUrl] = useState("");
  const [encodedUrlError, setEncodedUrlError] = useState(false);

  const onDecodedUrlChange = useCallback(event => {
    setDecodedUrl(event.target.value);
  }, []);

  const onEncodedUrlChange = useCallback(event => {
    setEncodedUrl(event.target.value);
  }, []);

  useEffect(() => {
    setEncodedUrl(encodeURI(decodedUrl));
  }, [decodedUrl]);

  useEffect(() => {
    try {
      setDecodedUrl(decodeURI(encodedUrl));
      setEncodedUrlError(false);
    } catch (e) {
      setEncodedUrlError(true);
    }
  }, [encodedUrl]);
  return (
    <>
      <div className="header">
        <h1>Base64</h1>
        <h2>Encode or decode urls</h2>
      </div>
      <div className="content">
        <div className="pure-form">
          <fieldset>
            <textarea
              rows="6"
              cols="60"
              value={decodedUrl}
              placeholder="Decoded url"
              onChange={onDecodedUrlChange}
              autoFocus
            />
            <button
              className="pure-button"
              title={"Copy to clipboard"}
              onClick={() => {
                copyToClipBoard(decodedUrl);
              }}
            >
              <i className="fas fa-copy" />
            </button>
            <button
              className="pure-button"
              title={"Empty the input"}
              onClick={() => {
                setDecodedUrl("");
              }}
            >
              <i className="fas fa-undo" />
            </button>
            <textarea
              aria-invalid={encodedUrlError}
              rows="6"
              cols="60"
              value={encodedUrl}
              onChange={onEncodedUrlChange}
              placeholder="Encoded url"
            />
            <button
              className="pure-button"
              title={"Copy to clipboard"}
              onClick={() => {
                copyToClipBoard(encodedUrl);
              }}
            >
              <i className="fas fa-copy" />
            </button>
            <button
              className="pure-button"
              title={"Empty the input"}
              onClick={() => {
                setEncodedUrl("");
              }}
            >
              <i className="fas fa-undo" />
            </button>
            {encodedUrlError && (
              <p className="error">The url is not a valid encoded url</p>
            )}
          </fieldset>
        </div>
      </div>
    </>
  );
}

export default UrlTool;
