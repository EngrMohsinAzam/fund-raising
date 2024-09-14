import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEthereum } from '../context/EthereumContext';
import { ethers } from 'ethers';

const CampaignDetails = () => {
  const { id } = useParams();
  const { contract } = useEthereum();
  const [campaign, setCampaign] = useState(null);
  const [donationAmount, setDonationAmount] = useState('');

  useEffect(() => {
    const fetchCampaign = async () => {
      if (contract) {
        try {
          const campaignData = await contract.campaigns(id);
          setCampaign(campaignData);
        } catch (error) {
          console.error('Error fetching campaign:', error);
        }
      }
    };

    fetchCampaign();
  }, [contract, id]);

  const handleDonate = async () => {
    if (!contract) {
      alert('Please connect to Ethereum first');
      return;
    }
    try {
      const transaction = await contract.donateToCampaign(id, {
        value: ethers.utils.parseEther(donationAmount),
      });
      await transaction.wait();
      alert('Donation successful!');
    } catch (error) {
      console.error('Error donating:', error);
      alert('Error donating. See console for details.');
    }
  };

  if (!campaign) return <div className="text-center mt-8">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">{campaign.title}</h1>
      <img src={campaign.image} alt={campaign.title} className="w-full h-64 object-cover rounded-lg mb-6" />
      <p className="text-gray-600 mb-4">{campaign.description}</p>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Target</p>
          <p className="text-xl font-semibold">{ethers.utils.formatEther(campaign.target)} ETH</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Collected</p>
          <p className="text-xl font-semibold">{ethers.utils.formatEther(campaign.amountCollected)} ETH</p>
        </div>
      </div>
      <p className="mb-6">Deadline: {new Date(campaign.deadline.toNumber() * 1000).toLocaleDateString()}</p>
      <div className="flex items-center space-x-4">
        <input
          type="number"
          value={donationAmount}
          onChange={(e) => setDonationAmount(e.target.value)}
          placeholder="Amount to donate (ETH)"
          className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleDonate}
          className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 transition-colors duration-300"
        >
          Donate
        </button>
      </div>
    </div>
  );
};

export default CampaignDetails;
