// // Retrieve the token from storage
// chrome.storage.sync.get('token', (data) => {
//     if (data.token) {
//         console.log('Token found:', data.token); // Debugging
//
//         // Fetch user details
//         fetchUserDetails(data.token);
//
//     } else {
//         displayError('No token found', 'No user details found', 'No analytics found');
//     }
// });
//
// function fetchUserDetails(token) {
//     fetch('https://holy-grizzly-subtly.ngrok-free.app/api/user', {
//         method: 'GET', headers: {
//             'Authorization': `Bearer ${token}`
//         }
//     })
//         .then(response => {
//             console.log('User details response status:', response.status); // Debugging
//             return handleFetchResponse(response);
//         })
//         .then(responseJson => {
//             console.log('User details fetched:', responseJson); // Debugging
//             if (responseJson && responseJson.success && responseJson.user) {
//                 const userDetails = responseJson.user;
//                 chrome.storage.sync.set({userDetails: userDetails}, () => {
//                     document.getElementById('userDetails').textContent = JSON.stringify(userDetails, null, 2);
//                 });
//             } else {
//                 document.getElementById('userDetails').textContent = 'No user details found';
//             }
//         })
//         .catch(error => {
//             console.error('Error fetching user details:', error);
//             document.getElementById('userDetails').textContent = 'Failed to fetch user details';
//         });
// }
//
//
// function handleFetchResponse(response) {
//     if (!response.ok) {
//         console.error('Fetch error:', response.statusText); // Debugging
//         throw new Error('Network response was not ok ' + response.statusText);
//     }
//     return response.json();
// }
//
// function displayError(tokenMessage, userDetailsMessage, analyticsMessage) {
//     document.getElementById('token').textContent = tokenMessage;
//     document.getElementById('userDetails').textContent = userDetailsMessage;
//     document.getElementById('analytics').textContent = analyticsMessage;
// }
//
// // Logout functionality and remove token from storage
// document.getElementById('logoutButton').addEventListener('click', function () {
//     chrome.storage.sync.remove(['token', 'userDetails'], () => {
//         chrome.tabs.create({url: chrome.runtime.getURL('popup.html')});
//     });
// });
//
// // Make payment
// document.getElementById('makePaymentButton').addEventListener('click', function () {
//     chrome.storage.sync.get('token', (data) => {
//         if (data.token) {
//             fetch('https://holy-grizzly-subtly.ngrok-free.app/api/payment', {
//                 method: 'POST', headers: {
//                     'Authorization': `Bearer ${data.token}`,
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({amount: 100})
//             })
//                 .then(response => {
//                     console.log('Payment response status:', response.status); // Debugging
//                     return handleFetchResponse(response);
//                 })
//                 .then(responseJson => {
//                     console.log('Payment response:', responseJson); // Debugging
//                     if (responseJson && responseJson.success) {
//                         document.getElementById('paymentResponse').textContent = 'Payment successful';
//                     } else {
//                         document.getElementById('paymentResponse').textContent = 'Payment failed';
//                     }
//                 })
//                 .catch(error => {
//                     console.error('Error making payment:', error);
//                     document.getElementById('paymentResponse').textContent = 'Failed to make payment';
//                 });
//         } else {
//             document.getElementById('paymentResponse').textContent = 'No token found';
//         }
//     }
//     );
// }
// );
