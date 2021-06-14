const numQuestions = 5;
const authors = ["Nelson Mandela", "Walt Disney", "Steve Jobs", "Eleanor Roosevelt", "Oprah Winfrey", "John Lennon", "Mother Teresa", "Franklin D. Roosevelt", "Margaret Mead", "Robert Louis Stevenson", "Benjamin Franklin", "Helen Keller", "Aristotle", "Anne Frank", "Ralph Waldo Emerson", "Maya Angelou", "Abraham Lincoln", "Thomas A. Edison", "Oscar Wilde", "Albert Einstein", "Dalai Lama", "Mae West", "Marilyn Monroe", "Henry David Thoreau", "Confucius", "Jonathan Swift", "Robert Frost", "Emily Dickinson", "Bob Marley", "Charles Dickens", "Dr. Seuss", "Winston Churchill", "Thomas Jefferson", "Barack Obama", "Zig Ziglar", "Estee Lauder", "Herman Melville", "Wayne Gretzky", "Michael Jordan", "Rosa Parks", "Audrey Hepburn", "Ayn Rand", "Theodore Roosevelt", "Amelia Earhart", "Socrates", "Florence Nightingale", "Vincent Van Gogh", "Gloria Steinem", "Mark Twain", "Plato", "Deepak Chopra", "Tupac Shakur", "Friedrich Nietzsche",  "Simone de Beauvoir", "Malcolm X", "Muhammad Ali", "Mahatma Gandhi", "Voltaire", "J. K. Rowling", "Lao Tzu", "George Eliot", "Anais Nin", "Adele", "Ernest Hemingway", "Indira Gandhi", "Jane Austen", "Leonardo da Vinci", "Henry James", "Edgar Allan Poe", "Will Rogers", "Khalil Gibran", "William Blake", "Aesop", "Napolean Hill", "Walt Whitman", "Sun Tzu", "George Orwell", "Aldous Huxley", "Edith Wharton", "Thomas Aquinas", "Marcus Aurelius", "George Sand", "Milton Berle", "Marcel Proust", "Margaret Mead", "Thomas Paine", "William Shakespeare", "Euripides", "Desmond Tutu", "Sophia Loren", "Sophocles", "Soren Kierkegaard", "George Bernard Shaw", "Ingrid Bergman", "John F. Kennedy", "Democritus", "Albert Camus", "Buddha", "Edmund Burke", "Coco Chanel", "Bruce Lee", "Rene Descartes", "Lily Tomlin", "Katharine Hepburn", "Nora Ephron", "Judy Garland", "Lucille Ball", "Marie Curie", "Jane Goodall", "Harriet Tubman", "Margaret Thatcher", "Sojourner Truth", "Jane Fonda", "Coretta Scott King", "Ida B. Wells", "Thomas Hobbes", "John Locke", "Niccolo Machiavelli", "William James", "Francis Bacon", "Bertrand Russell", "Jean-Paul Sartre", "Jean-Jacques Rousseau", "Seneca", "C. S. Lewis", "A. A. Milne", "J. R. R. Tolkien", "Rumi", "Ambrose Bierce", "Dorothy Day", "Virginia Woolf", "James Joyce", "Isaac Asimov", "Martin Luther King", "Charles Darwin", "Vince Lombardi", "Napoleon Bonaparte", "Leo Tolstoy", "Booker T. Washington", "Pablo Picasso", "Johann Wolfgang von Goethe", "Alexandre Dumas", "Cicero", "James Baldwin", "Frederick Douglas", "Sylvia Plath", "Cesar Chavez", "Audre Lorde"];

const getQuoteAuthors = async() => {

  //set url to get quote genres
  const url="https://quote-garden.herokuapp.com/api/v3/authors";
  try {
    //axios get request to get list of genres
    const response = await axios.get(url);
    const authorList = response.data.data;

    //call function to populate genre dropdown with genre list
    console.log(authorList);
  } catch (error) {
    console.log(error);
  }
}

//get a list of random authors from the authors array to pull quotes from from the
//quotegarden api
const getRandomAuthors = (numAuthors, currentList) => {

  //array to hold list of random authors
  let authorList = [];
  if(currentList) {
    authorList = [...currentList];
  }
  //fill the authorList array with an author for each question
  while(authorList.length < numAuthors) {
    const randIndex = Math.floor(Math.random()*authors.length);
    const randAuthor = authors[randIndex];
    
    //make sure the author is not already on the author list
    if(!authorList.includes(randAuthor)) {
      authorList.push(randAuthor);
    }
  }
  
  //return list of random authors
  return authorList;
}

//get a random quote by each other from the author list
//pass quotes to generateQuestions function to generate questions for round
const getRandomQuotes = async() => {
  //use getRandomAuthors function to get a list of random authors, 1 for each question on the quiz
  const authorList = getRandomAuthors(numQuestions);
  console.log(authorList);
  //hold list of random quotes
  let randomQuoteList = [];

  //get a quote by each author on the authorList
  for(let i = 0; i < authorList.length; i+=1) 
  {
    const author = authorList[i];
    //url for axios quotegarden API request 
    const url = `https://quote-garden.herokuapp.com/api/v3/quotes/random?author=${author}`
    try {
      //axios request for random quote by current author
      const response = await axios.get(url);
      //extract needed data from reqponse
      const randomQuote = response.data.data;
      //push data to quote array
      randomQuoteList.push(randomQuote[0]);
    } catch (error) {
      console.log(error);
    }
  }
  //call function to turn quotes into questions
  console.log(randomQuoteList);
  generateQuestions(randomQuoteList);
}

const generateQuestions = (quoteList) => {
  //array to hold questions for this round
  console.log(quoteList.length);
  const questions = [];
  quoteList.forEach(quote => {
    const currentQuestion = {}
    console.log(quote);
    currentQuestion.question = quote.quoteText;
    questions.push(currentQuestion);
  })
}
  
const findMispellings = async() => {
  for(let i = 0; i < misspelled.length; i+= 1) {
    const author = misspelled[i];
    const url = `https://quote-garden.herokuapp.com/api/v3/quotes/random?author=${author}`
    try {
      //axios request for random quote by current author
      const response = await axios.get(url);
      //extract needed data from reqponse
      const randomQuote = response.data.data;
      //push data to quote array
      console.log(author, randomQuote);
    } catch (error) {
      console.log(error);
    }
  }
}

//findMispellings();
authors.sort();
//console.log(authors);
// getRandomQuotes();


  


