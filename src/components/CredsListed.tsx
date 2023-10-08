import "../style.css";
import { Storage } from "@plasmohq/storage";
import React, { useState, useEffect } from "react";

type UserName = {
  username: string;
};

type UserNames = Array<UserName>;

const CredsListed = ({ updateCredentialSelected }) => {


  const [usernameList, setUsernameList] = useState<UserNames>();


  const changeCredentialSelected = async (index) => {
    updateCredentialSelected(true);
    await storage.set('usernameIndex',index )
  };

  const storage = new Storage();

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
      <div className="heading">
        <h2>Secrets</h2>
      </div>
      {usernameList &&
        usernameList.map((user, index) => {
          {
            return (
              <div className="list-item">
                <p key={index}>{user.username}</p>
                <div className="icon-enter" onClick={()=>changeCredentialSelected(index)}>
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
            );
          }
        })}
    </div>
  );
};

export default CredsListed;
