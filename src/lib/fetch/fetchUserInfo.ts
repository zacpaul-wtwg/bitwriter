// Assuming this code runs in the browser, for example in a React component

export default async function fetchUserEmail() {
  try {
    const response = await fetch("/routes/userInfo");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user info:', error);
    return null; // or handle the error as appropriate for your application
  }
}

// Call the function when appropriate, for example in a useEffect hook or an event handler
