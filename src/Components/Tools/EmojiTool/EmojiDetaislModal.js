import React from "react";
import Modal from "react-modal";
import emojisList from "./emojis";
import copyToClipBoard from "../../../Utils/CopyToClipboard";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    background: "none",
    border: "none",
    transform: "translate(-50%, -50%)"
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.8)"
  }
};

Modal.setAppElement("#root");

function EmojiDetailsModal({ modalIsOpen, closeModal, selectedEmoji }) {
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        {selectedEmoji && (
          <div className="card text-white mb-3 text-center">
            <div className="card-header display-2">
              {emojisList[selectedEmoji].char}
            </div>
            <div className="card-body">
              <h4 className="card-title text-capitalize">
                {selectedEmoji.replace(/_/g, " ")}
              </h4>
              <p className="card-text">
                {emojisList[selectedEmoji].keywords.join(", ")}
              </p>
              <button
                type="button"
                className="btn btn-outline-success"
                title={"Copy to clipboard"}
                onClick={() => {
                  copyToClipBoard(emojisList[selectedEmoji].char);
                }}
              >
                <i className="fas fa-copy" />
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default EmojiDetailsModal;
