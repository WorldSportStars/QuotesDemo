'use client';

import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  coinbaseWallet,
  metaMaskWallet,
  rainbowWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { useMemo } from 'react';
import { http, createConfig } from 'wagmi';
import { baseSepolia } from 'wagmi/chains';

// Import zmiennych środowiskowych
const NEXT_PUBLIC_COINBASE_RPC_URL = process.env.NEXT_PUBLIC_COINBASE_RPC_URL ?? '';

export function useWagmiConfig() {
  const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID ?? '';
  if (!projectId) {
    const providerErrMessage =
      'To connect to all Wallets you need to provide a NEXT_PUBLIC_WC_PROJECT_ID env variable';
    throw new Error(providerErrMessage);
  }

  return useMemo(() => {
    const connectors = connectorsForWallets(
      [
        {
          groupName: 'Recommended Wallet',
          wallets: [coinbaseWallet],
        },
        {
          groupName: 'Other Wallets',
          wallets: [rainbowWallet, metaMaskWallet],
        },
      ],
      {
        appName: 'onchainkit',
        projectId,
      },
    );

    const wagmiConfig = createConfig({
      chains: [
        {
          ...baseSepolia,
          rpcUrls: {
            default: {
              http: [NEXT_PUBLIC_COINBASE_RPC_URL],
            },
          },
        },
      ],
      connectors,
      ssr: true,
      transports: {
        [baseSepolia.id]: http(NEXT_PUBLIC_COINBASE_RPC_URL),
      },
    });

    return wagmiConfig;
  }, [projectId]);
}
