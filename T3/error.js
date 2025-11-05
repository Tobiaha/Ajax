'use strict';

async function getUsers() {
  const options = {
    method: 'GET',
    headers: {
      'x-api-key': '',
    },
  };
  try {
    const response = await fetch('https://reqres.in/api/users/unknown/23');
    if (!response.ok) {
      throw new Error(
        `Request failed ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();
    console.log('User data:', data);
  } catch (error) {
    console.error('An error occurred while fetching user data', error);
  }
}
getUsers();
