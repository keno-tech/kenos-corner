import React, { useState, useEffect } from 'react';
import '../styles/DashboardInfo.css';

function DashboardInfo() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [quote, setQuote] = useState({ content: '', author: '' });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Fetch quote
    const fetchQuote = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://api.quotable.io/random');
        const data = await response.json();
        setQuote({
          content: data.content,
          author: data.author
        });
      } catch (error) {
        console.error('Error fetching quote:', error);
        setQuote({
          content: 'The best time to plant a tree was 20 years ago. The second best time is now.',
          author: 'Chinese Proverb'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuote();

    // Cleanup
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="dashboard-info">
      <div className="time-date">
        <div className="time">
          {currentTime.toLocaleTimeString()}
        </div>
        <div className="date">
          {currentTime.toLocaleDateString(undefined, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      </div>
      <div className="quote">
        {isLoading ? (
          <div className="loading">Loading quote...</div>
        ) : (
          <>
            <span className="quote-content">"{quote.content}"</span>
            <span className="quote-author">- {quote.author}</span>
          </>
        )}
      </div>
    </div>
  );
}

export default DashboardInfo; 