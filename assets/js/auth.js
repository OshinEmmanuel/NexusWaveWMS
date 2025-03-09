(function() {
    /**
     * Checks if the token's expiry time has been reached and schedules a redirect.
     */
    function scheduleTokenExpiryRedirect() {
      const expiryTime = localStorage.getItem("expiryTime");
      if (expiryTime) {
        const expiryDate = new Date(expiryTime);
        const now = new Date();
        const timeDiff = expiryDate.getTime() - now.getTime();
        if (timeDiff > 0) {
          // Schedule redirection when token expires.
          setTimeout(() => {
            Swal.fire({
              icon: 'warning',
              title: 'Session Expired',
              text: 'Your session has expired. Please login again.'
            }).then(() => {
              localStorage.removeItem("authToken");
              localStorage.removeItem("expiryTime");
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
      const expiryTime = localStorage.getItem("expiryTime");
      if (expiryTime && new Date(expiryTime) < new Date()) {
        Swal.fire({
          icon: 'warning',
          title: 'Session Expired',
          text: 'Your session has expired. Please login again.'
        }).then(() => {
          localStorage.removeItem("authToken");
          localStorage.removeItem("expiryTime");
          window.location.href = 'login.html';
        });
      }
    }, 60000); // 60,000ms = 60 seconds
  })();
  