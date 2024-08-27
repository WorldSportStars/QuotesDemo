'use client';

import Footer from 'src/components/Footer';
import TransactionWrapper from 'src/components/TransactionWrapper';
import WalletWrapper from 'src/components/WalletWrapper';
import { ONCHAINKIT_LINK } from 'src/links';
import BaseSvg from 'src/svg/BaseSvg';
import { useAccount, useContractRead } from 'wagmi';
import LoginButton from '../components/LoginButton';
import SignupButton from '../components/SignupButton';
import { useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import axios from 'axios';
import { Button, MenuItem, Select } from '@mui/material';
import { ChromePicker } from 'react-color';
import {
  AppContainer,
  Header,
  MainContent,
  ControlPanel,
  PointsContainer,
  ColorPickerPanel,
  QuoteContainer,
  QuoteText,
  CollectButtonContainer,
  NavBar,
  NavLink,
  fonts,
} from './StyledComponents';
import { BASE_SEPOLIA_CHAIN_ID, mintContractAddress, mintABI } from '../constants';

const PINATA_API_KEY = '3b8bed010765358336e4';
const PINATA_API_SECRET = 'ee9c9a55b0f821bf6fd35eb8a4954d0a82c4d80d859b4055e6586851600b27f0';
const UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

export default function Page() {
  const { address } = useAccount();
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('AI');
  const [fontFamily, setFontFamily] = useState(fonts[0]);
  const [effect, setEffect] = useState('none');
  const [bgColor, setBgColor] = useState('#030712');
  const [fontColor, setFontColor] = useState('#ffffff');
  const [points, setPoints] = useState(0);
  const [imageURI, setImageURI] = useState('');
  const [isMinting, setIsMinting] = useState(false);
  const [transactionKey, setTransactionKey] = useState(0);
  const [appBackgroundImage, setAppBackgroundImage] = useState('');  // Tło aplikacji
  const [quoteBackgroundImage, setQuoteBackgroundImage] = useState('');  // Tło ramki cytatu
  const [isCustomBackground, setIsCustomBackground] = useState(false); // Flaga kontroli tła cytatu

  const { data: tokenId } = useContractRead({
    address: mintContractAddress,
    abi: mintABI,
    functionName: 'nextTokenIdToMint',
    chainId: BASE_SEPOLIA_CHAIN_ID,
  });

  const nextTokenId = tokenId ? Number(tokenId) : 1;

  useEffect(() => {
    const storedPoints = localStorage.getItem('userPoints');
    if (storedPoints) {
      setPoints(parseInt(storedPoints, 10));
    }
    fetchAppBackgroundImage(); // Pobierz tło aplikacji przy uruchomieniu
  }, []);

  const fetchAppBackgroundImage = async () => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/photos/random?query=landscape&orientation=landscape&client_id=${UNSPLASH_ACCESS_KEY}`
      );
      setAppBackgroundImage(response.data.urls.regular);  // Ustawienie tła aplikacji
    } catch (error) {
      console.error('Error fetching Unsplash image:', error);
    }
  };

  const fetchQuoteBackgroundImage = async () => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/photos/random?query=nature&orientation=landscape&client_id=${UNSPLASH_ACCESS_KEY}`
      );
      setQuoteBackgroundImage(response.data.urls.regular);  // Ustawienie tła cytatu
      setIsCustomBackground(true);  // Ustawienie flagi na niestandardowe tło
      setEffect('shadow');  // Automatyczne dodanie efektu tła/cienia
    } catch (error) {
      console.error('Error fetching Unsplash image:', error);
    }
  };

  const resetQuoteBackground = () => {
    setIsCustomBackground(false);
    setQuoteBackgroundImage('');
  };

  const handleSuccessMint = () => {
    const pointsToAdd = category === 'AI' ? 25 : 100;
    const updatedPoints = points + pointsToAdd;
    setPoints(updatedPoints);
    localStorage.setItem('userPoints', updatedPoints.toString());

    // Reset klucza transakcji po 5 sekundach
    setTimeout(() => {
      setTransactionKey((prevKey) => prevKey + 1);
    }, 5000);
  };

  const handleMint = async () => {
    setIsMinting(true);

    const element = document.getElementById('quote-container');
    if (element) {
      const scale = 2; // Zwiększenie skali do 2x dla wyższej rozdzielczości
      const canvas = await html2canvas(element, {
        scale,
        useCORS: true, // Użycie CORS, aby upewnić się, że obrazy z zewnętrznych źródeł są ładowane poprawnie
      });
      const dataUrl = canvas.toDataURL('image/png');
      const metadataUri = await uploadToIPFS(dataUrl, nextTokenId);
      setImageURI(metadataUri);
    }

    setIsMinting(false);
  };

  const uploadToIPFS = async (dataUrl: string, tokenId: number) => {
    const blob = await fetch(dataUrl).then((res) => res.blob());
    const formData = new FormData();
    formData.append('file', blob, `quote-${tokenId}.png`);

    try {
      const imageResponse = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
        maxBodyLength: Infinity,
        headers: {
          'Content-Type': 'multipart/form-data',
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_API_SECRET,
        },
      });

      const imageUri = `https://gateway.pinata.cloud/ipfs/${imageResponse.data.IpfsHash}`;

      const metadata = {
        name: `Quote #${tokenId}`,
        description: quote ? `${quote} — ${author}` : 'Generated quote as NFT',
        image: imageUri,
      };

      const metadataFormData = new FormData();
      const metadataBlob = new Blob([JSON.stringify(metadata)], { type: 'application/json' });
      metadataFormData.append('file', metadataBlob, `metadata-${tokenId}.json`);

      const metadataResponse = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', metadataFormData, {
        maxBodyLength: Infinity,
        headers: {
          'Content-Type': 'multipart/form-data',
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_API_SECRET,
        },
      });

      return `https://gateway.pinata.cloud/ipfs/${metadataResponse.data.IpfsHash}`;
    } catch (error) {
      console.error('Error uploading to Pinata:', error);
      throw new Error('Could not upload to Pinata');
    }
  };

  const handleRandomQuote = async () => {
    const endpoint = category === 'AI' ? '' : 'famous-quotes';
    try {
      const response = await axios.get(`https://api.quotable.io/random${endpoint ? `?tags=${endpoint}` : ''}`);
      setQuote(response.data.content);
      setAuthor(category === 'LEGENDARY' ? response.data.author : '');
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  const handleRandomEverything = async () => {
    const categories = ['AI', 'LEGENDARY'];
    const fonts = [
      'Arial',
      'Courier Prime',
      'Georgia',
      'Times New Roman',
      'Verdana',
      'Roboto',
      'Lobster',
      'Montserrat',
      'Pacifico',
      'Playfair Display',
      'Raleway',
      'Inconsolata',
    ];
    const effects = ['none', 'bold', 'italic', 'underline', 'shadow']; // Dodano efekt "shadow"
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
    const randomEffect = effects[Math.floor(Math.random() * effects.length)];
    const randomBgColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    const randomFontColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

    setCategory(randomCategory);
    setFontFamily(randomFont);
    setEffect(randomEffect);
    setBgColor(randomBgColor);
    setFontColor(randomFontColor);

    const endpoint = randomCategory === 'AI' ? '' : 'famous-quotes';
    try {
      const response = await axios.get(`https://api.quotable.io/random${endpoint ? `?tags=${endpoint}` : ''}`);
      setQuote(response.data.content);
      setAuthor(randomCategory === 'LEGENDARY' ? response.data.author : '');
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  return (
    <AppContainer style={{ backgroundImage: `url(${appBackgroundImage})`, backgroundSize: 'cover' }}>
      <Header>
        <div className="flex items-center gap-3">
  <div style={{ transform: 'scale(2)' }}> {/* Powiększenie logo 2x */}
    <BaseSvg />
  </div>
  <a href={ONCHAINKIT_LINK} title="BASE QUOTES" target="_blank" rel="noreferrer">
    <h1
      style={{
        color: '#000', // Czarny kolor tekstu
        fontSize: '2rem',
        fontWeight: 'bold',
        fontFamily: 'Roboto, sans-serif', // Zmieniona czcionka na Roboto
        backgroundColor: 'rgba(255, 255, 255, 0.7)', // Białe półprzezroczyste tło
        padding: '5px 10px',
        borderRadius: '8px',
      }}
    >
      BASE QUOTES
    </h1>
  </a>
</div>

        <NavBar>
          <NavLink href="/">Home</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/features">Features</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </NavBar>
        <div className="flex items-center gap-3">
          <SignupButton />
          {!address && <LoginButton />}
        </div>
      </Header>

      <MainContent>
        <ControlPanel>
          <label>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="border rounded px-4 py-2 mb-4">
            <option value="AI">AI (All)</option>
            <option value="LEGENDARY">LEGENDARY (Famous)</option>
          </select>

          <label>Font</label>
          <select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)} className="border rounded px-4 py-2 mb-4">
            {fonts.map((font) => (
              <option key={font} value={font} style={{ fontFamily: font }}>
                {font}
              </option>
            ))}
          </select>

          <label>Effect</label>
          <select value={effect} onChange={(e) => setEffect(e.target.value)} className="border rounded px-4 py-2 mb-4">
            <option value="none">None</option>
            <option value="bold">Bold</option>
            <option value="italic">Italic</option>
            <option value="underline">Underline</option>
            <option value="shadow">Shadow</option> {/* Nowa opcja dla efektu cienia */}
          </select>

          <Button variant="contained" color="primary" onClick={handleRandomQuote} className="mb-4 w-full">
            Generate Quote
          </Button>
          <Button variant="contained" color="success" onClick={handleRandomEverything} className="w-full mb-4">
            Random Quote
          </Button>

          <PointsContainer>Points: {points}</PointsContainer>

          <Button
            variant="contained"
            color="primary"
            onClick={handleMint}
            disabled={isMinting}
            className="mt-4 w-full mb-4"
          >
            {isMinting ? 'Minting...' : 'Capture Quote & Mint'}
          </Button>

          <Button variant="contained" color="secondary" onClick={fetchQuoteBackgroundImage} className="w-full mb-4">
            Generate Quote Background
          </Button>

          <Button variant="outlined" color="primary" onClick={resetQuoteBackground} className="w-full">
            Reset to Background Color
          </Button>
        </ControlPanel>

        <ColorPickerPanel>
          <h3>Custom Background Color</h3>
          <ChromePicker color={bgColor} onChange={(color: any) => setBgColor(color.hex)} />

          <h3 style={{ marginTop: '20px' }}>Custom Font Color</h3>
          <ChromePicker color={fontColor} onChange={(color: any) => setFontColor(color.hex)} />
        </ColorPickerPanel>

        <div>
          <QuoteContainer
            id="quote-container"
            bgColor={isCustomBackground ? undefined : bgColor}  // Użyj bgColor, gdy nie jest ustawione niestandardowe tło
            style={{
              backgroundImage: isCustomBackground ? `url(${quoteBackgroundImage})` : undefined, // Zastosowanie tła cytatu
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <QuoteText
              fontFamily={fontFamily}
              effect={effect}
              fontColor={fontColor}
              style={
                effect === 'shadow'
                  ? {
                      backgroundColor: 'rgba(255, 255, 255, 0.7)', // Tło półprzezroczyste
                      padding: '10px',
                      borderRadius: '10px',
                    }
                  : {}
              }
            >
              {quote ? `${quote}${author ? ` — ${author}` : ''}` : 'Welcome to DailyQuotes On Base! Generate your quote now!'}
            </QuoteText>
          </QuoteContainer>

          <CollectButtonContainer>
            {address ? (
              <TransactionWrapper
                key={transactionKey} // Dodano klucz transakcji, aby odświeżyć komponent
                address={address as `0x${string}`}
                imageURI={imageURI}
                onSuccessMint={handleSuccessMint} // Pass the callback to update points
              />
            ) : (
              <WalletWrapper className="w-[450px] max-w-full" text="Sign in to collect" />
            )}
          </CollectButtonContainer>
        </div>
      </MainContent>

      <Footer />
    </AppContainer>
  );
}
