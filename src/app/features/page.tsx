'use client';

import React from 'react';

export default function Features() {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Mint Your Access Pass</h1>
      <iframe
        src="https://embed.ipfscdn.io/ipfs/bafybeigdie2yyiazou7grjowoevmuip6akk33nqb55vrpezqdwfssrxyfy/erc1155.html?contract=0x334F2503Dbb71127a9c584Ec224C117418a495C7&chain=%7B%22name%22%3A%22Base+Sepolia+Testnet%22%2C%22chain%22%3A%22ETH%22%2C%22rpc%22%3A%5B%22https%3A%2F%2F84532.rpc.thirdweb.com%2F%24%7BTHIRDWEB_API_KEY%7D%22%5D%2C%22nativeCurrency%22%3A%7B%22name%22%3A%22Sepolia+Ether%22%2C%22symbol%22%3A%22ETH%22%2C%22decimals%22%3A18%7D%2C%22shortName%22%3A%22basesep%22%2C%22chainId%22%3A84532%2C%22testnet%22%3Atrue%2C%22slug%22%3A%22base-sepolia-testnet%22%2C%22icon%22%3A%7B%22url%22%3A%22ipfs%3A%2F%2FQmaxRoHpxZd8PqccAynherrMznMufG6sdmHZLihkECXmZv%22%2C%22width%22%3A1200%2C%22height%22%3A1200%2C%22format%22%3A%22png%22%7D%7D&clientId=7cb0c0f349bdb33d85201c51514f3f96&tokenId=0&theme=dark&primaryColor=purple"
        width="600px"
        height="600px"
        style={{ maxWidth: '100%', border: 'none' }}
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
}
