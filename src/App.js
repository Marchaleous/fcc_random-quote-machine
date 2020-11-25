import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './App.css';

function App() {
  const [text, setText] = useState('Quote goes here');
  const [author, setAuthor] = useState('Author goes here');

  const fetchNewQuote = async () => {
    const res = await fetch(
      'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
    );
    const data = await res.json();
    const quotes = data.quotes;

    const randomIndex = Math.floor(Math.random() * quotes.length);
    const { quote, author } = quotes[randomIndex];

    setText(quote);
    setAuthor(author);
  };

  useEffect(() => {
    fetchNewQuote();
  }, []);

  return (
    <div className='App'>
      <div id='quote-box'>
        <Text text={text} />
        <Author author={author} />
        <NewQuote fetchNewQuote={fetchNewQuote} />
        <TweetQuote text={text} author={author} />
      </div>
    </div>
  );
}

const Text = ({ text }) => (
  <div id='text'>
    <p>"{text}"</p>
  </div>
);

const Author = ({ author }) => (
  <div id='author'>
    <p>- {author}</p>
  </div>
);

const NewQuote = ({ fetchNewQuote }) => {
  const onClick = e => {
    e.preventDefault();
    fetchNewQuote();
  };

  return (
    <button id='new-quote' onClick={onClick}>
      New Quote
    </button>
  );
};

const TweetQuote = ({ text, author }) => (
  <a
    href={`https://twitter.com/intent/tweet?text="${text}"\n - ${author}`}
    id='tweet-quote'
    target='blank'
    rel='noreferrer'
  >
    <i className='fab fa-twitter-square fa-2x'></i>
  </a>
);

Text.propTypes = {
  text: PropTypes.string.isRequired,
};

Author.propTypes = {
  author: PropTypes.string.isRequired,
};

NewQuote.propTypes = {
  fetchNewQuote: PropTypes.func.isRequired,
};

TweetQuote.propTypes = {
  text: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};

export default App;
