import {useState, useEffect, useInsertionEffect} from "react";
import { sendToBackground } from "@plasmohq/messaging"
import { Storage } from "@plasmohq/storage"

const EmptyCreds =  () => {
  const storage = new Storage()
   useEffect(() => {
    (async ()=> {
        const activetab = await sendToBackground({
          name: "activeTabUrl",
          body: {
            id: 123
          }
        })

         console.log('active tab retirned =>', activetab.activeTabUrl)

         let hostname = new URL(activetab.activeTabUrl).hostname
         const usernames = await sendToBackground({
          name: "fetchUsernames",
          body: {
            url: hostname
          }
        })
        let associatedUsernames = usernames.data.data.secrets
        console.log('Usernames if any==>', associatedUsernames) //array of objects with key username  
      })()
   },[])


  //  useEffect(()=>{

  //    (async ()=>{
  //       const token = await storage2.get("token");
  //       console.log('getting stored password after login === >', token)
  //     })()  

  //  },[])


  //  async function getToken(){
  //   const token = await storage.get("token");
  //   console.log('getting stored password after login === >', token)
  //  }

    return (
      <div className="w-full h-full flex justify-center items-start">
        <p className="text-base text-white font-light ">
          It seems all empty here! <br/> 
          Create your secret passwords and credentials.
          </p>
      </div>
    )
  }
  
  export default EmptyCreds
  