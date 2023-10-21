import { useState } from "react";
import TreeView from "./FolderTreeView/TreeView";

export type Folder = {
  id: string;
  label: string;
  parentId: string | null;
  children: Folder[];
};

export type FolderData = {
  data: {
    userId: string;
    folders: Folder[];
  };
};

const data: Folder[] = [
  {
    id: "6523eaf3c8a05829eb0c6ef0",
    label: "Coinome",
    parentId: null,
    children: [
      {
        id: "65255dc1ad5fc20a1bd36000",
        label: "uat",
        parentId: "6523eaf3c8a05829eb0c6ef0",
        children: [],
      },
      {
        id: "65255e88ad5fc20a1bd36001",
        label: "stage",
        parentId: "6523eaf3c8a05829eb0c6ef0",
        children: [
          {
            id: "652a2e5b4d44e269998f372d",
            label: "test folder workflow",
            parentId: "65255e88ad5fc20a1bd36001",
            children: [],
          },
        ],
      },
      {
        id: "65255ecbad5fc20a1bd36002",
        label: "prod",
        parentId: "6523eaf3c8a05829eb0c6ef0",
        children: [
          {
            id: "65255f18ad5fc20a1bd36003",
            label: "db",
            parentId: "65255ecbad5fc20a1bd36002",
            children: [
              {
                id: "6525800aad5fc20a1bd36018",
                label: "readOnly",
                parentId: "65255f18ad5fc20a1bd36003",
                children: [],
              },
            ],
          },
        ],
      },
      {
        id: "65255f8aad5fc20a1bd36004",
        label: "dev",
        parentId: "6523eaf3c8a05829eb0c6ef0",
        children: [],
      },
      {
        id: "65255f8aad5fc20a1bd36005",
        label: "dev",
        parentId: "6523eaf3c8a05829eb0c6ef0",
        children: [],
      },
      {
        id: "65255f8aad5fc20a1bd36006",
        label: "dev",
        parentId: "6523eaf3c8a05829eb0c6ef0",
        children: [],
      },
      {
        id: "65255f8aad5fc20a1bd36007",
        label: "dev",
        parentId: "6523eaf3c8a05829eb0c6ef0",
        children: [],
      },
      {
        id: "65255fc3ad5fc20a1bd36008",
        label: "test",
        parentId: "6523eaf3c8a05829eb0c6ef0",
        children: [],
      },
      {
        id: "65255fdead5fc20a1bd36009",
        label: "test3",
        parentId: "6523eaf3c8a05829eb0c6ef0",
        children: [],
      },
      {
        id: "652e9c0e4d44e269998f3755",
        label: "ms",
        parentId: "6523eaf3c8a05829eb0c6ef0",
        children: [],
      },
    ],
  },
  {
    id: "6523eaf9c8a05829eb0c6ef2",
    label: "ShadowSafe",
    parentId: null,
    children: [
      {
        id: "6525602fad5fc20a1bd3600a",
        label: "uat",
        parentId: "6523eaf9c8a05829eb0c6ef2",
        children: [],
      },
      {
        id: "65256071ad5fc20a1bd3600b",
        label: "stage",
        parentId: "6523eaf9c8a05829eb0c6ef2",
        children: [],
      },
      {
        id: "652560e9ad5fc20a1bd3600c",
        label: "prod",
        parentId: "6523eaf9c8a05829eb0c6ef2",
        children: [
          {
            id: "652a8b5a4d44e269998f3735",
            label: "udemy access",
            parentId: "652560e9ad5fc20a1bd3600c",
            children: [
              {
                id: "652cf4854d44e269998f3745",
                label: "alo",
                parentId: "652a8b5a4d44e269998f3735",
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "6523f98fde368b71d72a7cc5",
    label: "Google",
    parentId: null,
    children: [
      {
        id: "6524ebc8ad5fc20a1bd35ff6",
        label: "bucky",
        parentId: "6523f98fde368b71d72a7cc5",
        children: [],
      },
      {
        id: "652561ccad5fc20a1bd3600d",
        label: "uat",
        parentId: "6523f98fde368b71d72a7cc5",
        children: [],
      },
    ],
  },
  {
    id: "65255bd0ad5fc20a1bd35ff7",
    label: "shadow",
    parentId: null,
    children: [
      {
        id: "65255be1ad5fc20a1bd35ff8",
        label: "uat",
        parentId: "65255bd0ad5fc20a1bd35ff7",
        children: [
          {
            id: "65255d73ad5fc20a1bd35ffe",
            label: "usernames",
            parentId: "65255be1ad5fc20a1bd35ff8",
            children: [],
          },
          {
            id: "65255d86ad5fc20a1bd35fff",
            label: "database",
            parentId: "65255be1ad5fc20a1bd35ff8",
            children: [],
          },
        ],
      },
      {
        id: "65255bfaad5fc20a1bd35ff9",
        label: "stage",
        parentId: "65255bd0ad5fc20a1bd35ff7",
        children: [],
      },
      {
        id: "65255c1ead5fc20a1bd35ffa",
        label: "prod",
        parentId: "65255bd0ad5fc20a1bd35ff7",
        children: [],
      },
      {
        id: "65255c9bad5fc20a1bd35ffb",
        label: "dev",
        parentId: "65255bd0ad5fc20a1bd35ff7",
        children: [],
      },
      {
        id: "65255cf9ad5fc20a1bd35ffc",
        label: "test",
        parentId: "65255bd0ad5fc20a1bd35ff7",
        children: [],
      },
      {
        id: "65255d15ad5fc20a1bd35ffd",
        label: "trunk",
        parentId: "65255bd0ad5fc20a1bd35ff7",
        children: [],
      },
      {
        id: "652c0f114d44e269998f373c",
        label: "unni",
        parentId: "65255bd0ad5fc20a1bd35ff7",
        children: [],
      },
      {
        id: "652c0fa04d44e269998f373d",
        label: "sdsd",
        parentId: "65255bd0ad5fc20a1bd35ff7",
        children: [],
      },
      {
        id: "652c0ff34d44e269998f373e",
        label: "asaasa",
        parentId: "65255bd0ad5fc20a1bd35ff7",
        children: [],
      },
    ],
  },
  {
    id: "652561e4ad5fc20a1bd3600e",
    label: "alaan",
    parentId: null,
    children: [],
  },
  {
    id: "6525c6e69d289b4b692fdc19",
    label: "Battery",
    parentId: null,
    children: [],
  },
  {
    id: "65266ee97817c26b5d594707",
    label: "sebins",
    parentId: null,
    children: [],
  },
  {
    id: "6526811b7817c26b5d594714",
    label: "asnims folder",
    parentId: null,
    children: [],
  },
  {
    id: "652790cb7817c26b5d594715",
    label: "akshash",
    parentId: null,
    children: [
      {
        id: "652790d67817c26b5d594716",
        label: "uat",
        parentId: "652790cb7817c26b5d594715",
        children: [
          {
            id: "652790e67817c26b5d594719",
            label: "usernames",
            parentId: "652790d67817c26b5d594716",
            children: [
              {
                id: "652791207817c26b5d59471c",
                label: "admin",
                parentId: "652790e67817c26b5d594719",
                children: [],
              },
              {
                id: "652791247817c26b5d59471d",
                label: "superadmin",
                parentId: "652790e67817c26b5d594719",
                children: [],
              },
              {
                id: "652791287817c26b5d59471e",
                label: "users",
                parentId: "652790e67817c26b5d594719",
                children: [],
              },
            ],
          },
          {
            id: "652790ea7817c26b5d59471a",
            label: "db",
            parentId: "652790d67817c26b5d594716",
            children: [],
          },
          {
            id: "652790f27817c26b5d59471b",
            label: "monitoring",
            parentId: "652790d67817c26b5d594716",
            children: [],
          },
        ],
      },
      {
        id: "652790d87817c26b5d594717",
        label: "stage",
        parentId: "652790cb7817c26b5d594715",
        children: [],
      },
      {
        id: "652790de7817c26b5d594718",
        label: "prod",
        parentId: "652790cb7817c26b5d594715",
        children: [],
      },
    ],
  },
  {
    id: "6527fb6d7817c26b5d594723",
    label: "bj",
    parentId: null,
    children: [],
  },
  {
    id: "652857857817c26b5d594725",
    label: "Marvel",
    parentId: null,
    children: [
      {
        id: "6528579c7817c26b5d594726",
        label: "Stark towers",
        parentId: "652857857817c26b5d594725",
        children: [
          {
            id: "65285a9f7817c26b5d59472f",
            label: "Suits garage",
            parentId: "6528579c7817c26b5d594726",
            children: [],
          },
        ],
      },
      {
        id: "65285a517817c26b5d59472e",
        label: "S.H.I.E.L.D",
        parentId: "652857857817c26b5d594725",
        children: [],
      },
      {
        id: "6530d2f9a08eaf5f49716f06",
        label: "Miss Potts",
        parentId: "652857857817c26b5d594725",
        children: [],
      },
    ],
  },
  {
    id: "65292af74d44e269998f3725",
    label: "V @",
    parentId: null,
    children: [],
  },
  {
    id: "652a2e714d44e269998f372e",
    label: "test workflow",
    parentId: null,
    children: [],
  },
  {
    id: "652a2e874d44e269998f372f",
    label: "test",
    parentId: null,
    children: [],
  },
  {
    id: "652c0d404d44e269998f3738",
    label: "sdsd",
    parentId: null,
    children: [],
  },
  {
    id: "652c0d404d44e269998f3739",
    label: "sdsd",
    parentId: null,
    children: [],
  },
  {
    id: "652ce6d54d44e269998f3740",
    label: "alfy",
    parentId: null,
    children: [],
  },
  {
    id: "652d16ef4d44e269998f374a",
    label: "twitter",
    parentId: null,
    children: [],
  },
  {
    id: "652ea9fb4d44e269998f3757",
    label: "kevin",
    parentId: null,
    children: [],
  },
  {
    id: "6530d28fa08eaf5f49716f05",
    label: "Battery",
    parentId: null,
    children: [],
  },
];

type FolderSelectProps = {
  updateCreateSuccess: () => void;
};

const FolderSelect = ({ updateCreateSuccess }: FolderSelectProps) => {
  const [selectedFolder, setSelectedFolder] = useState("");

  const handleSelect = (label: string) => {
    setSelectedFolder(label);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div
        className={`text-sm border border-solid border-[#4C598B] rounded-full px-4 py-2 mb-4 ${
          selectedFolder ? "text-white" : "text-[#828CAE]"
        }`}
      >
        {selectedFolder ? selectedFolder : "Select a folder"}
      </div>
      <div
        className="w-full h-full flex flex-col justify-start items-start bg-[#2E3654] border border-solid border-[#4C598B] rounded"
        style={{ overflowY: "auto" }}
      >
        <div className="w-full rounded px-3">
          {data?.map((entry) => <TreeView entry={entry} depth={1} onSelect={handleSelect} />)}
        </div>
      </div>
      <button
        className="bg-[#4E46DC] px-6 py-2 rounded-3xl text-white text-bold hover:bg-[#3A4468] transition ease-in cursor-pointer mt-6 ml-3 mb-3"
        onClick={updateCreateSuccess}
      >
        Save
      </button>
    </div>
  );
};

export default FolderSelect;
