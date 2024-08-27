import React from 'react';
import { useCheckNFTOwner } from '../hooks/useCheckNFTOwner';

interface CheckNFTOwnerProps {
  address: string;
}

const CheckNFTOwner: React.FC<CheckNFTOwnerProps> = ({ address }) => {
  const { hasNFT, loading } = useCheckNFTOwner(address);

  return (
    <div>
      {loading ? (
        <p>Checking NFT ownership...</p>
      ) : hasNFT ? (
        <p>Access granted! You own at least one NFT from the contract.</p>
      ) : (
        <p>Access denied. You do not own any NFTs from the contract.</p>
      )}
    </div>
  );
};

export default CheckNFTOwner;
