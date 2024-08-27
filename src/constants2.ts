// src/constants2.ts

export const BASE_SEPOLIA_CHAIN_ID = 84532;

export const TOKEN_ID = 0;

export const NFT_CONTRACT_ADDRESS = '0xd6076Fa3ca47F423d460CC4A81EdfEB6417BBb27';

export const NFT_CONTRACT_ABI = [
  {
    inputs: [
      { internalType: 'address', name: 'account', type: 'address' },
      { internalType: 'uint256', name: 'id', type: 'uint256' },
    ],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'nextTokenIdToMint',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'isApprovedForAll',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_tokenId', type: 'uint256' }],
    name: 'getClaimConditionById',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'startTimestamp', type: 'uint256' },
          { internalType: 'uint256', name: 'maxClaimableSupply', type: 'uint256' },
          { internalType: 'uint256', name: 'supplyClaimed', type: 'uint256' },
          { internalType: 'uint256', name: 'quantityLimitPerWallet', type: 'uint256' },
          { internalType: 'bytes32', name: 'merkleRoot', type: 'bytes32' },
          { internalType: 'uint256', name: 'pricePerToken', type: 'uint256' },
          { internalType: 'address', name: 'currency', type: 'address' },
          { internalType: 'string', name: 'metadata', type: 'string' },
        ],
        internalType: 'struct IClaimCondition.ClaimCondition',
        name: 'condition',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  // Add remaining functions from the ABI as needed
];
