'use strict';

async function getusers() {
  const options = {
    method: 'GET',
    headers: {
      'x-api-key': '',
    },
  };
  try {
    const response = await fetch('https://reqres.in/api/users/1', options);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();
    console.log('dataa', data);
  } catch (error) {
    console.error('Error getting user data', error);
  }
}
getusers();
