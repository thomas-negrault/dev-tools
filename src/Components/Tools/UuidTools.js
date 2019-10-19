import React, { useCallback, useState } from "react";
import uuidv1 from "uuid/v1";
import uuidv4 from "uuid/v4";

import { Metas } from "../Layout/Metas";
import copyToClipBoard from "../../Utils/CopyToClipboard";

const TITLE = "UUID";
const DESCRIPTION =
  "Generate a UUID (Universal Unique Identifier), a unique 128-bit number used for database indexes, in order to avoid guessable id (1,2,3...)";

function UuidTools() {
  const [uuidV1, setUuidV1] = useState(uuidv1());
  const [uuidV4, setUuidV4] = useState(uuidv4());

  const refreshUuid = useCallback(() => {
    setUuidV1(uuidv1());
    setUuidV4(uuidv4());
  }, []);

  return (
    <>
      <Metas title={TITLE} description={DESCRIPTION} />
      <div className="header">
        <h1>{TITLE}</h1>
        <h2>{DESCRIPTION}</h2>
      </div>
      <div className="content">
        <p>
          <button
            className="pure-button"
            title={"Generate new uuid"}
            onClick={refreshUuid}
          >
            <i className="fas fa-redo-alt" />
          </button>
        </p>
        <table className="pure-table pure-table-horizontal">
          <thead>
            <tr>
              <th>Version</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>UUID V1</td>
              <td>
                {uuidV1}{" "}
                <button
                  className="pure-button"
                  title={"Copy to clipboard"}
                  onClick={() => {
                    copyToClipBoard(uuidV1);
                  }}
                >
                  <i className="fas fa-copy" />
                </button>
              </td>
            </tr>
            <tr>
              <td>UUID v4</td>
              <td>
                {uuidV4}{" "}
                <button
                  className="pure-button"
                  title={"Copy to clipboard"}
                  onClick={() => {
                    copyToClipBoard(uuidV4);
                  }}
                >
                  <i className="fas fa-copy" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default UuidTools;
