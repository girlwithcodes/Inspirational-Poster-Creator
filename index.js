//function to quote genre dropdown list when passed genreList array
const listGenres = (genreList) => {
  //save dropdown html dropdown list to variable
  const genreMenu = document.querySelector("#quote-genres");
  
  //loop through array of genres to create an option tag for each and 
  //append it to dropdown list
  genreList.forEach(genre => {
    const genreItem = document.createElement("option");
    genreItem.innerText = genre;
    genreItem.value = genre;
    genreMenu.append(genreItem);
  })
}

//get list of quote genres from quote garden API
//call function to populate Quote Genre dropdown with genre values
const getQuoteGenres = async() => {
  //set url to get quote genres
  const url="https://quote-garden.herokuapp.com/api/v3/genres";
  try {
    //axios get request to get list of genres
    const response = await axios.get(url);
    const genreList = response.data.data;

    //call function to populate genre dropdown with genre list
    listGenres(genreList);
  } catch (error) {
    console.log(error);
  }
}

//removes the previous quote preview from the preview window
const removePreviousQuotePreview = () => {
  const previewDiv = document.querySelector("#quote-preview-div");
  if(previewDiv) {
    previewDiv.remove();
  }
}

//apply selected quote to poster
const applyQuote = (e) => {
  e.preventDefault();

  const posterQuoteText = document.querySelector("#quote-text");
  const posterAuthor = document.querySelector("#quote-author");

  const previewQuoteText = document.querySelector("#preview-quote-text");
  const previewAuthor = document.querySelector("#preview-author");

  posterQuoteText.innerText = previewQuoteText.innerText;
  posterAuthor.innerText = previewAuthor.innerText;

}

//displays preview of quote, creates button to apply quote to poster
const previewQuote = (quoteData) => {

  //remove a previous preview
  removePreviousQuotePreview();

  //get div to attach quote to
  const quoteSelectionDiv = document.querySelector("#quote-choice");

  //get quote author and text from quote data passed as parameter
  const quoteText = quoteData.quoteText;
  const quoteAuthor = quoteData.quoteAuthor;
  
  //create a div to hold quote text and author
  const previewDiv = document.createElement("div");
  previewDiv.id = "quote-preview-div";

  //create paragraphs and add text for quote text and author
  const quoteParagraph = document.createElement("p");
  quoteParagraph.id = "preview-quote-text";
  quoteParagraph.innerText = quoteText;
  const authorParagraph = document.createElement('p');
  authorParagraph.id = "preview-author";
  authorParagraph.innerText = quoteAuthor;

  //create button to apply quote to poster
  const applyButton = document.createElement("button");
  applyButton.id = "apply-quote-button";
  applyButton.innerText = "Apply to Poster";

  //append paragraphs to preview div, append preview div to quote selection div
  previewDiv.append(quoteParagraph, authorParagraph, applyButton);
  quoteSelectionDiv.append(previewDiv);

  //add event listener to applyButton to call applyQuote function
  applyButton.addEventListener("click", applyQuote);
}

//get a random quote using the quote garden API
const getRandomQuote = async(e) => {
  //prevent page reload
  e.preventDefault();
  
  //get selected genre from dropDown list
  const genreDropdown = document.querySelector("#quote-genres");
  const genre = genreDropdown[genreDropdown.selectedIndex].value;

  //set url including genre
  const url = `https://quote-garden.herokuapp.com/api/v3/quotes/random?genre=${genre}`;
  
  try {
    //axios get request to quote garden API to get random quote
    const response = await axios.get(url);

    //get main quote object with quote text and author from response
    const quoteData = response.data.data[0];

    //call function to preview quote in quote selection div
    previewQuote(quoteData);

  } catch (error) {
    console.log(error);
  }
}

const getRandomPic = () => {
  try {
    // const url = "https://api.unsplash.com/photos/?client_id=cirZDpP6EXieKtfB9ethI1UinEjLOoSQTBN9rQYu3w8";
    const url = "https://source.unsplash.com/featured/?sunset/900x900";
    const picDiv = document.querySelector('#pic-div');
    const pic = document.createElement('img');
    pic.style.maxWidth = "100%";
    pic.style.maxHeight="100%"
    pic.id = "pic";
    pic.src = url;
    picDiv.style.background = `no-repeat center/100% url(${pic.src})`;
  } catch (error) {
    console.log(error);
  }
}

const getQuoteButton = document.querySelector("#get-quote");
getQuoteButton.addEventListener('click', getRandomQuote);
getRandomPic();
getQuoteGenres();