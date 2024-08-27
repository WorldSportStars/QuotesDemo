require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const { ethers } = require('ethers');

const app = express();
const PORT = process.env.PORT || 5000;

// Konfiguracja kontraktu
const NFT_CONTRACT_ADDRESS = '0xC5634a5e3784F3BeD9693fD874302249CFB6e158';
const NFT_CONTRACT_ABI = [/* ABI kontraktu */];
const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const contract = new ethers.Contract(NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI, provider);

// Middleware do parsowania JSON
app.use(express.json());

// Endpoint do generowania JWT
app.post('/api/generate-token', async (req, res) => {
  const { address } = req.body;

  try {
    // Sprawdzenie, czy użytkownik posiada NFT
    const balance = await contract.balanceOf(address);
    if (balance.toNumber() > 0) {
      // Generowanie tokenu JWT
      const token = jwt.sign({ address }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ message: 'No NFT found' });
    }
  } catch (error) {
    console.error('Error checking NFT ownership:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
