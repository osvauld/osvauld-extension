import type { PlasmoCSConfig } from "plasmo";
import React, { useState, useEffect, useRef } from "react";
import { useMessage } from "@plasmohq/messaging/hook";

export const config: PlasmoCSConfig = {
  all_frames: false,
};

const QueryTextAnywhere = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { data } = useMessage(async (req, res) => {
    // res.send(document.querySelector(req.body).textContent);
  });

  useEffect(() => {
    if (data) {
      setUsername(data[0]);
      setPassword(data[1]);
    }
  }, [data]);

  useEffect(() => {
    if (username) {
      let usernameElem = document.evaluate(
        "(//form//input[   @type='email' or contains(@name, 'username')   or contains(@id, 'email')   or contains(@id, 'username')   or contains(@placeholder, 'Email')   or contains(@placeholder, 'Username')   or contains(ancestor::label, 'Email')   or contains(ancestor::label, 'Username')   or contains(@class, 'email')   or contains(@class, 'username')   or @aria-label='Email'   or @aria-label='Username'   or @aria-labelledby='Email'   or @aria-labelledby='Username' ] | //input[@type='text'])[1]",
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue;
      usernameElem.value = username;
    }

    if (password) {
      let passwordElem = document.evaluate(
        "(//form//input[ @type='password'or contains(@name, 'password')or contains(@id, 'password')or contains(@placeholder, 'Password')or contains(ancestor::label, 'Password')or contains(@class, 'password')or @aria-label='Password'or @aria-labelledby='Password'] | //input[@type='password'])[1]",
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue;

      passwordElem.value = password;
    }
  }, [username, password]);

  return (
    <div
    // style={{
    //   padding: 8,
    //   background: "green",
    //   color: "blue",
    // }}
    >
      {/* Username : {username}, password: {password} */}
    </div>
  );
};

export default QueryTextAnywhere;
