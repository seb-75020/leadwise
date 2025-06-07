import React from 'react';
import { 
  TrendingUp, 
  Users, 
  Mail, 
  Target, 
  Download,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { mockCampaigns, mockLeads } from '../data/mockData';

const Dashboard: React.FC = () => {
  const totalLeads = mockLeads.length;
  const hotLeads = mockLeads.filter(lead => lead.score === 'hot').length;
  const warmLeads = mockLeads.filter(lead => lead.score === 'warm').length;
  const coldLeads = mockLeads.filter(lead => lead.score === 'cold').length;

  const totalMetrics = mockCampaigns.reduce((acc, campaign) => ({
    sent: acc.sent + campaign.metrics.sent,
    opened: acc.opened + campaign.metrics.opened,
    clicked: acc.clicked + campaign.metrics.clicked,
    conversions: acc.conversions + campaign.metrics.conversions,
    revenue: acc.revenue + campaign.metrics.revenue,
    cost: acc.cost + campaign.metrics.cost
  }), { sent: 0, opened: 0, clicked: 0, conversions: 0, revenue: 0, cost: 0 });

  const performanceData = [
    { name: 'Lun', ouvertures: 120, clics: 25, conversions: 3 },
    { name: 'Mar', ouvertures: 150, clics: 32, conversions: 5 },
    { name: 'Mer', ouvertures: 180, clics: 28, conversions: 4 },
    { name: 'Jeu', ouvertures: 165, clics: 35, conversions: 6 },
    { name: 'Ven', ouvertures: 140, clics: 22, conversions: 2 },
    { name: 'Sam', ouvertures: 90, clics: 15, conversions: 1 },
    { name: 'Dim', ouvertures: 70, clics: 12, conversions: 1 }
  ];

  const leadScoreData = [
    { name: 'Hot Leads', value: hotLeads, color: '#EF4444' },
    { name: 'Warm Leads', value: warmLeads, color: '#F97316' },
    { name: 'Cold Leads', value: coldLeads, color: '#3B82F6' }
  ];

  const StatCard: React.FC<{
    title: string;
    value: string | number;
    subtitle?: string;
    icon: React.ReactNode;
    trend?: 'up' | 'down';
    trendValue?: string;
    color?: string;
  }> = ({ title, value, subtitle, icon, trend, trendValue, color = 'primary' }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className={`text-2xl font-bold text-${color}-600 mb-1`}>{value}</p>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
          {trend && trendValue && (
            <div className={`flex items-center mt-2 text-sm ${
              trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {trend === 'up' ? (
                <ArrowUpRight className="w-4 h-4 mr-1" />
              ) : (
                <ArrowDownRight className="w-4 h-4 mr-1" />
              )}
              <span>{trendValue}</span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 bg-${color}-100 rounded-lg flex items-center justify-center`}>
          {icon}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Vue d'ensemble de vos performances marketing</p>
        </div>
        <button className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200">
          <Download className="w-4 h-4" />
          <span>Télécharger Rapport</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Leads"
          value={totalLeads}
          icon={<Users className="w-6 h-6 text-primary-600" />}
          trend="up"
          trendValue="+12% ce mois"
        />
        <StatCard
          title="Taux de Conversion"
          value={`${((totalMetrics.conversions / totalMetrics.sent) * 100).toFixed(1)}%`}
          icon={<Target className="w-6 h-6 text-green-600" />}
          trend="up"
          trendValue="+0.3% vs mois dernier"
          color="green"
        />
        <StatCard
          title="Revenus Générés"
          value={`${totalMetrics.revenue.toLocaleString()}€`}
          icon={<TrendingUp className="w-6 h-6 text-blue-600" />}
          trend="up"
          trendValue="+18% ce mois"
          color="blue"
        />
        <StatCard
          title="ROI Moyen"
          value={`${Math.round(((totalMetrics.revenue - totalMetrics.cost) / totalMetrics.cost) * 100)}%`}
          icon={<Mail className="w-6 h-6 text-purple-600" />}
          trend="up"
          trendValue="+25% ce mois"
          color="purple"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Performance Hebdomadaire</h3>
            <div className="flex space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                <span className="text-gray-600">Ouvertures</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">Clics</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-gray-600">Conversions</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
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
              <Line type="monotone" dataKey="ouvertures" stroke="#0EA5E9" strokeWidth={2} dot={{ fill: '#0EA5E9', strokeWidth: 2, r: 4 }} />
              <Line type="monotone" dataKey="clics" stroke="#10B981" strokeWidth={2} dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }} />
              <Line type="monotone" dataKey="conversions" stroke="#F59E0B" strokeWidth={2} dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Lead Score Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Répartition des Leads</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
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
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-6 space-y-3">
            {leadScoreData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Campaigns */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Campagnes Récentes</h3>
          <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
            Voir tout
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-600">Campagne</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Plateforme</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Taux Ouverture</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Conversions</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">ROI</th>
              </tr>
            </thead>
            <tbody>
              {mockCampaigns.map((campaign) => (
                <tr key={campaign.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{campaign.name}</p>
                      <p className="text-sm text-gray-500">{campaign.dateCreated}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="capitalize text-gray-700">{campaign.platform}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      campaign.status === 'active' 
                        ? 'bg-green-100 text-green-800'
                        : campaign.status === 'paused'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {campaign.status === 'active' ? 'Actif' : 
                       campaign.status === 'paused' ? 'En pause' : 'Terminé'}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-medium text-gray-900">
                    {campaign.metrics.openRate.toFixed(1)}%
                  </td>
                  <td className="py-4 px-4 font-medium text-gray-900">
                    {campaign.metrics.conversions}
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-medium text-green-600">
                      {campaign.metrics.roi}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;