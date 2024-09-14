import React, { useEffect, useState } from 'react';
import { useEthereum } from '../context/EthereumContext';
import CampaignCard from '../components/CampaignCard';

const Home = () => {
  const { contract } = useEthereum();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCampaigns, setTotalCampaigns] = useState(0);

  useEffect(() => {
    const fetchCampaigns = async () => {
      if (contract) {
        try {
          console.log("Fetching campaigns...");
          setLoading(true);
          let allCampaigns = await contract.getCampaigns();
          console.log("Campaigns fetched:", allCampaigns);
          
          setCampaigns(allCampaigns);
          setTotalCampaigns(allCampaigns.length);
        } catch (error) {
          console.error('Error fetching campaigns:', error);
          setError("Failed to load campaigns. Please try again.");
        } finally {
          setLoading(false);
        }
      } else {
        console.log("Contract not available");
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, [contract]);

  // Sort campaigns by timestamp in descending order (newest first)
  const sortedCampaigns = [...campaigns].sort((a, b) => b.timestamp - a.timestamp);

  if (loading) {
    return <div className="text-center py-8 text-black">Loading campaigns...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="debug-layout w-full min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">Active Campaigns</h1>
        <p className="text-center text-gray-600 mb-8">Total Campaigns Created: {totalCampaigns}</p>
        {sortedCampaigns.length === 0 ? (
          <p className="text-center text-gray-600">No active campaigns at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedCampaigns.map((campaign, index) => (
              <CampaignCard key={campaign.id || index} campaign={campaign} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
