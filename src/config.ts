// Determine the base URL depending on the environment (development or production)
export const NEXT_PUBLIC_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://onchain-app-template.vercel.app';

// Your API key from the Coinbase Developer Portal
export const NEXT_PUBLIC_CDP_API_KEY = process.env.NEXT_PUBLIC_CDP_API_KEY;

// Your WalletConnect Project ID
export const NEXT_PUBLIC_WC_PROJECT_ID = process.env.NEXT_PUBLIC_WC_PROJECT_ID;

// Coinbase RPC Endpoint for Base Sepolia
export const NEXT_PUBLIC_COINBASE_RPC_URL = 'https://api.developer.coinbase.com/rpc/v1/base-sepolia/xBG1U6kMNmr66-vfvdQ4aonsy7tr0T_U';
