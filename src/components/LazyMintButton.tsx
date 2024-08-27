import {
  Transaction,
  TransactionButton,
  TransactionStatus,
  TransactionStatusAction,
  TransactionStatusLabel,
} from '@coinbase/onchainkit/transaction';
import type {
  TransactionError,
  TransactionResponse,
} from '@coinbase/onchainkit/transaction';
import type { Address, ContractFunctionParameters } from 'viem';
import {
  BASE_SEPOLIA_CHAIN_ID,
  mintContractAddress,
  mintABI,
} from '../constants';
import { useState } from 'react';

type LazyMintButtonParams = {
  metadataURI: string; // Poprawione z metadataUri na metadataURI
  batchSize: number;
  onSuccess: () => void;
  onError: (error: any) => void;
  isDisabled: boolean;
};

export default function LazyMintButton({
  metadataURI,
  batchSize,
  onSuccess,
  onError,
  isDisabled,
}: LazyMintButtonParams) {
  const [hasMinted, setHasMinted] = useState(false);

  const contracts = [
    {
      address: mintContractAddress,
      abi: mintABI,
      functionName: 'lazyMint',
      args: [batchSize, metadataURI, "0x"], // URI metadanych przekazywane jako drugi argument
    },
  ] as unknown as ContractFunctionParameters[];

  const handleError = (err: TransactionError) => {
    console.error('Transaction error:', err);
    setHasMinted(false);
    onError(err);
  };

  const handleSuccess = (response: TransactionResponse) => {
    console.log('Transaction successful', response);
    if (!hasMinted) {
      onSuccess();
      setHasMinted(true);
    }
  };

  return (
    <div className="flex w-[450px]">
      <Transaction
        address={mintContractAddress}
        contracts={contracts}
        className="w-[250px]"
        chainId={BASE_SEPOLIA_CHAIN_ID}
        onError={handleError}
        onSuccess={handleSuccess}
      >
        <TransactionButton
          className="mt-0 mr-auto ml-auto w-[450px] max-w-full text-[white]"
          disabled={isDisabled}
        />
        <TransactionStatus>
          <TransactionStatusLabel />
          <TransactionStatusAction />
        </TransactionStatus>
      </Transaction>
    </div>
  );
}
