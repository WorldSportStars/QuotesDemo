import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

const QuoteContainer = styled.div<{ bgImage: string }>`
  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  background-position: center;
  padding: 20px;
  text-align: center;
  color: #fff;
  border-radius: 10px;
  max-width: 600px;
  margin: 0 auto;
  position: relative;
`;

const QuoteText = styled.h1<{ fontFamily: string }>`
  font-family: ${(props) => props.fontFamily};
  font-size: 2rem;
  background-color: rgba(255, 255, 255, 0.7); // Biały przeźroczysty cień/tło
  padding: 10px;
  border-radius: 5px;
  display: inline-block;
  max-width: 100%;
`;

const AuthorText = styled.p`
  font-size: 1.2rem;
  margin-top: 10px;
  background-color: rgba(255, 255, 255, 0.7); // Biały przeźroczysty cień/tło
  padding: 5px;
  border-radius: 5px;
  display: inline-block;
  max-width: 100%;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  &:hover {
    background-color: #0056b3;
  }
`;

const SuperQuotes: React.FC = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [bgImage, setBgImage] = useState('');
  const [fontFamily, setFontFamily] = useState('Arial');

  useEffect(() => {
    fetchBackgroundImage();
    fetchRandomQuote();
  }, []);

  const fetchBackgroundImage = async () => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/photos/random?query=nature&orientation=landscape&client_id=${UNSPLASH_ACCESS_KEY}`
      );
      setBgImage(response.data.urls.regular);
    } catch (error) {
      console.error('Error fetching Unsplash image:', error);
    }
  };

  const fetchRandomQuote = async () => {
    try {
      const response = await axios.get('https://api.quotable.io/random');
      setQuote(response.data.content);
      setAuthor(response.data.author);
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  return (
    <QuoteContainer bgImage={bgImage}>
      <QuoteText fontFamily={fontFamily}>
        {quote}
      </QuoteText>
      {author && <AuthorText>— {author}</AuthorText>}
      <Button onClick={fetchBackgroundImage}>Generate New Background</Button>
    </QuoteContainer>
  );
};

export default SuperQuotes;
