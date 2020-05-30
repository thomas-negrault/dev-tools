import React, { useEffect, useRef, useState } from "react";
import { Metas } from "../Layout/Metas";
import copyToClipBoard from "../../Utils/CopyToClipboard";
import { NavLink, useParams, useRouteMatch } from "react-router-dom";
import { effects } from "./TextEffectsTool";
import ClipBoardCopyBtn from "../common/ClipboardCopyBtn";
const BASE_PATH = "/number-base-converter";

const SHORTCUTS = {
  binary: 2,
  decimal: 10,
  hexadecimal: 16,
  octal: 8
};
const MIN_BASE = 2;
const MAX_BASE = 36;

const getInBoundsValue = value => {
  if (value < MIN_BASE) {
    return MIN_BASE;
  }
  if (value > MAX_BASE) {
    return MAX_BASE;
  }
  return value;
};

const TITLE = "Number base conversion";
const DESCRIPTION =
  "Convert a number from any base representation to another base representation. Decimal, binary,octal, hexadecimal etc";

function BaseTool() {
  const routeMatch = useRouteMatch(`${BASE_PATH}/:from-to-:to`);

  useEffect(() => {
    if (routeMatch) {
      setShortcut(true);
      const { from, to } = routeMatch.params;
      setOriginalBase(SHORTCUTS[from]);
      setConvertedBase(SHORTCUTS[to]);
      setTitle(
        `${effects.Capitalize(from)} to ${effects.Capitalize(to)} converter`
      );
      setDescription(
        `Convert a number in ${from} (base ${SHORTCUTS[from]}) to ${to} (base ${SHORTCUTS[to]})`
      );
    } else {
      setShortcut(false);
      setTitle(TITLE);
      setDescription(DESCRIPTION);
    }
  }, [routeMatch]);

  const [title, setTitle] = useState(TITLE);
  const [isShortcut, setShortcut] = useState(false);
  const [description, setDescription] = useState(DESCRIPTION);
  const [originalInt, setOriginalInt] = useState("10");
  const [originalBase, setOriginalBase] = useState(10);
  const [convertedBase, setConvertedBase] = useState(16);
  const [convertedInt, setConvertedInt] = useState(
    parseInt(originalInt).toString()
  );
  const resultRef = useRef(null);

  useEffect(() => {
    const fromInt = parseInt(originalInt, originalBase);
    setConvertedInt(fromInt.toString(convertedBase));
  }, [convertedBase, originalBase, originalInt]);

  return (
    <>
      <Metas title={title} description={description} keywords={[[]]} />
      <div className="py-4 text-center tool-header">
        <h1>{title}</h1>
        <h2>{description}</h2>
      </div>
      <div className={"row"}>
        Convert number
        <input
          id="fromNumber"
          type="text"
          value={originalInt}
          className="dark mx-2"
          onChange={event => {
            setOriginalInt(event.target.value);
          }}
        />
        currently in base
        <input
          id="fromBase"
          type="number"
          value={originalBase}
          min={MIN_BASE}
          max={MAX_BASE}
          disabled={isShortcut}
          className="dark mx-2"
          onChange={event => {
            const newValue = parseInt(event.target.value);
            setOriginalBase(getInBoundsValue(newValue));
          }}
        />
        to base
        <input
          id="toBase"
          type="number"
          value={convertedBase}
          min={MIN_BASE}
          max={MAX_BASE}
          disabled={isShortcut}
          className="dark mx-2"
          onChange={event => {
            const newValue = parseInt(event.target.value);
            setConvertedBase(getInBoundsValue(newValue));
          }}
        />
        :
        <input
          ref={resultRef}
          onClick={() => {
            resultRef.current.focus();
            resultRef.current.setSelectionRange(0, convertedInt.length);
          }}
          id={"toNumber"}
          type="text"
          value={convertedInt.toUpperCase()}
          className="dark mx-2"
          readOnly
        />
        <ClipBoardCopyBtn text={convertedInt.toUpperCase()} />
      </div>
      <h4 className="mt-3">Shortcuts:</h4>
      <div className="row">
        <div
          className="p-1 col-lg-2 col-md-3 col-sm-6 col-6 text-center align-middle"
          key="custom"
        >
          <NavLink
            className="btn btn-outline-success h-100 d-flex justify-content-center align-items-center"
            to={BASE_PATH}
            activeClassName={isShortcut ? null : "active"}
          >
            Custom
          </NavLink>
        </div>

        {Object.keys(SHORTCUTS).map(from => {
          return Object.keys(SHORTCUTS).map(to => {
            if (from === to) {
              return null;
            }
            return (
              <div
                className="p-1 col-lg-2 col-md-3 col-sm-6 col-6 text-center align-middle"
                key={`${from} to ${to}`}
              >
                <NavLink
                  className="btn btn-outline-success h-100 d-flex justify-content-center align-items-center"
                  to={`${BASE_PATH}/${from}-to-${to}`}
                >
                  {`${effects.Capitalize(from)} to ${effects.Capitalize(to)}`}
                </NavLink>
              </div>
            );
          });
        })}
      </div>
    </>
  );
}

export default BaseTool;
