import React, { useCallback, useState } from "react";
import Hashes from "jshashes";

import { Metas } from "../Layout/Metas";
import copyToClipBoard from "../../Utils/CopyToClipboard";

const TITLE = "String hash generator tool";
const hashAlgorithms = {
  'SHA-1': {link: 'https://en.wikipedia.org/wiki/SHA-1' , hashFunction:(plainText) => (new Hashes.SHA1()).hex(plainText)},
  'MD5': {link: 'https://en.wikipedia.org/wiki/MD5' , hashFunction:(plainText) => (new Hashes.MD5()).hex(plainText)},
  'SHA-256':  {link: 'https://en.wikipedia.org/wiki/SHA-2' , hashFunction:(plainText) => (new Hashes.SHA256()).hex(plainText)},
  'SHA512':  {link: 'https://en.wikipedia.org/wiki/SHA-2' , hashFunction:(plainText) => (new Hashes.SHA512()).hex(plainText)},
  'RMD160 (RIPEMD-160)':  {link: 'https://en.wikipedia.org/wiki/RIPEMD' , hashFunction:(plainText) => (new Hashes.RMD160()).hex(plainText)},
  'CRC32':  {link: 'https://en.wikipedia.org/wiki/Cyclic_redundancy_check' , hashFunction:(plainText) => (Hashes.CRC32(plainText))},
};
const DESCRIPTION =
  "Generate the hash of a text string using various algorithms: " + Object.keys(hashAlgorithms).join(',');

function HashTool() {
  const [plainText, setPlainText] = useState('');
  const [hashes, setHashes] = useState({});

  const onPlainTextChange = useCallback(event => {
    setPlainText(event.target.value);
  const newHashes = {};
    Object.keys(hashAlgorithms).forEach((hashName) => {
      newHashes[hashName] = hashAlgorithms[hashName].hashFunction(event.target.value);
    });
    setHashes(newHashes);
  }, []);

  return (
    <>
      <Metas title={TITLE} description={DESCRIPTION} />
      <div className="py-4 text-center tool-header">
        <h1>{TITLE}</h1>
        <h2>{DESCRIPTION}</h2>
      </div>
      <div className="row">
         <textarea
           className="dark"
           rows="6"
           cols="60"
           value={plainText}
           onChange={onPlainTextChange}
           placeholder="Plain text string to hash"
         />
      </div>
      <div className="row py-4">
        <table className="table" id="hashTable">
          <thead>
          <tr>
            <th>Algorithm</th>
            <th>Hash</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          {Object.keys(hashAlgorithms).map((hashName) =>
            <tr key={hashName}>
              <td>
                <a rel="noopener noreferrer" href={hashAlgorithms[hashName].link} target="_blank">{hashName}</a></td>
              <td>{hashes[hashName] ? hashes[hashName]: '-'}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-outline-success"
                  title={"Copy to clipboard"}
                  onClick={() => {
                    copyToClipBoard(hashes[hashName]);
                  }}
                >
                  <i className="fas fa-copy"/>
                </button>
              </td>
            </tr>)
          }
          </tbody>
        </table>
      </div>
    </>
  );
}

export default HashTool;
