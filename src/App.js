import './App.css';
import React, { useState, useEffect, useCallback } from 'react';
import Twitter from './assets/twitter.png'

const COLORS = [
  '#16a085',
  '#27ae60',
  '#2c3e50',
  '#f39c12',
  '#e74c3c',
  '#9b59b6',
  '#FB6964',
  '#342224',
  '#472E32',
  '#BDBB99',
  '#77B1A9',
  '#73A857'
];

const RandomQuote = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [currentColor, setCurrentColor] = useState('#BDBB99');
  const [previousColor, setPreviousColor] = useState('#BDBB99');


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
    changeColor();
  };

  const changeColor = useCallback(() => {
    setPreviousColor(currentColor);
    const color = COLORS[Math.floor(Math.random() * COLORS.length)]
    setCurrentColor(color);
  }, [currentColor, setPreviousColor, setCurrentColor])


  useEffect(() => {
    if (currentColor === previousColor) {
      changeColor();
    }
  }, [currentColor, previousColor, changeColor]);


  const handleTweetClick = () => {
    const tweetText = `"${quote}" - ${author}`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    
    // Open a new window with the tweet intent
    window.open(tweetUrl, '_blank');
  };

  return (
    
    <div className="App">
      <div id="header" style={{backgroundColor:currentColor}}>
        <div id="quote-box">
          <div id="text" style={{color:currentColor}}>"{quote}"</div>
          <div id="author" style={{color:currentColor}}>-{author}</div>
        </div>
        <button id="new-quote" style={{backgroundColor:currentColor}} onClick={handleNewQuoteClick}>
            New Quote
          </button>
          <button id="tweet-quote"><img id="twitter" src={Twitter} onClick={handleTweetClick} alt="twitter bird"></img></button>
      </div>
    </div>
  );
};

export default RandomQuote;
