chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'login') {
        fetch('https://holy-grizzly-subtly.ngrok-free.app/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: message.email,
                password: message.password
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Store the token
                    chrome.storage.sync.set({ token: data.token }, () => {
                        console.log('Token saved.');
                    });

                    // Send success response back to popup.js
                    sendResponse({ success: true });
                } else {
                    sendResponse({ success: false, message: data.message });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                sendResponse({ success: false, message: 'Network error' });
            });

        // Return true to indicate async response
        return true;
    }
});
