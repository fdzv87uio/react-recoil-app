//The following function calls FAQX SEARCH API a retrieves a list of 10 possible results
export async function getData(search) {
  // build up the API request URL with the respective search string
  const url = `https://search.faqx.com/general?q=${search}&size=10`;
  // making GET request
  const data = await getSearchData(url);
  // Creating empty results object array
  const resultsArray = data;
  // sort data by score and priority
  resultsArray.sort((a, b) => b.score - a.score);
  resultsArray.sort((a, b) => a.priority - b.priority);
  // return Results Array
  return resultsArray;
}

async function getSearchData(url) {
  return await fetch(url)
    .then((response) => response.json())
    .catch((err) => console.error("getApiInfo", err));
}
