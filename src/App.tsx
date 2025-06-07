import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import FileUpload from './components/FileUpload';
import LeadManagement from './components/LeadManagement';
import CampaignManagement from './components/CampaignManagement';
import Reports from './components/Reports';
import History from './components/History';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'upload':
        return <FileUpload />;
      case 'leads':
        return <LeadManagement />;
      case 'campaigns':
        return <CampaignManagement />;
      case 'reports':
        return <Reports />;
      case 'history':
        return <History />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Navigation */}
      <div className="w-64 flex-shrink-0">
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <main className="h-full overflow-y-auto">
          <div className="p-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;