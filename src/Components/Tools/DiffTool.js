import React, { useCallback, useEffect, useState } from "react";
import copyToClipBoard from "../../Utils/CopyToClipboard";
import { Metas } from "../Layout/Metas";
import * as Diff from "diff";

const diffs = {
  Chars: "diffChars",
  Words: "diffWords",
  "Words with spaces": "diffWordsWithSpace",
};
const TITLE = "Text Comparison Tool";
const DESCRIPTION =
  "Compare two texts and highlights differences in them with multiple algorithms: " +
  Object.keys(diffs).join(",");

function DiffTool() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [diffType, setDiffType] = useState("Chars");
  const [ignoreCase, setIgnoreCase] = useState(true);
  const [diff, setDiff] = useState([]);

  const onText1Change = useCallback(event => {
    setText1(event.target.value);
  }, []);

  const onText2Change = useCallback(event => {
    setText2(event.target.value);
  }, []);

  const onDiffTypeChange = useCallback(event => {
    setDiffType(event.target.value);
  }, []);

  const onIgnoreCaseChange = useCallback(event => {
    setIgnoreCase(event.target.checked);
  }, []);

  useEffect(() => {
    setDiff(Diff[diffs[diffType]](text1, text2, {ignoreCase}));
  }, [diffType, ignoreCase, text1, text2]);

  return (
    <>
      <Metas title={TITLE} description={DESCRIPTION} keywords={['text differ', 'text compare', 'text comparison', 'string compare', 'string comparison']} />
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
                value={text1}
                placeholder="Text 1"
                onChange={onText1Change}
                autoFocus
              />
            </div>
            <div className="action-buttons">
              <button
                type="button"
                className="btn btn-outline-success"
                title={"Copy to clipboard"}
                onClick={() => {
                  copyToClipBoard(text1);
                }}
              >
                <i className="fas fa-copy" />
              </button>
              <button
                type="button"
                className="btn btn-outline-success"
                title={"Empty the input"}
                onClick={() => {
                  setText1("");
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
                rows="6"
                cols="60"
                value={text2}
                onChange={onText2Change}
                placeholder="Text 2"
              />
            </div>
            <div className="action-buttons">
              <button
                type="button"
                className="btn btn-outline-success"
                title={"Copy to clipboard"}
                onClick={() => {
                  copyToClipBoard(text2);
                }}
              >
                <i className="fas fa-copy" />
              </button>
              <button
                type="button"
                className="btn btn-outline-success"
                title={"Empty the input"}
                onClick={() => {
                  setText2("");
                }}
              >
                <i className="fas fa-undo" />
              </button>
            </div>
          </div>
        </div>
      </form>

      <form>
        <div className='form-group'>
        {Object.keys(diffs)
          .sort()
          .map(label => (
            <div className="form-check form-check-inline custom-control custom-radio" key={label}>
              <input
                onChange={onDiffTypeChange}
                className="custom-control-input"
                type="radio"
                name="inlineRadioOptions"
                id={label}
                value={label}
                checked={label === diffType}
              />
              <label className="custom-control-label" htmlFor={label}>
                {label}
              </label>
            </div>
          ))}
        </div>
        <div className='form-group'>

        <div className="form-check form-check-inline custom-control custom-checkbox">
          <input
            onChange={onIgnoreCaseChange}
            className="custom-control-input"
            type="checkbox"
            name="ignoreCase"
            id={'ignoreCase'}
            value={ignoreCase}
            checked={ignoreCase}
          />
          <label className="custom-control-label" htmlFor={'ignoreCase'}>
            Ignore case
          </label>
        </div>
        </div>
      </form>

      {text1 === text2 && <div className="bs-component">
        <div className="alert alert-success text-center">
         The two strings are equals !
        </div>
      </div>}
      {text1 !== "" && text2 !== "" && (
        <div className="py-4">
          <div className="bs-component dark font-weight-bold diff">
            {diff.map((part, index) => {
              const backgroundColor = part.added
                ? '#00bc8c'
                : part.removed
                ? '#E74C3C'
                : 'initial';

              return part.value.split('\n').map((text, indexText) => {
                return (
                  <span key={`${index}-${indexText}`} style={{ backgroundColor }}>
                    {indexText > 0 && <br />}
                    {text}
                  </span>
                );
              });
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default DiffTool;
