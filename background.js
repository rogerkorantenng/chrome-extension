chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'extractedText') {
        console.log('Extracted Text:', message.data);

        // Send data to backend
        fetch('https://wo53g7o7gb.execute-api.eu-west-2.amazonaws.com/test/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: message.data })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Data sent to backend:', data);
                sendResponse({ success: true });  // Send response back
            })
            .catch(error => {
                console.error('Error:', error);
                sendResponse({ success: false, message: 'Network error' });
            });

        // Store the extracted text in storage
        chrome.storage.local.set({ extractedText: message.data });

        // Return true to indicate async response
        return true;
    }
});