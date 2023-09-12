let emailItems = document.querySelectorAll(".email-item");
let emailList = document.querySelector(".email-list");

// Fetch the JSON data from the file
fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    for (let email in data) {
      let emailItem = document.createElement("li");
      emailItem.className = "email-item";
      //console.log("individual data =>", email);
      emailItem.textContent = email;
      emailItem.dataset.email = email;
      // Append the list item element to the email-list element
      emailList.appendChild(emailItem);

      emailItem.addEventListener("click", () => {
        let email = emailItem.getAttribute("data-email");
        console.log("email from iframe script", email);
        window.parent.postMessage(
          { action: "emailSelected", email: email },
          "*"
        );
      });
    }
  })
  .catch((error) => {
    // Handle any errors
    console.error(error);
  });
