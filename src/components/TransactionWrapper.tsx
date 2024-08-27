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

type TransactionWrapperParams = {
  address: Address;
  imageURI: string;
  onSuccessMint: () => void; // Callback for successful mint
  isDisabled?: boolean; 
  buttonClassName?: string;
};

export default function TransactionWrapper({
  address,
  imageURI,
  onSuccessMint,
  isDisabled = false,
  buttonClassName,
}: TransactionWrapperParams) {
  const [hasMinted, setHasMinted] = useState(false);

  const contracts = [
    {
      address: mintContractAddress,
      abi: mintABI,
      functionName: 'mintTo',
      args: [address, imageURI],
    },
  ] as unknown as ContractFunctionParameters[];

  const handleError = (err: TransactionError) => {
    console.error('Transaction error:', err);
    setHasMinted(false); // Reset state on error
  };

  const handleSuccess = (response: TransactionResponse) => {
    console.log('Transaction successful', response);
    if (!hasMinted) {
      onSuccessMint(); // Call the callback after a successful mint
      setHasMinted(true); // Prevent further point additions
    }
  };

  return (
    <div className="flex w-[450px]">
      <Transaction
        address={address}
        contracts={contracts}
        className="w-[250px]"
        chainId={BASE_SEPOLIA_CHAIN_ID}
        onError={handleError}
        onSuccess={handleSuccess}
      >
        <TransactionButton
          className={buttonClassName ? `${buttonClassName} mt-0 mr-auto ml-auto w-[250px] max-w-full text-[white]` : "mt-0 mr-auto ml-auto w-[450px] max-w-full text-[white]"}
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
