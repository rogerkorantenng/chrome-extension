// Retrieve the token from storage and display it on the dashboard
chrome.storage.sync.get('token', (data) => {
    if (data.token) {
        document.getElementById('token').textContent = data.token;
    } else {
        document.getElementById('token').textContent = 'No token found';
    }
});

// Logout functionality
document.getElementById('logoutButton').addEventListener('click', function() {
    chrome.storage.sync.remove('token', () => {
        chrome.tabs.create({ url: chrome.runtime.getURL('popup.html') });
    });
});
