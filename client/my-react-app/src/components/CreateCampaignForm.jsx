import React, { useState } from 'react';
import { useEthereum } from '../context/EthereumContext';
import { parseEther } from 'ethers';

const CreateCampaignForm = () => {
  const { contract, account } = useEthereum();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!contract || !account) {
      alert('Please connect to Ethereum first');
      return;
    }
    try {
      const transaction = await contract.createCampaign(
        account,
        formData.title,
        formData.description,
        parseEther(formData.target),
        BigInt(Math.floor(new Date(formData.deadline).getTime() / 1000)), // Convert to BigInt
        formData.image
      );
      await transaction.wait();
      alert('Campaign created successfully!');
      setFormData({
        title: '',
        description: '',
        target: '',
        deadline: '',
        image: '',
      });
    } catch (error) {
      console.error('Error creating campaign:', error);
      alert('Error creating campaign. See console for details.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-4">Create a New Campaign</h2>
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="target" className="block text-gray-700 font-semibold mb-2">
          Target Amount (ETH)
        </label>
        <input
          type="number"
          id="target"
          name="target"
          value={formData.target}
          onChange={handleChange}
          min="0.01" // Ensure target amount starts from 0.01
          step="0.01"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="deadline" className="block text-gray-700 font-semibold mb-2">
          Deadline
        </label>
        <input
          type="date"
          id="deadline"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="image" className="block text-gray-700 font-semibold mb-2">
          Image URL
        </label>
        <input
          type="url"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
      >
        Create Campaign
      </button>
    </form>
  );
};

export default CreateCampaignForm;
