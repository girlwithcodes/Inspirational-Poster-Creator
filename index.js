
//set array of font options as a global variable
const fontList = [
  {fontFamily: ["Viaoda Libre", " cursive"]},
  {fontFamily: ["Indie Flower", " cursive"]},
  {fontFamily: ["Pacifico", " cursive"]},
  {fontFamily: ["Libre Baskerville", " serif"]},
  {fontFamily: ["Dancing Script", " cursive"]},
  {fontFamily: ["Shadows Into Light", " cursive"]},
  {fontFamily: ["Patrick Hand", " cursive"]},
  {fontFamily: ["Orbitron", " sans-serif"]},
  {fontFamily: ["Josefin Slab", " serif"]},
  {fontFamily: ["Bad Script", " cursive"]}
]

//===============================================================================//
//
//    Function to generate options and populate dropdown menus
//
//===============================================================================//

//Populate quote genre dropdown list when passed genreList array
const listGenres = (genreList) => {
  
  //get quote genre dropdown list to variable
  const genreMenu = document.querySelector("#quote-genres");
  
  //loop through array of genres to create an option tag for each and 
  //append it to dropdown list
  genreList.forEach(genre => {
    const genreItem = document.createElement("option");
    genreItem.innerText = genre;
    genreItem.value = genre;
    if(genre==="art") {
      genreItem.setAttribute("selected", "selected");
    }
    genreMenu.append(genreItem);
  })
}

//Get list of quote genres from quote garden API
//and call function to populate Quote Genre dropdown with genre values
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


//Populate image topics dropdown menu with image topics list
const listImageThemes = (topicsList) => {
  
  //grab dropdown menu for topics list
  const themesMenu = document.querySelector("#pic-themes");
  
  //loop over topicsList array and add an option tag for each with Unsplash topic ID as option value
  //and append to dropdown menu
  topicsList.forEach(topic => {
    const themeItem = document.createElement("option");
    themeItem.innerText = topic.title;
    themeItem.value = topic.id;
    if(topic.id==="bDo48cUhwnY") {
      themeItem.setAttribute("selected", "selected");
    }
    themesMenu.append(themeItem);
  })
}

//Get list of image topics from Unsplash API
//call function to populate topics dropdown menu with topic list
const getImageTopics = async () => {
  
  //url to return list of all 27 image topics from unsplash
  const url = "https://api.unsplash.com/topics/?client_id=cirZDpP6EXieKtfB9ethI1UinEjLOoSQTBN9rQYu3w8&per_page=27";
  
  try {
    //get data from unsplash and assign array of topics to topicsList variable
    const response = await axios.get(url);
    const topicsList = response.data;
    listImageThemes(topicsList);
  } catch (error) {
    console.error(error);
  }
}

//populates font choice dropdown menu with list of font options
const listFonts = () => {
  
  //get font dropdown menu
  const fontMenu = document.querySelector("#font-list");

  //create a font option for each item in the font list and append to
  //font dropdown menu
  fontList.forEach(font => {
    const fontOption = document.createElement("option");
    fontOption.innerText = font.fontFamily[0];
    fontOption.value = font.fontFamily;
    fontMenu.append(fontOption);
  })
  previewFont();
}


//===============================================================================//
//
//    Quote Functions - generate random quotes, preview, and apply to poster,
//        and remove any previous preview or poster quotes
//
//===============================================================================//


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

  //get current poster text elements
  const posterQuoteText = document.querySelector("#quote-text");
  const posterAuthor = document.querySelector("#quote-author");

  //get current preview text elements 
  const previewQuoteText = document.querySelector("#preview-quote-text");
  const previewAuthor = document.querySelector("#preview-author");

  //change poster text to match preview text
  posterQuoteText.innerText = previewQuoteText.innerText;
  posterAuthor.innerText = previewAuthor.innerText;
}


//display preview of quote, create button to apply quote to poster
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

//========================================================================================//
//
//    Background Image Functions - generate random images, preview, and apply to poster,
//        and remove any previous preview or poster images
//
//========================================================================================//

//remove prevous background preview from background choice div
const removePreviousBackgroundPreview = () => {
  const previousImage = document.querySelector("#background-preview-div");
  if(previousImage) {
    previousImage.remove();
  }
}

//remove previous background from poster
const removePreviousBackground = () => {
  const previousImage = document.querySelector("#poster-image");
  if(previousImage) {
    previousImage.remove();
  }
}

