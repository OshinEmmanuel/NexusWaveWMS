(function() {
  // Helper function to show an alert using Swal if available, otherwise fallback to native alert.
  function showAlert(icon, title, text, callback) {
    if (typeof Swal !== 'undefined') {
      Swal.fire({
        icon: icon,
        title: title,
        text: text
      }).then(callback);
    } else {
      alert(title + ": " + text);
      if (callback) callback();
    }
  }

  function scheduleTokenExpiryRedirect() {
    const expireTime = localStorage.getItem("expireTime");
    if (expireTime) {
      const expireDate = new Date(expireTime);
      const now = new Date();
      const timeDiff = expireDate.getTime() - now.getTime();
      if (timeDiff > 0) {
        // Schedule redirection when token expires.
        setTimeout(() => {
          showAlert('warning', 'Session Expired', 'Your session has expired. Please login again.', () => {
            localStorage.removeItem("authToken");
            localStorage.removeItem("expireTime");
            window.location.href = 'login.html';
          });
        }, timeDiff);
      } else {
        // Token is already expired, redirect immediately.
        window.location.href = 'login.html';
      }
    }
  }

  // Execute the expiry check on page load.
  scheduleTokenExpiryRedirect();

  // Optionally, check every minute if the token has expired.
  setInterval(() => {
    const expireTime = localStorage.getItem("expireTime");
    if (expireTime && new Date(expireTime) < new Date()) {
      showAlert('warning', 'Session Expired', 'Your session has expired. Please login again.', () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("expireTime");
        window.location.href = 'login.html';
      });
    }
  }, 60000); // 60,000ms = 60 seconds
})();
