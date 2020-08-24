if ("serviceWorker" in navigator) {
    // Registra o service worker
    navigator.serviceWorker.register("service-work.js")
      .then(function (registration) {
        console.info("Service Worker registration successful with scope: ", registration.scope);
      })
      .catch(function (err) {
        // Log do erro caso não consiga registrar o service worker
        console.error("Service Worker registration failed: ", err);
      });
  }