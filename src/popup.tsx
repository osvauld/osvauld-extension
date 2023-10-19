import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Storage } from "@plasmohq/storage";

import EmptyCreds from "./components/EmptyCreds";
import CredView from "./components/CredView";
import LoginView from "./components/LoginView";
import CredsListed from "./components/CredsListed";
import AddSecret from "./components/AddSecret";

import "./style.css";
import { sendToBackground, type PlasmoMessaging } from "@plasmohq/messaging";

function IndexPopup() {
  let usernameList;
  const storage = new Storage();
  let [loginStatus, setLoginStatus] = useState(false);
  let [credentialList, setCredentialList] = useState(false);
  let [credentialSelected, setCredentialSelected] = useState(false);
  let [addingSecret, setAddingSecret] = useState(false);

  const updateCredentialSelected = (newValue) => {
    setCredentialSelected(newValue);
  };

  const chageToList = (newValue) => {
    setCredentialSelected(newValue);
  };

  const loginAction = (newValue) => {
    setLoginStatus(newValue);
  };

  const closeAction = async () => {
    await storage.set("token", null);
    await storage.set("loginStatus", null);
    setLoginStatus(false);
    await storage.remove("usernames");
    setCredentialList(false);
    setCredentialSelected(false);
    setAddingSecret(false);
    console.log("removing token from storage");
  };

  const callAddingSecret = () => {
    setAddingSecret(true);
    console.log("Secret is added");
  };

  useEffect(() => {
    (async () => {
      let loggedin: boolean = await storage.get("loginStatus");
      if (loggedin) {
        setLoginStatus(loggedin);
      }
    })();
  }, []);

  const getUserNames = async () => {
    usernameList = await storage.get("usernames");
    if (usernameList.length > 0) {
      setCredentialList(true);
    }
  };

  const fetchUsername = async () => {
    let hostname = "google";
    const usernames = await sendToBackground({
      name: "fetchUsernames",
      body: {
        url: hostname,
      },
    });
    await storage.set("usernames", usernames.data.data.secrets);

    await getUserNames();
  };

  useEffect(() => {
    (async () => {
      await sendToBackground({
        name: "fetchUrlTargets",
      });
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (loginStatus) await fetchUsername();
    })();
  }, [loginStatus]);

  const BodyView = ({
    loginStatus,
    credentialList,
    credentialSelected,
    chageToList,
    updateCredentialSelected,
    loginAction,
  }) => {
    if (!loginStatus) {
      return <LoginView loginAction={loginAction} />;
    }
    if (!credentialList) {
      if (addingSecret) {
        return <AddSecret />;
      }
      return <EmptyCreds />;
    }
    if (addingSecret) {
      return <AddSecret />;
    }
    if (credentialSelected) {
      return <CredView chageToList={chageToList} />;
    }
    return <CredsListed updateCredentialSelected={updateCredentialSelected} />;
  };

  return (
    <div className="w-400 h-380 flex flex-col justify-around items-center bg-[#262C44]">
      <div className="name-with-icon w-11/12 flex self-center">
        <div className="osvauld-logo">
          <svg
            width="36"
            height="36"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M35.8089 7.22425C36.5742 6.36527 37.648 6.89923 37.8462 8.03245C37.8953 8.31302 37.9478 8.61635 38.0029 8.93897C35.5393 11.6875 34.4255 13.7838 32.5443 17.3246L32.4081 17.5808C35.3885 13.5321 37.0634 11.4262 38.3446 10.9936C38.8115 13.8821 39.3345 17.4823 39.5561 20.314C39.7048 22.2145 39.8732 24.5654 40.026 26.7692C40.1408 28.4229 39.6927 29.4215 38.8366 29.8514C38.4001 31.2579 37.7837 32.6047 36.9951 33.8528C34.7666 37.3801 31.3304 39.8545 27.386 40.7723C26.6913 40.9339 25.99 41.0452 25.2868 41.1068C24.8363 40.0444 24.3329 38.7427 23.744 37.1813L23.803 37.4498C24.1117 38.8558 24.3726 40.0445 24.6611 41.1485C21.5766 41.2897 18.4809 40.4826 15.7629 38.7932C12.2406 36.604 9.61712 33.0979 8.42635 28.9884C16.2095 30.2306 20.5493 30.2955 28.2561 29.4795C32.4005 29.0406 34.7245 27.8083 36.3651 26.1366C37.3555 22.8046 37.7162 19.3069 36.6281 19.1462C36.4341 19.1176 36.1418 19.1531 35.7829 19.2293C33.965 20.2631 32.4594 21.0551 31.0626 21.6953C32.1468 21.873 32.9837 22.4019 33.2908 23.2233C33.8681 24.7675 32.3541 26.7602 29.9092 27.6743C27.4642 28.5884 25.0142 28.0776 24.4369 26.5334C24.1079 25.6533 24.4583 24.6273 25.2732 23.7385C25.2203 23.7524 25.1671 23.7662 25.1138 23.78C22.2587 24.1528 19.94 24.3954 17.7229 24.5202C18.9435 25.8737 19.3706 27.478 18.6551 28.5277C17.7266 29.8899 15.2254 29.8023 13.0686 28.3322C11.5176 27.2749 10.5671 25.7906 10.5008 24.5336C9.69979 24.4977 8.86165 24.4508 7.97189 24.3935C7.78727 20.3485 9.1509 16.3853 11.7853 13.3102C14.4196 10.2352 18.1267 8.27959 22.1521 7.84134C26.1019 7.41131 30.0669 8.474 33.27 10.8156C34.1279 9.40355 35.0086 8.12258 35.8089 7.22425ZM26.9915 26.1915C27.634 25.9486 27.958 25.2308 27.715 24.5883C27.4721 23.9458 26.7543 23.6219 26.1118 23.8648C25.4693 24.1077 25.1454 24.8255 25.3883 25.468C25.6313 26.1105 26.349 26.4345 26.9915 26.1915ZM13.3114 27.1115C13.9375 27.394 14.6741 27.1155 14.9566 26.4894C15.2392 25.8633 14.9607 25.1267 14.3346 24.8442C13.7085 24.5616 12.9719 24.8402 12.6893 25.4662C12.4068 26.0923 12.6853 26.8289 13.3114 27.1115Z"
              fill="#E4E6ED"
            />
          </svg>
        </div>
        <h2 className="text-white font-normal text-lg pl-2 mt-1 cursor-pointer">
          shadow
          <span className="font-medium" onClick={closeAction}>
            safe
          </span>
        </h2>
        {loginStatus ? (
          <span
            className="primary-addsecret ml-44 hover:bg-[#3A4468]"
            onClick={callAddingSecret}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.07692 2.07692C9.07692 1.48125 8.59567 1 8 1C7.40433 1 6.92308 1.48125 6.92308 2.07692V6.92308H2.07692C1.48125 6.92308 1 7.40433 1 8C1 8.59567 1.48125 9.07692 2.07692 9.07692H6.92308V13.9231C6.92308 14.5188 7.40433 15 8 15C8.59567 15 9.07692 14.5188 9.07692 13.9231V9.07692H13.9231C14.5188 9.07692 15 8.59567 15 8C15 7.40433 14.5188 6.92308 13.9231 6.92308H9.07692V2.07692Z"
                fill="white"
              />
            </svg>
          </span>
        ) : (
          <div className="close-icon ml-40">
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.6449 14.0494C24.1134 13.5808 24.1134 12.8199 23.6449 12.3514C23.1763 11.8829 22.4154 11.8829 21.9469 12.3514L18 16.302L14.0494 12.3551C13.5808 11.8866 12.8199 11.8866 12.3514 12.3551C11.8829 12.8237 11.8829 13.5846 12.3514 14.0531L16.302 18L12.3551 21.9506C11.8866 22.4192 11.8866 23.1801 12.3551 23.6486C12.8237 24.1171 13.5846 24.1171 14.0531 23.6486L18 19.698L21.9506 23.6449C22.4192 24.1134 23.1801 24.1134 23.6486 23.6449C24.1171 23.1763 24.1171 22.4154 23.6486 21.9469L19.698 18L23.6449 14.0494Z"
                fill="#828CAE"
              />
            </svg>
          </div>
        )}
      </div>
      <div className="body w-11/12 h-5/6">
        <BodyView
          loginStatus={loginStatus}
          credentialList={credentialList}
          credentialSelected={credentialSelected}
          chageToList={chageToList}
          updateCredentialSelected={updateCredentialSelected}
          loginAction={loginAction}
        />
      </div>
    </div>
  );
}

export default IndexPopup;
