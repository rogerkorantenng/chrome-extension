document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.sync.get('token', function(data) {
        if (data.token) {
            // If a token exists, redirect to the dashboard
            window.location.href = 'dashboard.html';
        }
    });
});

document.getElementById('loginButton').addEventListener('click', function() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    chrome.runtime.sendMessage({ action: 'login', email, password }, function(response) {
        if (response.success) {
            // Open the dashboard.html in a new tab
            chrome.tabs.create({ url: chrome.runtime.getURL('dashboard.html') });
            // Close the popup
            window.close();
        } else {
            alert('Login failed: ' + response.message);
        }
    });
});
