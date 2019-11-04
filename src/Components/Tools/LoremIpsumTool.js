import React, { useCallback, useEffect, useState } from "react";
import { loremIpsum } from "react-lorem-ipsum";
import { Metas } from "../Layout/Metas";
import copyToClipBoard from "../../Utils/CopyToClipboard";

const TITLE = "Lorem Ipsum";
const DESCRIPTION =
  "Quickly generate a random Lorem Ipsum text with a lot of customization possible";

function LoremIpsumTool() {
  const [loremIpsumText, setLoremIpsumText] = useState([""]);
  const [nbParagraphs, setNbParagraphs] = useState(10);
  const [avgWordsPerSentence, setAvgWordsPerSentence] = useState(8);
  const [avgSentencesPerParagraph, setAvgSentencesPerParagraph] = useState(8);
  const [startWithLoremIpsum, setStartWithLoremIpsum] = useState(true);

  useEffect(() => {
    setLoremIpsumText(loremIpsum({
      p: nbParagraphs,
      avgWordsPerSentence,
      avgSentencesPerParagraph,
      startWithLoremIpsum
    }));
  }, [avgSentencesPerParagraph, avgWordsPerSentence, nbParagraphs, startWithLoremIpsum]);

  const onAvgWordsPerSentenceChange = useCallback(event => {
    setAvgWordsPerSentence(event.target.value);
  }, []);

  const onNbParagraphsChange = useCallback(event => {
    setNbParagraphs(event.target.value);
  }, []);

  const onAvgSentencesPerParagraphChange = useCallback(event => {
    setAvgSentencesPerParagraph(event.target.value);
  }, []);

  const onStartWithLoremIpsumChange = useCallback(event => {
    setStartWithLoremIpsum(event.target.checked);
  }, []);

  return (
    <>
      <Metas title={TITLE} description={DESCRIPTION}/>
      <div className="py-4 text-center tool-header">
        <h1>{TITLE}</h1>
        <h2>{DESCRIPTION}</h2>
      </div>

      <div className="row">
        <div className="col-lg-4 col-md-12 col-sm-12 py-4">
          <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Number of paragraphs
              <input type="number" className="col-4 dark" value={nbParagraphs} onChange={onNbParagraphsChange}/>
            </li>

            <li className="list-group-item d-flex justify-content-between align-items-center">
              Average words per sentence
              <input type="number" value={avgWordsPerSentence}
                     className="col-4 dark"
                     onChange={onAvgWordsPerSentenceChange}/>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Average sentences per paragraph
              <input type="number" value={avgSentencesPerParagraph}
                     className="col-4 dark"
                     onChange={onAvgSentencesPerParagraphChange}/>
            </li>

            <li className="list-group-item d-flex justify-content-between align-items-center">
              Start with "Lorem ipsum"
              <input type="checkbox" value={startWithLoremIpsum}
                     checked={startWithLoremIpsum}
                     onChange={onStartWithLoremIpsumChange}/>
            </li>

          </ul>
          <div>
            <div className="action-buttons text-lg-right text-md-center text-sm-center">
              <button
                type="button"
                className="btn btn-outline-success"
                title={"Copy to clipboard"}
                onClick={() => {
                  copyToClipBoard(
                    loremIpsumText
                  );
                }}
              >
                <i className="fas fa-copy"/>
              </button>
            </div>
          </div>
        </div>

        <div className="dark text-wrap p-3 col-lg-8 col-md-12 col-sm-12 py-4">
          {loremIpsumText.map(text => (
            <p key={text}>
              {text}
            </p>
          ))}        </div>
      </div>

    </>
  );
}

export default LoremIpsumTool;
