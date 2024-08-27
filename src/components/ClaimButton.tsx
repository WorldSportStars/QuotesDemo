import { ConnectWallet, Web3Button, useAddress } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const address = useAddress(); // To fetch the current user's wallet address

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Web3Button
          contractAddress="0xC5634a5e3784F3BeD9693fD874302249CFB6e158"
          action={(contract) => contract.erc721.claim(1)}
          onSuccess={() => alert("NFT claimed!")}
          onError={(error) => alert(`Claim failed: ${error.message}`)}
        >
          Claim NFT
        </Web3Button>
      </main>
    </div>
  );
};

export default Home;
