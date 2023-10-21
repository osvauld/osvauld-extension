import { useState } from "react";
import type { Folder } from "~components/FolderSelect";

type EntryProps = {
  entry: {
    id: string;
    label: string;
    parentId: string | null;
    children: Folder[] | [];
  };
  depth: number;
};

const TreeView = ({ entry, depth }: EntryProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <div className="bg-[#3A4468] mt-0">
      <button onClick={() => setIsExpanded((prev) => !prev)} className="flex">
        {entry.children && (
          <div style={{ paddingLeft: "6px", paddingRight: "6px", width: "20px" }}>
            {isExpanded ? "-" : "+"}
          </div>
        )}
        <span
          className="name text-base font-medium"
          style={{ paddingLeft: entry.children ? "" : "20px" }}
        >
          {entry.label}
        </span>
      </button>
      <div style={{ borderLeft: "2px solid black" }}>
        {isExpanded && (
          <div style={{ paddingLeft: `5px` }}>
            {entry.children?.map((entry) => <TreeView entry={entry} depth={depth + 1} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default TreeView;
