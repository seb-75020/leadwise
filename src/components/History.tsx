import React, { useState } from 'react';
import { 
  History as HistoryIcon, 
  Search, 
  Filter, 
  Calendar,
  Download,
  Eye,
  Trash2,
  FileText,
  Upload,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle,
  RefreshCw
} from 'lucide-react';

interface HistoryItem {
  id: string;
  type: 'upload' | 'analysis' | 'report' | 'campaign';
  title: string;
  description: string;
  date: string;
  time: string;
  status: 'completed' | 'processing' | 'error';
  details?: any;
}

const History: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('30d');

  const historyItems: HistoryItem[] = [
    {
      id: '1',
      type: 'upload',
      title: 'Import fichier Lemlist',
      description: 'lemlist_campaign_report_dec2024.csv',
      date: '2024-12-15',
      time: '14:32',
      status: 'completed',
      details: { fileSize: '2.3 MB', recordsProcessed: 1425 }
    },
    {
      id: '2',
      type: 'analysis',
      title: 'Analyse automatique Q4 2024',
      description: 'Analyse des performances campagne email',
      date: '2024-12-15',
      time: '14:35',
      status: 'completed',
      details: { leadsAnalyzed: 1425, insights: 8, recommendations: 4 }
    },
    {
      id: '3',
      type: 'report',
      title: 'Génération rapport PDF',
      description: 'Rapport complet campagne Q4 2024',
      date: '2024-12-15',
      time: '14:40',
      status: 'completed',
      details: { pages: 12, charts: 6, fileSize: '1.8 MB' }
    },
    {
      id: '4',
      type: 'upload',
      title: 'Import Google Ads',
      description: 'google_ads_performance_nov2024.pdf',
      date: '2024-12-10',
      time: '09:15',
      status: 'completed',
      details: { fileSize: '856 KB', recordsProcessed: 320 }
    },
    {
      id: '5',
      type: 'campaign',
      title: 'Création campagne',
      description: 'Nouvelle campagne Email B2B SaaS',
      date: '2024-12-08',
      time: '16:20',
      status: 'completed',
      details: { targetAudience: 2500, segments: 3 }
    },
    {
      id: '6',
      type: 'analysis',
      title: 'Scoring des leads',
      description: 'Mise à jour automatique des scores',
      date: '2024-12-05',
      time: '02:00',
      status: 'processing',
      details: { leadsProcessed: 850, estimated: '5 min restantes' }
    },
    {
      id: '7',
      type: 'upload',
      title: 'Import Meta Ads',
      description: 'meta_ads_analytics_oct2024.csv',
      date: '2024-12-01',
      time: '11:45',
      status: 'error',
      details: { error: 'Format de fichier incompatible', solution: 'Vérifier le format CSV' }
    }
  ];

  const filteredItems = historyItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    
    return matchesSearch && matchesType;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'upload': return <Upload className="w-5 h-5 text-blue-600" />;
      case 'analysis': return <BarChart3 className="w-5 h-5 text-green-600" />;
      case 'report': return <FileText className="w-5 h-5 text-purple-600" />;
      case 'campaign': return <Eye className="w-5 h-5 text-orange-600" />;
      default: return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'upload': return 'Import';
      case 'analysis': return 'Analyse';
      case 'report': return 'Rapport';
      case 'campaign': return 'Campagne';
      default: return 'Action';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'processing': return <RefreshCw className="w-4 h-4 text-yellow-500 animate-spin" />;
      case 'error': return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Terminé';
      case 'processing': return 'En cours';
      case 'error': return 'Erreur';
      default: return 'En attente';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-700 bg-green-100';
      case 'processing': return 'text-yellow-700 bg-yellow-100';
      case 'error': return 'text-red-700 bg-red-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Historique des Actions</h1>
          <p className="text-gray-600">Consultez l'historique complet de vos activités</p>
        </div>
        <button className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200">
          <Download className="w-4 h-4" />
          <span>Exporter Historique</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Rechercher dans l'historique..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">Tous les types</option>
            <option value="upload">Imports</option>
            <option value="analysis">Analyses</option>
            <option value="report">Rapports</option>
            <option value="campaign">Campagnes</option>
          </select>

          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="7d">7 derniers jours</option>
            <option value="30d">30 derniers jours</option>
            <option value="90d">90 derniers jours</option>
            <option value="1y">1 an</option>
          </select>

          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <HistoryIcon className="w-4 h-4" />
            <span>{filteredItems.length} action(s)</span>
          </div>
        </div>
      </div>

      {/* History Items */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Activités Récentes</h3>
          
          <div className="space-y-4">
            {filteredItems.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      {getTypeIcon(item.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-medium text-gray-900">{item.title}</h4>
                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                          {getTypeLabel(item.type)}
                        </span>
                        <span className={`inline-flex items-center space-x-1 text-xs px-2 py-1 rounded-full ${getStatusColor(item.status)}`}>
                          {getStatusIcon(item.status)}
                          <span>{getStatusText(item.status)}</span>
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                      
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{item.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{item.time}</span>
                        </div>
                      </div>

                      {/* Details */}
                      {item.details && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                            {Object.entries(item.details).map(([key, value]) => (
                              <div key={key}>
                                <span className="text-gray-500 capitalize">{key}:</span>
                                <span className="ml-1 font-medium text-gray-700">{value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    {item.status === 'completed' && (
                      <>
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors duration-150">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded transition-colors duration-150">
                          <Download className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    {item.status === 'error' && (
                      <button className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded transition-colors duration-150">
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    )}
                    <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors duration-150">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-8">
              <HistoryIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Aucune activité trouvée pour les critères sélectionnés</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;