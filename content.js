let searchBar = document.querySelector('textarea[title="Search"]');
let inputs = document.querySelectorAll("input");
//searchBar.value = "ShadowSafe";
console.log("inputs =>", inputs);

let alanUsername = "tonyantony301@yahoo.com";
let alanPassword = "test2123@";

for (let input of inputs) {
  let type = input.getAttribute("type");
  let placeholder = input.getAttribute("placeholder");
  if (type === "text" || type === "email" || placeholder === "Username") {
    let icon = document.createElement("div");
    icon.innerHTML = `<svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_675_11706)">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M13.2865 0.204602C13.6332 -0.201507 14.1214 0.0380715 14.2099 0.562432C14.2307 0.685954 14.2529 0.819028 14.2762 0.960275C13.1518 2.25512 12.6507 3.2334 11.7995 4.89507L11.7384 5.01432C13.0997 3.0962 13.8542 2.11473 14.4331 1.93779C14.643 3.28413 14.8786 4.96512 14.9783 6.2866C15.0457 7.17999 15.122 8.28715 15.1912 9.32174C15.2418 10.0796 15.0387 10.5371 14.6522 10.7324C14.4565 11.385 14.1805 12.0099 13.8277 12.5892C12.8276 14.2313 11.2855 15.3832 9.51539 15.8105C9.19251 15.8884 8.86646 15.9412 8.53956 15.9692C8.33711 15.4741 8.11087 14.8673 7.84613 14.1392L7.87258 14.2642C8.01121 14.9192 8.1284 15.4729 8.25796 15.9871C6.88521 16.0451 5.50896 15.669 4.29934 14.8891C2.71866 13.87 1.54132 12.2377 1.00693 10.3246C4.49975 10.9029 6.44731 10.9332 9.90586 10.5533C11.7673 10.3488 12.8104 9.77432 13.5468 8.9951C13.9908 7.44454 14.1523 5.81773 13.6642 5.74296C13.5765 5.72952 13.4441 5.74639 13.2814 5.7824C12.4739 6.25869 11.8037 6.62465 11.1822 6.92093C11.7023 6.99138 12.1074 7.24257 12.2517 7.64299C12.5108 8.36194 11.8313 9.28973 10.734 9.71526C9.6367 10.1408 8.53708 9.90295 8.27795 9.18401C8.12603 8.7625 8.29673 8.26922 8.6851 7.84745C8.62308 7.86469 8.56041 7.88181 8.49701 7.89883C7.20375 8.07395 6.15569 8.18742 5.15224 8.24498C5.7 8.87515 5.89167 9.62203 5.57055 10.1107C5.1538 10.745 4.03125 10.7042 3.06325 10.0197C2.36598 9.52669 1.9391 8.83412 1.91061 8.24826C1.55981 8.2317 1.19304 8.21034 0.804314 8.18436C0.721449 6.3013 1.33339 4.45625 2.5156 3.02472C3.6978 1.5932 5.36142 0.682787 7.16787 0.478778C8.94062 0.278574 10.7202 0.773433 12.1577 1.86377C12.5389 1.21295 12.9302 0.621994 13.2865 0.204602ZM9.42423 9.02463C9.7126 8.91154 9.85797 8.57737 9.74892 8.27822C9.63987 7.97908 9.3177 7.82826 9.02933 7.94134C8.74096 8.05443 8.59559 8.38861 8.70464 8.68775C8.81369 8.98689 9.13586 9.13772 9.42423 9.02463ZM3.16926 9.45072C3.45026 9.58227 3.78086 9.4526 3.90767 9.16109C4.03448 8.86958 3.90949 8.52663 3.62849 8.39508C3.34749 8.26354 3.01689 8.39321 2.89008 8.68472C2.76327 8.97623 2.88826 9.31918 3.16926 9.45072Z" fill="url(#paint0_linear_675_11706)"/>
      </g>
      <defs>
      <linearGradient id="paint0_linear_675_11706" x1="1.0223e-08" y1="16" x2="16" y2="1.0223e-08" gradientUnits="userSpaceOnUse">
      <stop stop-color="#313471"/>
      <stop offset="1" stop-color="#542D52"/>
      </linearGradient>
      <clipPath id="clip0_675_11706">
      <rect width="16" height="16" fill="white"/>
      </clipPath>
      </defs>
      </svg>`;
    // Style the icon element using CSS properties
    icon.style.width = "24px";
    icon.style.height = "24px";
    icon.style.position = "absolute";
    icon.style.display = "flex";
    icon.style.justifyContent = "center";
    icon.style.alignItems = "center";
    icon.style.right = "-10%";
    icon.style.cursor = "pointer";

    // Create a new element that will be the container for the iframe
    let container = document.createElement("div");
    // Set the id, style, and position properties for the container element
    container.id = "cm-iframe-container";
    container.style.position = "fixed";
    container.style.top = "10px";
    container.style.right = "10px";
    container.style.width = "400px";
    container.style.height = "calc(100% - 20px)";
    container.style.zIndex = "2147483650";
    container.style.display = "none";

    let iframe = document.createElement("iframe");
    iframe.id = "cm-iframe";
    iframe.src = chrome.runtime.getURL("iframe.html");
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "none";

    container.appendChild(iframe);

    document.body.appendChild(container);

    icon.addEventListener("click", () => {
      if (container.style.display === "none") {
        container.style.display = "block";
      } else {
        container.style.display = "none";
      }
      //   chrome.runtime.sendMessage({ action: "iconClicked", input: input.value });
    });

    input.parentNode.insertBefore(icon, input.nextSibling);

    //     if (
    //       input.getAttribute("name") === "email" ||
    //       input.getAttribute("id") === "email" ||
    //       input.getAttribute("placeholder" === "Username")
    //     ) {
    //       input.value = alanUsername;
    //     }
    //     if (
    //       input.getAttribute("name") === "password" ||
    //       input.getAttribute("id") === "password" ||
    //       input.getAttribute("placeholder" === "Password")
    //     ) {
    //       input.value = alanPassword;
    //     }
  }
}

window.addEventListener("message", (message) => {
  if (message.data.action === "emailSelected") {
    let email = message.data.email;
    // Assign the email value to the input field

    // input.value = email;
  }
});
