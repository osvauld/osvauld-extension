import "../style.css";
import { SecureStorage } from "@plasmohq/storage/secure";
import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

const AddSecret = (props) => {
  const [activeTab, setActiveTab] = useState("");
  const [saver, setSaver] = useState(false);
  const [data, setData] = useState([]);
  const [urlInput, setUrlInput] = useState("");

  const listUpdater = () => {
    props.backdown(false);
  };

  const handleChange = (e) => {
    const { name, value, checked = false, type } = e.target;
    const index = data.findIndex((obj) => obj.fieldKey === name);
    if (index === -1) {
      setData([
        ...data,
        {
          fieldKey: name,
          fieldValue: value,
          sensitive: name === "description" ? false : checked,
        },
      ]);
    } else {
      const updatedData = [...data];

      if (type !== "checkbox") {
        updatedData[index].fieldValue = value;
      }
      if (type !== "text") {
        updatedData[index].sensitive = checked;
      }
      setData(updatedData);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //  setActiveTab(urlInput);

    const storage = new SecureStorage();

    await storage.setPassword("crypticPassword");

    await storage.set("clientTrust", data);
    //await storage.set("newSecret", data);
    // set data to secure storage and try to read it
  };

  const callNextPage = async () => {
    props.nextPage(true);
    setSaver(true);
  };

  useEffect(() => {
    setData([
      {
        fieldKey: "URL",
        fieldValue: activeTab,
        sensitive: false,
      },
    ]);
  }, [activeTab]);

  useEffect(() => {
    (async () => {
      let activeUrl = await chrome.tabs.query({ active: true });
      setActiveTab(new URL(activeUrl[0].url).hostname);
      setUrlInput(new URL(activeUrl[0].url).hostname);
    })();
  }, []);

  const changingUrl = (e) => {
    e.preventDefault();
    const { value } = e.target;
    const index = data.findIndex((obj) => obj.fieldKey === "URL");
    data[index].fieldValue = value;
    setUrlInput(value);
  };

  return (
    <div className="h-full w-full bg-[#2E3654] rounded-md p-3 pb-1 box-border">
      <div className="back-section !mt-0 !ml-1 !mb-3 " onClick={listUpdater}>
        <Icon icon="ion:arrow-back-outline" className="text-[#828CAE]" />
      </div>
      <div className="h-auto">
        <div className="h-1/6">
          <label className=" h-4/12 text-[#828CAE] ml-4">URL</label>
          <input
            type="text"
            className="w-full bg-[#2E3654] text-base pl-4 py-1 text-white border border-[#4C598B] rounded-3xl focus:outline-none"
            value={urlInput}
            onChange={changingUrl}
          />
        </div>
        <div className="h-1/6 mt-2">
          <label className="text-[#828CAE] h-4/12 ml-4">Username</label>
          <div className="w-full h-ful">
            <input
              type="text"
              className="w-10/12 h-full  bg-[#2E3654] text-base pl-4 py-2 text-white border border-[#4C598B] rounded-3xl focus:outline-none"
              placeholder="Enter value"
              name="Username"
              value={
                data.find((obj) => obj.fieldKey === "Username")?.fieldValue ||
                ""
              }
              onChange={handleChange}
            />
            <label className="relative inline-flex items-center cursor-pointer ml-2 mt-2">
              <input
                type="checkbox"
                className="sr-only peer "
                name="Username"
                value=""
                checked={
                  data.find((obj) => obj.fieldKey === "Username")?.sensitive ||
                  false
                }
                onChange={handleChange}
              />
              <div className="w-9 h-5 bg-[#4C598B] peer-focus:outline-none dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-[#837EE6]"></div>
            </label>
          </div>
        </div>
        <div className="h-1/6 mt-3">
          <label className="text-[#828CAE] h-1/3 ml-4">Password</label>
          <div className="w-full h-4/12">
            <input
              type="text"
              className="w-10/12 h-full bg-[#2E3654] text-base pl-4 py-2 text-white border border-[#4C598B] rounded-3xl focus:outline-none"
              placeholder="Enter value"
              name="Password"
              value={
                data.find((obj) => obj.fieldKey === "Password")?.fieldValue ||
                ""
              }
              onChange={handleChange}
            />
            <label className="relative inline-flex items-center cursor-pointer ml-2 ">
              <input
                type="checkbox"
                className="sr-only peer"
                name="Password"
                value=""
                checked={
                  data.find((obj) => obj.fieldKey === "Password")?.sensitive ||
                  false
                }
                onChange={handleChange}
              />
              <div className="w-9 h-5 bg-[#4C598B] peer-focus:outline-none dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-[#837EE6]"></div>
            </label>
          </div>
        </div>
        <div className="h-[90px] mt-6 mb-1">
          {/* <div className=" h-4/12 flex justify-center items-center bg-[#3A4468] border border-dashed rounded-lg border-[#4C598B] mb-2">
                        <button className="">
                            <Icon icon="ic:round-add" className="text-[#828CAE] text-xl" /> 
                        </button>
                    </div> */}
          <div className="h-full">
            <textarea
              className="h-full w-full bg-[#2E3654] text-sm pl-2 pt-2 placeholder-[#828CAE] text-white border border-[#4C598B] rounded focus:outline-none"
              placeholder="Enter description about the secret"
              name="description"
              value={
                data.find((obj) => obj.fieldKey === "description")
                  ?.fieldValue || ""
              }
              onChange={handleChange}
            />
          </div>
        </div>

        <div className=" h-auto mt-4 flex justify-end text-white text-sm font-medium ">
          <button
            className="bg-[#4E46DC] px-4 py-2 rounded-3xl  hover:bg-[#3A4468] transition ease-in cursor-pointer"
            onClick={(e) => {
              handleSubmit(e);
              callNextPage();
            }}
          >
            Save & Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSecret;
