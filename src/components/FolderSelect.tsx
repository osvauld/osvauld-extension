import { useState, useEffect } from "react";
import TreeView from "./FolderTreeView/TreeView";
import { sendToBackground, type PlasmoMessaging } from "@plasmohq/messaging";
import { Storage } from "@plasmohq/storage";
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

type FolderSelectProps = {
  updateCreateSuccess: () => void;
};

const FolderSelect = ({ updateCreateSuccess }: FolderSelectProps) => {
  const [selectedFolder, setSelectedFolder] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await sendToBackground({
        name: "getFolderStructure",
      });
      setData(data.data.folders);
      // setSecret(secret.data.data.password);
      // setSelectedUsername(list[selectedIndex].username);
      // await storage.set("liveCred", true);
    })();
  }, []);

  const handleSelect = (label: string) => {
    setSelectedFolder(label);
  };

  const addSecret = async () => {
    console.log("Secret selected and save clicked");
    const storage = new Storage();
    let folderId = await storage.get("focusedFolder");
    const { data } = await sendToBackground({
      name: "postSecret",
      body: {
        id: folderId,
      },
    });
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
          {data?.map((entry) => (
            <TreeView entry={entry} depth={1} onSelect={handleSelect} />
          ))}
        </div>
      </div>
      <button
        className="bg-[#4E46DC] px-6 py-2 rounded-3xl text-white text-bold hover:bg-[#3A4468] transition ease-in cursor-pointer mt-6 ml-3 mb-3"
        onClick={() => {
          updateCreateSuccess();
          addSecret();
        }}
      >
        Save
      </button>
    </div>
  );
};

export default FolderSelect;
