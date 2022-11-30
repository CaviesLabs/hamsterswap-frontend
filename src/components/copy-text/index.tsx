import { CopyToClipboard } from "react-copy-to-clipboard";
import React from "react";
import { CopyIcon } from "@/src/components/icons";
import { CopyTextProps } from "@/src/components/copy-text/types";

export default function CopyText(props: CopyTextProps) {
  const { content, children } = props;

  return (
    <div className="flex items-center">
      {children}
      <CopyToClipboard text={content} onCopy={() => {}}>
        <span className="cursor-pointer">
          <CopyIcon className="w-4 ml-2" />
        </span>
      </CopyToClipboard>
    </div>
  );
}
