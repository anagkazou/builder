import React from "react";
import { EditorUrlView } from "./editor-url-view";
import { QuickPreview } from "./preview";

export const EditorPreview: React.FC = () => {

  return (<div className="flex flex-col px-10 w-full">

      <EditorUrlView />
      <QuickPreview />
    </div>

  );
};
