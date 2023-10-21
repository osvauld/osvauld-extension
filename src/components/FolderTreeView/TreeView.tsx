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
  onSelect: (label: string) => void;
};

const CaretDown = () => {
  return (
    <div>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M3.64645 5.65967C3.84171 5.44678 4.15829 5.44678 4.35355 5.65967L7.64645 9.25C7.84171 9.4629 8.15829 9.4629 8.35355 9.25L11.6464 5.65968C11.8417 5.44678 12.1583 5.44678 12.3536 5.65968C12.5488 5.87257 12.5488 6.21775 12.3536 6.43065L9.06066 10.021C8.47487 10.6597 7.52513 10.6597 6.93934 10.021L3.64645 6.43065C3.45118 6.21775 3.45118 5.87257 3.64645 5.65967Z"
          fill="white"
        />
      </svg>
    </div>
  );
};

const CaretUp = () => {
  return (
    <div>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M5.65967 12.3536C5.44678 12.1583 5.44678 11.8417 5.65967 11.6464L9.25 8.35355C9.4629 8.15829 9.4629 7.84171 9.25 7.64645L5.65968 4.35355C5.44678 4.15829 5.44678 3.84171 5.65968 3.64645C5.87257 3.45118 6.21775 3.45118 6.43065 3.64645L10.021 6.93934C10.6597 7.52513 10.6597 8.47487 10.021 9.06066L6.43065 12.3536C6.21775 12.5488 5.87257 12.5488 5.65967 12.3536Z"
          fill="#828CAE"
        />
      </svg>
    </div>
  );
};

const FolderIcon = () => {
  return (
    <div>
      <svg
        width="20"
        height="18"
        viewBox="0 0 20 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_1496_124370)">
          <path
            d="M18 3.75001H10.0603L7.5 1.18969C7.36122 1.0498 7.19601 0.938889 7.01398 0.863407C6.83196 0.787925 6.63674 0.749378 6.43969 0.750008H1.5C1.10218 0.750008 0.720644 0.908043 0.43934 1.18935C0.158035 1.47065 0 1.85218 0 2.25001V15.8081C0.000496116 16.1904 0.152567 16.5568 0.422863 16.8271C0.69316 17.0974 1.05962 17.2495 1.44188 17.25H18.0834C18.459 17.2495 18.819 17.1001 19.0846 16.8346C19.3501 16.569 19.4995 16.209 19.5 15.8334V5.25001C19.5 4.85218 19.342 4.47065 19.0607 4.18935C18.7794 3.90804 18.3978 3.75001 18 3.75001ZM1.5 2.25001H6.43969L7.93969 3.75001H1.5V2.25001ZM18 15.75H1.5V5.25001H18V15.75Z"
            fill="#828CAE"
          />
        </g>
        <defs>
          <clipPath id="clip0_1496_124370">
            <rect width="19.5" height="16.5" fill="white" transform="translate(0 0.75)" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

const TreeView = ({ entry, depth, onSelect }: EntryProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <div>
      <button
        onClick={() => {
          setIsExpanded((prev) => !prev);
          onSelect(entry.label);
        }}
        className="flex mt-2 justify-center items-center"
      >
        {entry.children && (
          <div
            style={{
              paddingRight: "6px",
              width: "20px",
            }}
          >
            {isExpanded ? <CaretDown /> : <CaretUp />}
          </div>
        )}
        <div className="mr-2">
          <FolderIcon />
        </div>
        <span
          className="name text-base font-medium text-white"
          style={{ paddingLeft: entry.children ? "" : "20px" }}
        >
          {entry.label}
        </span>
      </button>
      <div style={{ borderLeft: "1px solid #828CAE", marginLeft: 8 }}>
        {isExpanded && (
          <div style={{ paddingLeft: `5px` }}>
            {entry.children?.map((entry) => (
              <TreeView entry={entry} depth={depth + 1} onSelect={onSelect} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TreeView;
