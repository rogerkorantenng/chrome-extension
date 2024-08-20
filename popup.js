// document.addEventListener('DOMContentLoaded', function() {
//     chrome.storage.sync.get('token', function(data) {
//         if (data.token) {
//             // If a token exists, redirect to the dashboard
//             window.location.href = 'dashboard.html';
//         }
//     });
// });
//
// document.getElementById('loginButton').addEventListener('click', function() {
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;
//
//     chrome.runtime.sendMessage({ action: 'login', email, password }, function(response) {
//         if (response.success) {
//             // Open the dashboard.html in a new tab
//             chrome.tabs.create({ url: chrome.runtime.getURL('dashboard.html') });
//             // Close the popup
//             window.close();
//         } else {
//             alert('Login failed: ' + response.message);
//         }
//     });
// });
//
//
//
// Utility function for adding event listeners
// popup.js

// Utility function for adding event listeners
function addEventListenerToElement(elementId, eventType, callback) {
    const element = document.getElementById(elementId);
    if (element) {
        element.addEventListener(eventType, callback);
    }
}

// Utility function for retrieving data from chrome.storage.local
function getDataFromLocalStorage(key, callback) {
    chrome.storage.local.get(key, function(data) {
        callback(data[key] || 'No data found');
    });
}

// Callback function for extract button click
function onExtractButtonClick() {
    alert('Getting Payment Details...');
    // Existing code for sending messages
}

// Callback function for DOMContentLoaded event
function onDOMContentLoaded() {
    getDataFromLocalStorage('extractedText', function(extractedText) {
        // Display the extracted text in the popup
        document.getElementById('extractedText').textContent = extractedText;
    });
}

// Add event listener to the extract button
addEventListenerToElement('extractButton', 'click', onExtractButtonClick);

// Add event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', onDOMContentLoaded);