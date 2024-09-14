import React from 'react';
import CreateCampaignForm from '../components/CreateCampaignForm';
import { useEthereum } from '../context/EthereumContext';

const CreateCampaign = () => {
  const { account, provider } = useEthereum();

  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Create a New Campaign</h1>
      {!provider ? (
        <p className="text-center text-red-500 mb-4">Please connect to an Ethereum wallet to create a campaign.</p>
      ) : !account ? (
        <p className="text-center text-yellow-500 mb-4">Please connect your account to create a campaign.</p>
      ) : (
        <p className="text-center text-green-500 mb-4">Connected with account: {account}</p>
      )}
      <CreateCampaignForm />
    </div>
  );
};

export default CreateCampaign;