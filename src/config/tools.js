import Base64Tools from "../Components/Tools/Base64Tool";
import React from "react";
import UrlTool from "../Components/Tools/UrlTool";
import WordCountTool from "../Components/Tools/WordCountTool";
import JsonPrettierTool from "../Components/Tools/JsonPrettierTool";
import TimestampTool from "../Components/Tools/TimestampTool";
import UuidTools from "../Components/Tools/UuidTools";

const links = [
  {
    path: "/base64-decode",
    label: "Base64 Decode",
    component: <Base64Tools />
  },
  {
    path: "/base64-encode",
    label: "Base64 Encode",
    component: <Base64Tools />
  },
  { path: "/url-encode", label: "Url Encode", component: <UrlTool /> },
  { path: "/url-decode", label: "Url Decode", component: <UrlTool /> },
  { path: "/word-count", label: "Word Count", component: <WordCountTool /> },
  {
    path: "/characters-count",
    label: "Characters Count",
    component: <WordCountTool />
  },
  {
    path: "/json-prettier",
    label: "Json Prettier",
    component: <JsonPrettierTool />
  },
  {
    path: "/timestamp",
    label: "Timestamp",
    component: <TimestampTool />
  },
  {
    path: "/uuid",
    label: "Uuid",
    component: <UuidTools />
  }
];

export default function getLinksConfig() {
  links.sort((a, b) => (a.label > b.label ? 1 : -1));
  return links;
}
