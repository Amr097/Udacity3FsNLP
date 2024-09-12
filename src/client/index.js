//scss files
import "./styles/global.scss";

// js files
import { handleSubmit } from "./js/formHandler";
import { fetchApi } from "./js/fetchApi";

//Register service worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("ServiceWorker registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("ServiceWorker registration failed: ", registrationError);
      });
  });
}
