import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">About Tamweel</h1>
      <p className="text-gray-600 mb-4">
        Welcome to <strong>Tamweel</strong>, the decentralized crowdfunding platform where innovation meets community. At Tamweel, we harness the power of blockchain technology to create a transparent, secure, and empowering environment for funding groundbreaking projects and initiatives.
      </p>
      <h2 className="text-2xl font-semibold mb-2 text-gray-800">Our Vision</h2>
      <p className="text-gray-600 mb-4">
        We envision a world where anyone, anywhere, can bring their ideas to life. By decentralizing the crowdfunding process, we eliminate traditional barriers, ensuring that creators have direct access to resources and support from a global network of backers.
      </p>
      <h2 className="text-2xl font-semibold mb-2 text-gray-800">What Makes Us Unique</h2>
      <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
        <li><strong>Decentralization:</strong> Powered by blockchain technology, Tamweel ensures that all transactions are transparent, secure, and immutable. This decentralized approach removes intermediaries, reducing costs and increasing trust.</li>
        <li><strong>Smart Contracts:</strong> Our platform uses smart contracts to automate funding processes, ensuring that funds are released only when predefined conditions are met. This guarantees that your contributions are used exactly as intended.</li>
        <li><strong>Global Access:</strong> Whether you are a creator seeking funding or a backer looking to support innovative projects, Tamweel connects you with a worldwide community, breaking down geographical boundaries.</li>
      </ul>
      <h2 className="text-2xl font-semibold mb-2 text-gray-800">Our Mission</h2>
      <p className="text-gray-600 mb-4">
        Tamweel's mission is to democratize funding by leveraging decentralized technology to create a fair and open platform. We aim to foster a collaborative ecosystem where creators can bring their visions to life and backers can contribute confidently, knowing their funds are secure and well-managed.
      </p>
      <h2 className="text-2xl font-semibold mb-2 text-gray-800">Features</h2>
      <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
        <li><strong>Transparent Process:</strong> Every transaction is recorded on the blockchain, providing full transparency and accountability. You can track the progress and impact of your contributions in real-time.</li>
        <li><strong>Secure Transactions:</strong> Our platform prioritizes the security of your contributions with advanced encryption and decentralized protocols, ensuring that your funds are protected.</li>
        <li><strong>Community-Driven:</strong> Tamweel is more than just a platform; it's a community of passionate individuals who believe in the power of collective support and innovation.</li>
      </ul>
      <h2 className="text-2xl font-semibold mb-2 text-gray-800">Why Choose Tamweel?</h2>
      <p className="text-gray-600 mb-4">
        By removing intermediaries and using smart contracts, we empower creators and backers alike, ensuring that funds are used efficiently and effectively. With blockchain technology, we provide an unparalleled level of trust and transparency, giving you confidence in every transaction. Tamweel connects you with a diverse and global network of supporters and innovators, expanding your reach and impact.
      </p>
      <p className="text-gray-600 mb-4">
        Join Tamweel today and be part of a decentralized revolution in crowdfunding. Together, we can turn dreams into reality and make a lasting impact on the world.
      </p>
    </div>
  );
};

export default About;