//apply chosen background to poster
const applyBackground = (imageData) => {

  //remove previous background
  removePreviousBackground();

  //get poster div and set width and height
  const poster = document.querySelector("#pic-div");
  poster.height = imageData.height + "px";
  poster.width = imageData.width + "px";
  
  //apply landscape or portrait class for css styling
  if (imageData.height > imageData.width && !poster.classList.contains("portrait")) {
    if(poster.classList.contains("landscape")) {
      poster.classList.replace("landscape", "portrait");
    } else {
      poster.classList.add("portrait");
    }
  }
  if (imageData.width > imageData.height && !poster.classList.contains("landscape")) {
    if(poster.classList.contains("portrait")) {
      poster.classList.replace("portrait", "landscape");
    } else {
      poster.classList.add("landscape");
    }
  }

  //create image element to add to poster
  const posterImage = document.createElement("img");
  posterImage.style.objectFit = "scale-down";
  posterImage.src = imageData.urls.regular;
  posterImage.id = "poster-image";

  //append image to poster
  poster.append(posterImage);

  //get quote div and set width and height
  const posterQuoteDiv = document.querySelector("#quote-div");
  posterQuoteDiv.width = imageData.width;
  posterQuoteDiv.height = imageData.height;
}

//display preview of randomly generated background image as a thumbnail 
//create button to allow user to choose to apply it to poster 
const previewBackground = (imageData) => {
  //get correct div to which to append thumbnail preview
  const backgroundChoiceDiv = document.querySelector("#pic-choice");

  //remove previous preview
  removePreviousBackgroundPreview();

  //create div to hold preview image and button
  const previewDiv = document.createElement("div");
  previewDiv.id = "background-preview-div";

  //create preview image and assign src to thumbnail url
  const previewImage = document.createElement("img");
  previewImage.id = "pic-preview";
  previewImage.maxHeight = "50px";
  previewImage.src = imageData.urls.raw + "&h=100";

  //create Apply Background Button
  const applyBackgroundButton = document.createElement("button");
  applyBackgroundButton.id = "apply-background";
  applyBackgroundButton.innerText = "Apply Background";

  previewDiv.append(previewImage, applyBackgroundButton);
  backgroundChoiceDiv.append(previewDiv);

  //add event listener to apply background function
  applyBackgroundButton.addEventListener("click", () => {
    applyBackground(imageData);
  });
}

//gets random picture object from Unsplash API based on user-selected theme
//calls function to preview photo
const getRandomPicOnTheme = async(e) => {
  e.preventDefault();

  //get selected theme from topics dropdown menu
  const topicDropdown = document.querySelector("#pic-themes");
  const topic = topicDropdown[topicDropdown.selectedIndex].value;

  //url to generate random picture with chosen theme
  const url = `https://api.unsplash.com/photos/random/?client_id=cirZDpP6EXieKtfB9ethI1UinEjLOoSQTBN9rQYu3w8&topics=${topic}`;

  try {
    //axios call to get random pic
    const response = await axios.get(url);
  
    //pass response data to previewBackground function
    previewBackground(response.data);
  } catch (error) {
    console.log(error);
  }
}

//========================================================================================//
//
//    Font Functions - preview and apply fonts to poster, change 
//        poster text font color
//
//========================================================================================//


//changes the font color of the poster text based on user selection
const changeQuoteColor = (event) => {
  //get poster text elements
  const quoteText = document.querySelector("#quote-text");
  const quoteAuthor = document.querySelector("#quote-author");

  //change color to match color picker current value
  quoteText.style.color = event.target.value;
  quoteAuthor.style.color = event.target.value;
}

//create a font preview in font choice div
const previewFont = () => {
  
  //get font choice dropdown menu
  const fontMenu = document.querySelector("#font-list");

  //get selected font from dropdown menu
  const fontChoice = fontMenu[fontMenu.selectedIndex].value;

  //get font preview paragraph
  const fontPreview = document.querySelector("#font-preview");
  
  //set font of preview text to match selected font
  fontPreview.style.fontFamily = fontChoice;
}


//apply currently selected font to poster text
const applyFont = () => {
  //get poster quote and author text
  const quoteDiv = document.querySelector("#quote-div");

  //get font dropdown menu and currently selected font
  const fontMenu = document.querySelector("#font-list");
  const selectedFont = fontMenu[fontMenu.selectedIndex].value;

  //apply selected font to poster text
  quoteDiv.style.fontFamily = selectedFont;
}

//========================================================================================//
//
//    Function to generate a complete randomimzed poster, with random quote,
//      background, font, and font color
//
//========================================================================================//

