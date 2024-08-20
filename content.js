// Utility function for adding event listeners
function addEventListenerToElement(elementId, eventType, callback) {
    const element = document.getElementById(elementId);
    if (element) {
        element.addEventListener(eventType, callback);
    }
}

// Function to extract all text from the page
function extractText() {
    // Get the entire text content of the body
    const allText = document.body.innerText;
    return allText;
}

// Callback function for button click
function onExtractButtonClick() {
    const textContent = extractText();

    // Send the extracted text to the background script
    chrome.runtime.sendMessage({ type: 'extractedText', data: textContent });
}

// Add event listener to the button
addEventListenerToElement('extractButton', 'click', onExtractButtonClick);