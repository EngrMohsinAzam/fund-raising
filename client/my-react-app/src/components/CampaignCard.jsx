import React, { useState, useEffect } from 'react';
import { formatEther, parseEther } from 'ethers';
import { useEthereum } from '../context/EthereumContext';

const CampaignCard = ({ campaign, id, onUpdate }) => {
  const { contract, account } = useEthereum();
  const [donationAmount, setDonationAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [remainingDays, setRemainingDays] = useState(0);
  const [isEnded, setIsEnded] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    const calculateRemainingDays = () => {
      const now = BigInt(Math.floor(Date.now() / 1000));
      const deadline = BigInt(campaign.deadline);
      const timeLeft = deadline - now;
      const daysLeft = Number(timeLeft / BigInt(60 * 60 * 24));
      setRemainingDays(Math.max(Math.ceil(daysLeft), 0));
    };

    const checkCampaignStatus = () => {
      const targetReached = campaign.amountCollected >= campaign.target;
      setIsEnded(remainingDays <= 0 || targetReached);
    };

    calculateRemainingDays();
    checkCampaignStatus();

    const interval = setInterval(() => {
      calculateRemainingDays();
      checkCampaignStatus();
    }, 60 * 60 * 1000); // Update every hour

    return () => clearInterval(interval);
  }, [campaign.deadline, campaign.amountCollected, campaign.target, remainingDays]);

  const handleDonate = async (e) => {
    e.preventDefault();
    if (!contract || !account) {
      alert('Please connect your wallet to donate.');
      return;
    }

    if (!donationAmount || parseFloat(donationAmount) <= 0) {
      alert('Please enter a valid donation amount.');
      return;
    }

    setIsLoading(true);
    try {
      const tx = await contract.donateToCampaign(id, {
        value: parseEther(donationAmount)
      });
      await tx.wait();
      alert('Donation successful!');
      setDonationAmount('');
      onUpdate(); // Trigger update in parent component
    } catch (error) {
      console.error('Error donating:', error);
      alert('Error donating. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 max-w-xs">
      <img src={campaign.image} alt={campaign.title} className="w-full h-32 object-cover" />
      <div className="p-3">
        <h2 className="text-lg font-semibold mb-2 text-gray-800">{campaign.title}</h2>
        <div className="mb-3">
          <p className={`text-gray-600 ${showFullDescription ? '' : 'line-clamp-2'}`}>
            {campaign.description}
          </p>
          <button
            onClick={toggleDescription}
            className="text-blue-500 hover:text-blue-700 mt-1 text-xs px-2 py-1 focus:outline-none"
          >
            {showFullDescription ? 'Show Less' : 'Read More'}
          </button>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-700 mb-2">
          <p>Target: {formatEther(campaign.target)} ETH</p>
          <p>Collected: {formatEther(campaign.amountCollected)} ETH</p>
        </div>
        {!isEnded ? (
          <p className="text-sm text-gray-700 mb-3">
            {remainingDays} days remaining
          </p>
        ) : (
          <p className="text-sm text-gray-700 mb-3">
            Campaign ended
          </p>
        )}
        {!isEnded ? (
          <form onSubmit={handleDonate} className="mb-3">
            <div className="flex items-center">
              <input
                type="number"
                step="0.01"
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
                placeholder="Amount in ETH"
                className="flex-grow mr-2 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={isLoading}
                className={`bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 transition-colors duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isLoading ? 'Donating...' : 'Donate'}
              </button>
            </div>
          </form>
        ) : (
          <p className="text-sm text-gray-700">
            This campaign has ended. No more donations can be accepted.
          </p>
        )}
      </div>
    </div>
  );
};

export default CampaignCard;
