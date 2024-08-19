// Retrieve the token from storage
chrome.storage.sync.get('token', (data) => {
    if (data.token) {
        console.log('Token found:', data.token); // Debugging

        // Fetch user details
        fetchUserDetails(data.token);

        // Fetch analytics data
        fetchAnalytics(data.token);
    } else {
        displayError('No token found', 'No user details found', 'No analytics found');
    }
});

function fetchUserDetails(token) {
    fetch('https://holy-grizzly-subtly.ngrok-free.app/api/user', {
        method: 'GET', headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            console.log('User details response status:', response.status); // Debugging
            return handleFetchResponse(response);
        })
        .then(responseJson => {
            console.log('User details fetched:', responseJson); // Debugging
            if (responseJson && responseJson.success && responseJson.user) {
                const userDetails = responseJson.user;
                chrome.storage.sync.set({userDetails: userDetails}, () => {
                    document.getElementById('userDetails').textContent = JSON.stringify(userDetails, null, 2);
                });
            } else {
                document.getElementById('userDetails').textContent = 'No user details found';
            }
        })
        .catch(error => {
            console.error('Error fetching user details:', error);
            document.getElementById('userDetails').textContent = 'Failed to fetch user details';
        });
}

function fetchAnalytics(token) {
    fetch('https://holy-grizzly-subtly.ngrok-free.app/api/analytics', {
        method: 'GET', headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            console.log('Analytics response status:', response.status); // Debugging
            return handleFetchResponse(response);
        })
        .then(analytics => {
            console.log('Analytics data fetched:', analytics); // Debugging
            if (analytics) {
                document.getElementById('analytics').textContent = JSON.stringify(analytics, null, 2);
            } else {
                document.getElementById('analytics').textContent = 'No analytics data found';
            }
        })
        .catch(error => {
            console.error('Error fetching analytics:', error);
            document.getElementById('analytics').textContent = 'Failed to fetch analytics';
        });
}

function handleFetchResponse(response) {
    if (!response.ok) {
        console.error('Fetch error:', response.statusText); // Debugging
        throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
}

function displayError(tokenMessage, userDetailsMessage, analyticsMessage) {
    document.getElementById('token').textContent = tokenMessage;
    document.getElementById('userDetails').textContent = userDetailsMessage;
    document.getElementById('analytics').textContent = analyticsMessage;
}

// Logout functionality
document.getElementById('logoutButton').addEventListener('click', function () {
    chrome.storage.sync.remove(['token', 'userDetails'], () => {
        chrome.tabs.create({url: chrome.runtime.getURL('popup.html')});
    });
});
