import React, { useCallback, useState } from "react";
import copyToClipBoard from "../../Utils/CopyToClipboard";
import { Metas } from "../Layout/Metas";

const TITLE = "Url Encoder/Decoder Tool";
const DESCRIPTION =
  'Encode or decode urls. Replaces unsafe ASCII characters with a "%" followed by two hexadecimal digits.';

function UrlTool() {
  const [decodedUrl, setDecodedUrl] = useState("");
  const [encodedUrl, setEncodedUrl] = useState("");
  const [encodedUrlError, setEncodedUrlError] = useState(false);

  const onDecodedUrlChange = useCallback(event => {
    const newDecodedUrl = event.target.value;
    setDecodedUrl(newDecodedUrl);
    setEncodedUrl(encodeURI(newDecodedUrl));
  }, []);

  const onEncodedUrlChange = useCallback(event => {
    const newEncodedUrl = event.target.value;
    setEncodedUrl(newEncodedUrl);
    try {
      setDecodedUrl(decodeURIComponent(newEncodedUrl));
      setEncodedUrlError(false);
    } catch (e) {
      setEncodedUrlError(true);
    }
  }, []);

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
                value={decodedUrl}
                placeholder="Decoded url"
                onChange={onDecodedUrlChange}
                autoFocus
              />
            </div>
            <div className="action-buttons">
              <button
                type="button"
                className="btn btn-outline-success"
                title={"Copy to clipboard"}
                onClick={() => {
                  copyToClipBoard(decodedUrl);
                }}
              >
                <i className="fas fa-copy" />
              </button>
              <button
                type="button"
                className="btn btn-outline-success"
                title={"Empty the input"}
                onClick={() => {
                  setDecodedUrl("");
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
                aria-invalid={encodedUrlError}
                rows="6"
                cols="60"
                value={encodedUrl}
                onChange={onEncodedUrlChange}
                placeholder="Encoded url"
              />
            </div>
            <div className="action-buttons">
              <button
                type="button"
                className="btn btn-outline-success"
                title={"Copy to clipboard"}
                onClick={() => {
                  copyToClipBoard(encodedUrl);
                }}
              >
                <i className="fas fa-copy" />
              </button>
              <button
                type="button"
                className="btn btn-outline-success"
                title={"Empty the input"}
                onClick={() => {
                  setEncodedUrl("");
                }}
              >
                <i className="fas fa-undo" />
              </button>
            </div>
            {encodedUrlError && (
              <div className="bs-component">
                <div className="alert alert-danger">
                  The url is not a valid encoded url
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </>
  );
}

export default UrlTool;
