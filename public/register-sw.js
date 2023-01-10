if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js")
      .then(() => console.log("registered Swarm Clone SW"))
      .catch(error => console.warn('Error registering service worker:', error));
  }