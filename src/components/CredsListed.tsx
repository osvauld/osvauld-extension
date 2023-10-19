import "../style.css";
import { Storage } from "@plasmohq/storage";
import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

type UserName = {
  username: string;
};

type UserNames = Array<UserName>;

const CredsListed = ({ updateCredentialSelected }) => {
  const [usernameList, setUsernameList] = useState<UserNames>();
  const [activeTab, setActiveTab] = useState("");

  const changeCredentialSelected = async (index) => {
    updateCredentialSelected(true);
    await storage.set("usernameIndex", index);
  };

  const storage = new Storage();

  useEffect(() => {
    (async () => {
      let activeUrl = await chrome.tabs.query({ active: true });
      setActiveTab(new URL(activeUrl[0].url).hostname);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const list: UserNames = await storage.get("usernames");
      console.log("reading plasmo store as received in credsListed", list);
      if (list.length > 0) {
        console.log("Elements found", list);
        setUsernameList(list);
      } else {
        console.log("Username list empty");
      }
    })();
  }, []);

  return (
    <div className="home-container">
      <div className="generic-search-container">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.3495 14.3578C14.2562 14.4497 14.1305 14.5013 13.9995 14.5016C13.8667 14.501 13.7392 14.4496 13.6432 14.3578L10.9432 11.6516C9.8061 12.6067 8.34413 13.0859 6.86224 12.9894C5.38034 12.8928 3.99294 12.2278 2.98939 11.1332C1.98584 10.0386 1.44363 8.59876 1.47584 7.11407C1.50806 5.62938 2.1122 4.21444 3.16229 3.16436C4.21237 2.11428 5.6273 1.51013 7.11199 1.47792C8.59668 1.44571 10.0365 1.98792 11.1311 2.99147C12.2258 3.99502 12.8907 5.38242 12.9873 6.86431C13.0839 8.34621 12.6046 9.80818 11.6495 10.9453L14.3495 13.6453C14.3967 13.6918 14.4342 13.7473 14.4599 13.8085C14.4855 13.8696 14.4986 13.9353 14.4986 14.0016C14.4986 14.0679 14.4855 14.1335 14.4599 14.1947C14.4342 14.2558 14.3967 14.3113 14.3495 14.3578ZM7.24949 12.0016C8.18895 12.0016 9.10731 11.723 9.88844 11.201C10.6696 10.6791 11.2784 9.93726 11.6379 9.06931C11.9974 8.20136 12.0915 7.24629 11.9082 6.32488C11.7249 5.40347 11.2725 4.5571 10.6082 3.8928C9.94394 3.22851 9.09757 2.77611 8.17617 2.59283C7.25476 2.40955 6.29969 2.50362 5.43174 2.86313C4.56379 3.22265 3.82194 3.83147 3.30001 4.6126C2.77807 5.39374 2.49949 6.3121 2.49949 7.25156C2.50114 8.51083 3.00212 9.71805 3.89256 10.6085C4.783 11.4989 5.99022 11.9999 7.24949 12.0016Z"
            fill="#828CAE"
          />
        </svg>
        <input
          type="text"
          placeholder="Find Secrets, Folders, Groups and People"
          className="generic-search"
        />
      </div>
      <h2 className="domain-of-interest">{activeTab}</h2>
      {/* <ul className="tags">
        <li className="selected">
          {" "}
          <span>Login</span>
        </li>
        <li>
          {" "}
          <span>SSH</span>{" "}
        </li>
        <li>
          <span>IP</span>
        </li>
      </ul> */}
      <div className="heading">
        <h2>Credentials</h2>
      </div>
      <div className="list-container">
        {usernameList &&
          usernameList.map((user, index) => {
            {
              return (
                <ul className="list-item">
                  <div className="individual-item">
                    <div className="left-section">
                      <Icon icon="ph:key-bold" className="key-icon" />
                      <li key={index}>{user.username}</li>
                    </div>
                    <div
                      className="icon-enter"
                      onClick={() => changeCredentialSelected(index)}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.7071 7.29399C12.0976 7.68448 12.0976 8.31864 11.7071 8.70914L5.70826 14.7071C5.31771 15.0976 4.68346 15.0976 4.29291 14.7071C3.90236 14.3166 3.90236 13.6825 4.29291 13.292L9.58563 8L4.29604 2.70802C3.90549 2.31753 3.90549 1.68336 4.29604 1.29287C4.68658 0.902376 5.32084 0.902377 5.71138 1.29287L11.7102 7.29086L11.7071 7.29399Z"
                          fill="#828CAE"
                        />
                      </svg>
                    </div>
                  </div>
                </ul>
              );
            }
          })}
      </div>
    </div>
  );
};

export default CredsListed;
