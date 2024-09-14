import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { EthereumProvider } from './context/EthereumContext';

import Home from './pages/Home';
import About from './pages/About';
import CreateCampaign from './pages/CreateCampaign';
import CampaignDetails from './pages/CampaignDetails';

function App() {
  return (
    <EthereumProvider>
      <Router>
        <div className="min-h-screen bg-gray-100 flex flex-col">
          <nav className="bg-white shadow-md">
            <div className="container mx-auto px-6 py-3">
              <div className="flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-black">𝓣𝓪𝓶𝔀𝓮𝓮𝓵</Link>
                <div className="space-x-4">
                  <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Home</Link>
                  <Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">About</Link>
                  <Link 
                    to="/create" 
                    className="bg-black text-white px-4 py-2 rounded hover:bg-white hover:text-blue transition-colors duration-300"
                  >
                    Create Campaign
                  </Link>
                </div>
              </div>
            </div>
          </nav>
          <main className="container mx-auto px-4 py-8 flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/create" element={<CreateCampaign />} />
              <Route path="/campaign/:id" element={<CampaignDetails />} />
            </Routes>
          </main>
          <footer className="bg-white shadow-md mt-auto">
            <div className="container mx-auto px-6 py-8">
              <div className="flex flex-col items-center">
                <img src="/Tamweel.jpg" alt="Tamweel Logo" className="h-16 mb-4" />
                <div className="text-gray-600 text-center">
                  <p className="font-bold">© 2024 Tamweel. All rights reserved.</p>
                  <p>Email: <a href="mailto:azammohsin816@gmail.com" className="text-blue-500 hover:underline">azammohsin816@gmail.com</a></p>
                  <p>Phone: <a href="tel:03118363591" className="text-blue-500 hover:underline">03118363591</a></p>
                </div>
                <div className="flex space-x-4 mt-4">
                  <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Home</Link>
                  <Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">About</Link>
                  <Link to="/create" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Create Campaign</Link>
                </div>
              </div> 
            </div>
          </footer>
        </div>
      </Router>
    </EthereumProvider>
  );
}

export default App;
