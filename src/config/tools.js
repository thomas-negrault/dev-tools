import Base64Tools from "../Components/Tools/Base64Tool";
import React from "react";
import UrlTool from "../Components/Tools/UrlTool";
import WordCountTool from "../Components/Tools/WordCountTool";
import JsonPrettierTool from "../Components/Tools/JsonPrettierTool";
import TimestampTool from "../Components/Tools/TimestampTool";
import UuidTool from "../Components/Tools/UuidTool";
import HashTool from "../Components/Tools/HashTool";

const links = [
  {
    path: "/base64-decode-encode",
    label: "Base64 Decode",
    component: <Base64Tools />
  },
  {
    path: "/base64-decode-encode",
    label: "Base64 Encode",
    component: <Base64Tools />
  },
  { path: "/url-decode-encode", label: "Url Encode", component: <UrlTool /> },
  { path: "/url-decode-encode", label: "Url Decode", component: <UrlTool /> },
  {
    path: "/text-statistics",
    label: "Word Count",
    component: <WordCountTool />
  },
  {
    path: "/text-statistics",
    label: "Characters Count",
    component: <WordCountTool />
  },
  {
    path: "/json-prettier",
    label: "Json Prettier",
    component: <JsonPrettierTool />
  },
  // {
  //   path: "/timestamp",
  //   label: "Timestamp",
  //   component: <TimestampTool />
  // },
  {
    path: "/uuid",
    label: "Uuid Generator",
    component: <UuidTool />
  },{
    path: "/text-hash-generator",
    label: "Text Hash Generator Tool",
    component: <HashTool />
  }
];

export default function getLinksConfig() {
  links.sort((a, b) => (a.label > b.label ? 1 : -1));
  return links;
}
