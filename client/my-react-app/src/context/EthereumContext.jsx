import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';

// Import the ABI of your contract
import CrowdFundingABI from '../contract/CrowdFunding.json'; // Adjust the path as needed

const EthereumContext = createContext();

// Replace with your deployed contract address
const CONTRACT_ADDRESS = '0x2ef344e39b5391314d90e9c25ca5efadf014d91f';

export function EthereumProvider({ children }) {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);

  const init = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        // Create provider
        const provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(provider);

        // Get signer
        const signer = await provider.getSigner();
        setSigner(signer);

        // Get account
        const account = await signer.getAddress();
        setAccount(account);

        // Initialize the contract
        const crowdFundingContract = new ethers.Contract(CONTRACT_ADDRESS, CrowdFundingABI.abi, signer);
        setContract(crowdFundingContract);
      } catch (error) {
        console.error('Failed to connect to Ethereum:', error);
      }
    } else {
      console.log('Please install MetaMask!');
    }
  };

  useEffect(() => {
    init();

    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          init(); // Reinitialize the connection
        } else {
          setAccount(null);
          setSigner(null);
          setContract(null);
        }
      });
    }

    return () => {
      // Remove listener when the component unmounts
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', init);
      }
    };
  }, []);

  return (
    <EthereumContext.Provider value={{ provider, signer, account, contract }}>
      {children}
    </EthereumContext.Provider>
  );
}

export function useEthereum() {
  return useContext(EthereumContext);
}