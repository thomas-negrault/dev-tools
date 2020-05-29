import React, { useCallback, useState } from "react";
import { v1 as uuidv1 } from "uuid";
import { v4 as uuidv4 } from "uuid";

import { Metas } from "../Layout/Metas";
import copyToClipBoard from "../../Utils/CopyToClipboard";

const TITLE = "UUID Generator Tool";
const DESCRIPTION =
  "Generate a UUID (Universal Unique Identifier), a unique 128-bit number used for database indexes, in order to avoid guessable id (1,2,3...)";

function UuidTool() {
  const [uuidV1, setUuidV1] = useState(uuidv1());
  const [uuidV4, setUuidV4] = useState(uuidv4());

  const refreshUuid = useCallback(() => {
    setUuidV1(uuidv1());
    setUuidV4(uuidv4());
  }, []);

  return (
    <>
      <Metas title={TITLE} description={DESCRIPTION} />
      <div className="py-4 text-center tool-header">
        <h1>{TITLE}</h1>
        <h2>{DESCRIPTION}</h2>
      </div>
      <div className="action-buttons">
        <button
          type="button"
          className="btn btn-outline-success"
          title={"Generate new uuid"}
          onClick={refreshUuid}
        >
          <i className="fas fa-redo-alt" />
        </button>
      </div>

      <div className="row">
        <table className="table">
          <thead>
            <tr>
              <th>Version</th>
              <th>Value</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>UUID V1</td>
              <td>{uuidV1}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-outline-success"
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
              <td>UUID V4</td>
              <td>{uuidV4}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-outline-success"
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

export default UuidTool;
