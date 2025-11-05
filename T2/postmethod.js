'use strict';

async function getusers() {
  const bodyData = {
    name: 'John Doe',
    job: 'Software Developer',
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': '',
    },
    body: JSON.stringify(bodyData),
  };

  try {
    const response = await fetch('', options);

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
