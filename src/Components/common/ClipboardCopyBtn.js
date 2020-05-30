import React, { useState } from "react";
import copyToClipBoard from "../../Utils/CopyToClipboard";
import classNames from "classnames/bind";

const ClipBoardCopyBtn = ({ text }) => {
  const [success, setSuccess] = useState(false);
  return (
    <button
      type="button"
      className="btn btn-outline-success"
      title={"Copy to clipboard"}
      onClick={() => {
        copyToClipBoard(text);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 1000);
      }}
    >
      <i
        className={classNames("fas", {
          "fa-copy": !success,
          "fa-clipboard-check": success
        })}
      />
    </button>
  );
};

export default ClipBoardCopyBtn;
