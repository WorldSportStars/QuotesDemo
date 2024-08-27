import { useEffect, useState } from 'react';
import { useContractRead } from 'wagmi';
import { NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI } from '../constants2';

export const useCheckNFTOwner = (address: string) => {
  const [hasNFT, setHasNFT] = useState(false);
  const [loading, setLoading] = useState(true);

  const { data: balances, isError } = useContractRead({
    address: NFT_CONTRACT_ADDRESS,
    abi: NFT_CONTRACT_ABI,
    functionName: 'balanceOfBatch',
    args: [
      Array(100).fill(address), // Powielenie adresu dla każdego token ID
      Array.from({ length: 100 }, (_, i) => i), // Token IDs od 0 do 99
    ],
  });

  useEffect(() => {
    if (isError) {
      console.error('Error reading contract');
      setHasNFT(false);
      setLoading(false);
    } else if (balances) {
      const ownsNFT = (balances as bigint[]).some((balance: bigint) => balance > 0n);
      setHasNFT(ownsNFT);
      setLoading(false);
    }
  }, [balances, isError]);

  return { hasNFT, loading };
};
