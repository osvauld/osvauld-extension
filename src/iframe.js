// Select all the email items
let emailItems = document.querySelectorAll(".email-item");

// Loop through each email item
for (let emailItem of emailItems) {
  // Add a click event listener to each email item
  emailItem.addEventListener("click", () => {
    // Get the data-email attribute of the clicked email item
    let email = emailItem.getAttribute("data-email");
    // Send a message to the parent window with the email value
    window.parent.postMessage({ action: "emailSelected", email: email }, "*");
  });
}
