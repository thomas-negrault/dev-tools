import Base64Tools from "../Components/Tools/Base64Tool";
import React from "react";
import UrlTool from "../Components/Tools/UrlTool";
import WordCountTool from "../Components/Tools/WordCountTool";
import JsonPrettierTool from "../Components/Tools/JsonPrettierTool";
import TimestampTool from "../Components/Tools/TimestampTool";
import UuidTool from "../Components/Tools/UuidTool";
import HashTool from "../Components/Tools/HashTool";
import LoremIpsumTool from "../Components/Tools/LoremIpsumTool";
import HtmlTool from "../Components/Tools/HtmlTool";
import TextEffectsTool from "../Components/Tools/TextEffectsTool";
import DiffTool from "../Components/Tools/DiffTool";
import EmojiTool from "../Components/Tools/EmojiTool/EmojiTool";

const links = [
  {
    path: "/base64-decode-encode",
    label: "Base64 Encoder/Decoder",
    component: <Base64Tools/>
  },
  {
    path: "/url-decode-encode",
    label: "Url Encoder/Decoder",
    component: <UrlTool/>
  },
  {
    path: "/text-statistics",
    label: "Text Statistics",
    component: <WordCountTool/>
  },
  {
    path: "/json-prettier",
    label: "Json Prettier",
    component: <JsonPrettierTool/>
  },
  // {
  //   path: "/timestamp",
  //   label: "Timestamp",
  //   component: <TimestampTool />
  // },
  {
    path: "/uuid",
    label: "UUID Generator",
    component: <UuidTool/>
  }, {
    path: "/text-hash-generator",
    label: "Text Hash Generator",
    component: <HashTool/>
  }
  , {
    path: "/lorem-ipsum-generator",
    label: "Lorem Ipsum Generator",
    component: <LoremIpsumTool/>
  }, {
    path: "/html-encoder-decoder",
    label: "HTML Entities Encoder/Decoder",
    component: <HtmlTool/>
  }, {
    path: "/text-effects",
    label: "Text Effects tool",
    component: <TextEffectsTool/>
  }, {
    path: "/text-diff",
    label: "Text Diff Tool",
    component: <DiffTool/>
  }, {
    path: "/emoji-picker",
    label: "Emoji Picker Tool",
    component: <EmojiTool/>
  }
];

export default function getLinksConfig() {
  links.sort((a, b) => (a.label > b.label ? 1 : -1));
  return links;
}
