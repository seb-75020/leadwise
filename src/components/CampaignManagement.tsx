import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  Square, 
  Edit3, 
  Trash2, 
  Plus,
  Filter,
  Search,
  TrendingUp,
  TrendingDown,
  Mail,
  MousePointer,
  Users,
  DollarSign,
  Calendar,
  ExternalLink,
  BarChart3,
  Download
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockCampaigns } from '../data/mockData';
import { Campaign } from '../types';

const CampaignManagement: React.FC = () => {
  const [campaigns, setCampaigns] = useState(mockCampaigns);
  const [searchTerm, setSearchTerm] = useState('');
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlatform = platformFilter === 'all' || campaign.platform === platformFilter;
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
    
    return matchesSearch && matchesPlatform && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-700 bg-green-100';
      case 'paused': return 'text-yellow-700 bg-yellow-100';
      case 'completed': return 'text-gray-700 bg-gray-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'lemlist':
      case 'brevo':
        return <Mail className="w-5 h-5" />;
      case 'google-ads':
      case 'meta-ads':
        return <MousePointer className="w-5 h-5" />;
      default:
        return <BarChart3 className="w-5 h-5" />;
    }
  };

  const updateCampaignStatus = (campaignId: string, newStatus: 'active' | 'paused' | 'completed') => {
    setCampaigns(prev => prev.map(campaign => 
      campaign.id === campaignId 
        ? { ...campaign, status: newStatus, lastUpdated: new Date().toISOString().split('T')[0] }
        : campaign
    ));
  };

  const performanceData = selectedCampaign ? [
    { name: 'Sem 1', opened: 120, clicked: 25, conversions: 3 },
    { name: 'Sem 2', opened: 150, clicked: 32, conversions: 5 },
    { name: 'Sem 3', opened: 180, clicked: 28, conversions: 4 },
    { name: 'Sem 4', opened: 165, clicked: 35, conversions: 6 },
  ] : [];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestion des Campagnes</h1>
          <p className="text-gray-600">Gérez et optimisez vos campagnes marketing multicanal</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 bg-white text-gray-700 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200">
            <Download className="w-4 h-4" />
            <span>Exporter</span>
          </button>
          <button className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200">
            <Plus className="w-4 h-4" />
            <span>Nouvelle Campagne</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Rechercher une campagne..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">Toutes les plateformes</option>
            <option value="lemlist">Lemlist</option>
            <option value="brevo">Brevo</option>
            <option value="google-ads">Google Ads</option>
            <option value="meta-ads">Meta Ads</option>
            <option value="other">Autre</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">Tous les statuts</option>
            <option value="active">Actif</option>
            <option value="paused">En pause</option>
            <option value="completed">Terminé</option>
          </select>

          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <BarChart3 className="w-4 h-4" />
            <span>{filteredCampaigns.length} campagne(s)</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Campaigns List */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Campagnes Actives</h3>
            <div className="space-y-4">
              {filteredCampaigns.map((campaign) => (
                <div
                  key={campaign.id}
                  onClick={() => setSelectedCampaign(campaign)}
                  className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
                    selectedCampaign?.id === campaign.id ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          {getPlatformIcon(campaign.platform)}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{campaign.name}</h4>
                          <p className="text-sm text-gray-500 capitalize">{campaign.platform}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-4 mb-3">
                        <div>
                          <p className="text-xs text-gray-500">Envoyés</p>
                          <p className="font-medium text-gray-900">{campaign.metrics.sent.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Ouvertures</p>
                          <p className="font-medium text-gray-900">{campaign.metrics.openRate.toFixed(1)}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Clics</p>
                          <p className="font-medium text-gray-900">{campaign.metrics.clickRate.toFixed(1)}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">ROI</p>
                          <p className="font-medium text-green-600">{campaign.metrics.roi}%</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(campaign.status)}`}>
                          {campaign.status === 'active' ? 'Actif' : 
                           campaign.status === 'paused' ? 'En pause' : 'Terminé'}
                        </span>
                        <div className="flex items-center space-x-2">
                          {campaign.status === 'active' && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                updateCampaignStatus(campaign.id, 'paused');
                              }}
                              className="p-1 text-yellow-600 hover:bg-yellow-100 rounded transition-colors duration-150"
                            >
                              <Pause className="w-4 h-4" />
                            </button>
                          )}
                          {campaign.status === 'paused' && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                updateCampaignStatus(campaign.id, 'active');
                              }}
                              className="p-1 text-green-600 hover:bg-green-100 rounded transition-colors duration-150"
                            >
                              <Play className="w-4 h-4" />
                            </button>
                          )}
                          <button className="p-1 text-gray-600 hover:bg-gray-100 rounded transition-colors duration-150">
                            <Edit3 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Campaign Details */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6">
            {selectedCampaign ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Détails de la Campagne</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">{selectedCampaign.name}</h4>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        {getPlatformIcon(selectedCampaign.platform)}
                        <span className="capitalize">{selectedCampaign.platform}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Créée le</p>
                        <p className="font-medium text-gray-900">{selectedCampaign.dateCreated}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Mise à jour</p>
                        <p className="font-medium text-gray-900">{selectedCampaign.lastUpdated}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key Metrics */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Métriques Clés</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-900">Envoyés</span>
                      </div>
                      <p className="text-lg font-bold text-blue-900 mt-1">
                        {selectedCampaign.metrics.sent.toLocaleString()}
                      </p>
                    </div>
                    
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-900">Conversions</span>
                      </div>
                      <p className="text-lg font-bold text-green-900 mt-1">
                        {selectedCampaign.metrics.conversions}
                      </p>
                    </div>

                    <div className="p-3 bg-purple-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-medium text-purple-900">Revenus</span>
                      </div>
                      <p className="text-lg font-bold text-purple-900 mt-1">
                        {selectedCampaign.metrics.revenue.toLocaleString()}€
                      </p>
                    </div>

                    <div className="p-3 bg-orange-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <BarChart3 className="w-4 h-4 text-orange-600" />
                        <span className="text-sm font-medium text-orange-900">ROI</span>
                      </div>
                      <p className="text-lg font-bold text-orange-900 mt-1">
                        {selectedCampaign.metrics.roi}%
                      </p>
                    </div>
                  </div>
                </div>

                {/* Performance Chart */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Performance Hebdomadaire</h4>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="name" stroke="#6B7280" />
                      <YAxis stroke="#6B7280" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #E5E7EB',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Line type="monotone" dataKey="opened" stroke="#0EA5E9" strokeWidth={2} />
                      <Line type="monotone" dataKey="clicked" stroke="#10B981" strokeWidth={2} />
                      <Line type="monotone" dataKey="conversions" stroke="#F59E0B" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 bg-primary-600 text-white py-2 px-3 rounded-lg hover:bg-primary-700 transition-colors duration-200 text-sm">
                    Voir Détails
                  </button>
                  <button className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm">
                    Dupliquer
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Sélectionnez une campagne pour voir les détails</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignManagement;