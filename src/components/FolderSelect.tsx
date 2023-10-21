import Entry from "./FolderTreeView/TreeView";

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
];

const FolderSelect = () => {
  return (
    <div className="w-full h-full flex flex-col justify-start items-start">
      <div className="w-full">{data?.map((entry) => <Entry entry={entry} depth={1} />)}</div>
    </div>
  );
};

export default FolderSelect;
