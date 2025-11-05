'use strict';

async function fetchData(url, options) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(
        `Request failed ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log('Response data:', data);
  } catch (error) {
    console.error('An error occurred while fetching', error);
  }
}

const bodyData = {
  name: 'John Doe',
  job: 'Software Developer',
};
const url = 'https://reqres.in/api/users';

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': '',
  },
  body: JSON.stringify(bodyData),
};

fetchData(url, options);
