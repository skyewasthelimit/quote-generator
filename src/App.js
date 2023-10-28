import './App.css';
import React, { useState, useEffect } from 'react';

const RandomQuote = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  const fetchRandomQuote = async () => {
    try {
      const response = await fetch('https://api.quotable.io/random');
      const data = await response.json();

      if (data && data.content && data.author) {
        setQuote(data.content);
        setAuthor(data.author);
      }
    } catch (error) {
      console.error('Error fetching random quote:', error);
    }
  };

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  const handleNewQuoteClick = () => {
    fetchRandomQuote();
  };

  const handleTweetClick = () => {
    const tweetText = `"${quote}" - ${author}`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    
    // Open a new window with the tweet intent
    window.open(tweetUrl, '_blank');
  };

  return (
    
    <div className="App">
      <div id="header">
        <div id="quote-box">
          <div id="text">"{quote}"</div>
          <div id="author">-{author}</div>
        </div>
        <button id="new-quote" onClick={handleNewQuoteClick}>
            New Quote
          </button>
          <button id="tweet" onClick={handleTweetClick}>Share on Twitter</button>
      </div>
    </div>
  );
};

export default RandomQuote;
