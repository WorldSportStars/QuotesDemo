import { useState } from 'react';
import axios from 'axios';

export const useAuthNFT = () => {
  const [token, setToken] = useState<string | null>(null);

  const authenticate = async (address: string) => {
    try {
      const response = await axios.post('/api/generate-token', { address });
      setToken(response.data.token);
    } catch (error) {
      console.error('Authentication failed:', error);
    }
  };

  return { token, authenticate };
};
