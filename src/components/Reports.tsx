import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Calendar, 
  Filter,
  Search,
  TrendingUp,
  Users,
  Target,
  DollarSign,
  BarChart3,
  PieChart,
  Eye,
  Share2,
  Plus
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';
import { mockReports } from '../data/mockData';
import { AnalysisReport } from '../types';

const Reports: React.FC = () => {
  const [reports, setReports] = useState(mockReports);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReport, setSelectedReport] = useState<AnalysisReport | null>(reports[0] || null);
  const [dateRange, setDateRange] = useState('30d');

  const filteredReports = reports.filter(report =>
    report.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const channelPerformanceData = [
    { name: 'Email', leads: 850, conversions: 45, revenue: 15400 },
    { name: 'Google Ads', leads: 320, conversions: 28, revenue: 12800 },
    { name: 'Meta Ads', leads: 180, conversions: 15, revenue: 8500 },
    { name: 'LinkedIn', leads: 75, conversions: 12, revenue: 9200 }
  ];

  const leadScoreData = [
    { name: 'Hot Leads', value: 85, color: '#EF4444' },
    { name: 'Warm Leads', value: 340, color: '#F97316' },
    { name: 'Cold Leads', value: 1000, color: '#3B82F6' }
  ];

  const generateNewReport = () => {
    const newReport: AnalysisReport = {
      id: `report-${Date.now()}`,
      title: `Analyse Automatique - ${new Date().toLocaleDateString('fr-FR')}`,
      campaignId: '1',
      dateGenerated: new Date().toISOString().split('T')[0],
      summary: {
        totalLeads: 1425,
        hotLeads: 85,
        warmLeads: 340,
        coldLeads: 1000,
        conversionRate: 1.6,
        topPerformingChannels: ['Email', 'LinkedIn']
      },
      recommendations: [
        'Optimiser les heures d\'envoi pour augmenter les taux d\'ouverture',
        'Segmenter davantage les audiences froides pour améliorer l\'engagement',
        'Tester de nouveaux formats de contenu pour les leads warm',
        'Implémenter un système de lead scoring plus granulaire'
      ],
      insights: [
        'Les leads provenant de LinkedIn montrent un taux de conversion 2x supérieur',
        'Les campagnes envoyées en milieu de semaine obtiennent 30% d\'engagement en plus',
        'La personnalisation par secteur d\'activité améliore le taux de réponse de 45%'
      ]
    };

    setReports(prev => [newReport, ...prev]);
    setSelectedReport(newReport);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Rapports d'Analyse</h1>
          <p className="text-gray-600">Analyses automatisées et insights de performance</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={generateNewReport}
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200"
          >
            <Plus className="w-4 h-4" />
            <span>Générer Rapport</span>
          </button>
          <button className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200">
            <Download className="w-4 h-4" />
            <span>Exporter PDF</span>
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
              placeholder="Rechercher un rapport..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="7d">7 derniers jours</option>
            <option value="30d">30 derniers jours</option>
            <option value="90d">90 derniers jours</option>
            <option value="1y">1 an</option>
          </select>

          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
            <option value="all">Toutes les campagnes</option>
            <option value="email">Campagnes Email</option>
            <option value="ads">Campagnes Ads</option>
            <option value="social">Réseaux Sociaux</option>
          </select>

          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <FileText className="w-4 h-4" />
            <span>{filteredReports.length} rapport(s)</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Reports List */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Rapports Disponibles</h3>
            <div className="space-y-3">
              {filteredReports.map((report) => (
                <div
                  key={report.id}
                  onClick={() => setSelectedReport(report)}
                  className={`p-3 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-sm ${
                    selectedReport?.id === report.id ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 text-sm truncate">{report.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{report.dateGenerated}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-600">
                        <span>{report.summary.totalLeads} leads</span>
                        <span>{report.summary.conversionRate}% conv.</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Report Details */}
        <div className="lg:col-span-3 space-y-6">
          {selectedReport ? (
            <>
              {/* Report Header */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{selectedReport.title}</h2>
                    <p className="text-gray-600">Généré le {selectedReport.dateGenerated}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                      <Eye className="w-4 h-4" />
                      <span>Aperçu</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                      <Share2 className="w-4 h-4" />
                      <span>Partager</span>
                    </button>
                    <button className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200">
                      <Download className="w-4 h-4" />
                      <span>Télécharger</span>
                    </button>
                  </div>
                </div>

                {/* Summary Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Users className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-medium text-blue-900">Total Leads</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-900">{selectedReport.summary.totalLeads}</p>
                  </div>

                  <div className="p-4 bg-red-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-red-600" />
                      <span className="text-sm font-medium text-red-900">Hot Leads</span>
                    </div>
                    <p className="text-2xl font-bold text-red-900">{selectedReport.summary.hotLeads}</p>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Target className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium text-green-900">Taux Conversion</span>
                    </div>
                    <p className="text-2xl font-bold text-green-900">{selectedReport.summary.conversionRate}%</p>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <BarChart3 className="w-5 h-5 text-purple-600" />
                      <span className="text-sm font-medium text-purple-900">Top Channel</span>
                    </div>
                    <p className="text-lg font-bold text-purple-900">{selectedReport.summary.topPerformingChannels[0]}</p>
                  </div>
                </div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Channel Performance */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance par Canal</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={channelPerformanceData}>
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
                      <Bar dataKey="leads" fill="#0EA5E9" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="conversions" fill="#10B981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Lead Score Distribution */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribution des Scores</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <RechartsPieChart>
                      <Pie
                        data={leadScoreData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {leadScoreData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Insights & Recommendations */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Key Insights */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Insights Clés</h3>
                  <div className="space-y-4">
                    {selectedReport.insights.map((insight, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                        <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
                        <p className="text-sm text-gray-700">{insight}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommandations</h3>
                  <div className="space-y-4">
                    {selectedReport.recommendations.map((recommendation, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                        <Target className="w-5 h-5 text-green-600 mt-0.5" />
                        <p className="text-sm text-gray-700">{recommendation}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun rapport sélectionné</h3>
              <p className="text-gray-500">Sélectionnez un rapport dans la liste pour voir les détails</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;