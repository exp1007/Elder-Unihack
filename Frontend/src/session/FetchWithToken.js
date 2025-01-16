// fetchWithToken.js (or wherever you put this function)
const fetchWithToken = async (url, token, options = {}) => {
    // Append the token as a query parameter if it exists
    const urlWithToken = token ? `${url}?tokenCode=${token}` : url;
  
    console.log(urlWithToken);
    // Make the fetch request
    const response = await fetch(urlWithToken, options);
  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  
    return response.json(); // Return the response data (adjust based on your API)
  };
  
  export default fetchWithToken;
  