//generates and returns random hex color
const getRandomColor = () => {
  //list possible values for hex color
  const hexValues = "0123456789ABCDEF"
  
  //initialize variable to hold hex color
  let randomHexColor = "#";

  //loop to choose 6 random values from hexValues string and add to randomHexColor string
  for(let i = 0; i < 6; i += 1) {
    const randomIndex = Math.floor(Math.random() * hexValues.length);
    randomHexColor += hexValues[randomIndex];
  }
  return randomHexColor;
}

//generates a complet random poster with random image, quote, font color, font style and layout
const generateRandomPoster = async() => {
  //get random image and apply to poster

  //url to generate random picture with chosen theme
  const imageUrl = `https://api.unsplash.com/photos/random/?client_id=cirZDpP6EXieKtfB9ethI1UinEjLOoSQTBN9rQYu3w8`;

  const quoteUrl = `https://quote-garden.herokuapp.com/api/v3/quotes/random`;

  try {
    //axios call to get random pic
    const imageResponse = await axios.get(imageUrl);
  
    //apply to poster
    const imageData = imageResponse.data;

    //get poster div and set width and height
    const poster = document.querySelector("#pic-div");
    poster.height = imageData.height + "px";
    poster.width = imageData.width + "px";
  
    //apply landscape or portrait class for css styling
    if (imageData.height > imageData.width && !poster.classList.contains("portrait")) {
      if(poster.classList.contains("landscape")) {
        poster.classList.replace("landscape", "portrait");
      } else {
        poster.classList.add("portrait");
      }
    }
    if (imageData.width > imageData.height && !poster.classList.contains("landscape")) {
      if(poster.classList.contains("portrait")) {
        poster.classList.replace("portrait", "landscape");
      } else {
        poster.classList.add("landscape");
      }
    }

    //create image element to add to poster
    const posterImage = document.createElement("img");
    posterImage.style.objectFit = "scale-down";
    posterImage.src = imageData.urls.regular;
    posterImage.id = "poster-image";

    //append image to poster
    poster.append(posterImage);

    //get quote div and set width and height
    const posterQuoteDiv = document.querySelector("#quote-div");
    posterQuoteDiv.width = imageData.width;
    posterQuoteDiv.height = imageData.height;

  } catch (error) {
    console.log(error);
  }

  //get random quote and apply to poster
  try {
    //axios get request to quote garden API to get random quote
    const quoteResponse = await axios.get(quoteUrl);

    //get main quote object with quote text and author from response
    const quoteData = quoteResponse.data.data[0];
    console.log(quoteData);

    //apply random quote to poster
    //get current poster text elements
    const posterQuoteText = document.querySelector("#quote-text");
    const posterAuthor = document.querySelector("#quote-author");

    //get quote text and author from data
    const quoteText = quoteData.quoteText;
    const quoteAuthor = quoteData.quoteAuthor;

    //change poster text to match preview text
    posterQuoteText.innerText = quoteText;
    posterAuthor.innerText = quoteAuthor;

    //get random font and apply to poster
    //generate a random index from global font list variable:
    const fontIndex = Math.floor(Math.random() * fontList.length);
    const font = fontList[fontIndex].fontFamily.join();

    console.log(font);

    posterQuoteText.style.fontFamily = font;
    posterAuthor.style.fontFamily = font;

    const randomColor = getRandomColor();
    posterQuoteText.style.color = randomColor;
    posterAuthor.style.color = randomColor;

  } catch (error) {
    console.log(error);
  }
  //get random layout and apply to poster
  
}

//========================================================================================//
//
//    Get elements that need event listeners, add event listeners, and call functions
//          to execute on load
//
//========================================================================================//


//get buttons and inputs that will have event listeners
const getQuoteButton = document.querySelector("#get-quote");
const fontColorPicker = document.querySelector("#font-color-picker");
const getImageButton = document.querySelector("#get-pic");
const fontDropdownMenu = document.querySelector("#font-list");
const applyFontButton = document.querySelector("#change-font");

//apply event lister to get-quote button to generate and preview a random quote
getQuoteButton.addEventListener("click", getRandomQuote);

//attach event listners to color picker to change poster text color
fontColorPicker.addEventListener("change", changeQuoteColor);
fontColorPicker.addEventListener("input", changeQuoteColor);

//attach event listener to new-background to generate and preview random image
getImageButton.addEventListener("click", getRandomPicOnTheme);

//attach event listener to preview font in font choice window when user
//selects a new font from the dropdown
fontDropdownMenu.addEventListener("change", previewFont);

//attach event listener to applyFont button to change font on poster 
//when clicked
applyFontButton.addEventListener("click", applyFont);

//call functions that should run on load
//getRandomPicOnLoad();
getQuoteGenres();
getImageTopics();
//getRandomPicOnTheme();
listFonts();
generateRandomPoster();
