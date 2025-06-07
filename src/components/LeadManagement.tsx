import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Mail, 
  Phone, 
  Calendar, 
  ExternalLink,
  Download,
  Star,
  Clock,
  ChevronDown,
  Eye,
  Tag
} from 'lucide-react';
import { mockLeads } from '../data/mockData';
import { Lead, LeadScore, LeadStatus } from '../types';

const LeadManagement: React.FC = () => {
  const [leads, setLeads] = useState(mockLeads);
  const [searchTerm, setSearchTerm] = useState('');
  const [scoreFilter, setScoreFilter] = useState<LeadScore | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'all'>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.company?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesScore = scoreFilter === 'all' || lead.score === scoreFilter;
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    
    return matchesSearch && matchesScore && matchesStatus;
  });

  const getScoreColor = (score: LeadScore) => {
    switch (score) {
      case 'hot': return 'text-red-600 bg-red-100';
      case 'warm': return 'text-orange-600 bg-orange-100';
      case 'cold': return 'text-blue-600 bg-blue-100';
    }
  };

  const getStatusColor = (status: LeadStatus) => {
    switch (status) {
      case 'new': return 'text-gray-600 bg-gray-100';
      case 'contacted': return 'text-blue-600 bg-blue-100';
      case 'engaged': return 'text-yellow-600 bg-yellow-100';
      case 'qualified': return 'text-green-600 bg-green-100';
      case 'converted': return 'text-purple-600 bg-purple-100';
      case 'lost': return 'text-red-600 bg-red-100';
    }
  };

  const getInteractionIcon = (type: string) => {
    switch (type) {
      case 'email_sent': return <Mail className="w-4 h-4 text-blue-500" />;
      case 'email_opened': return <Eye className="w-4 h-4 text-green-500" />;
      case 'link_clicked': return <ExternalLink className="w-4 h-4 text-orange-500" />;
      case 'reply_received': return <Mail className="w-4 h-4 text-purple-500" />;
      case 'call_made': return <Phone className="w-4 h-4 text-blue-500" />;
      case 'meeting_scheduled': return <Calendar className="w-4 h-4 text-green-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getInteractionLabel = (type: string) => {
    switch (type) {
      case 'email_sent': return 'Email envoyé';
      case 'email_opened': return 'Email ouvert';
      case 'link_clicked': return 'Lien cliqué';
      case 'reply_received': return 'Réponse reçue';
      case 'call_made': return 'Appel effectué';
      case 'meeting_scheduled': return 'RDV planifié';
      default: return 'Interaction';
    }
  };

  const updateLeadStatus = (leadId: string, newStatus: LeadStatus) => {
    setLeads(prev => prev.map(lead => 
      lead.id === leadId ? { ...lead, status: newStatus } : lead
    ));
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  const updateLeadScore = (leadId: string, newScore: LeadScore) => {
    setLeads(prev => prev.map(lead => 
      lead.id === leadId ? { ...lead, score: newScore } : lead
    ));
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead(prev => prev ? { ...prev, score: newScore } : null);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestion des Leads</h1>
          <p className="text-gray-600">Gérez et analysez vos leads avec scoring intelligent</p>
        </div>
        <button className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200">
          <Download className="w-4 h-4" />
          <span>Exporter CSV</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Rechercher un lead..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={scoreFilter}
            onChange={(e) => setScoreFilter(e.target.value as LeadScore | 'all')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">Tous les scores</option>
            <option value="hot">Hot Leads</option>
            <option value="warm">Warm Leads</option>
            <option value="cold">Cold Leads</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as LeadStatus | 'all')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">Tous les statuts</option>
            <option value="new">Nouveau</option>
            <option value="contacted">Contacté</option>
            <option value="engaged">Engagé</option>
            <option value="qualified">Qualifié</option>
            <option value="converted">Converti</option>
            <option value="lost">Perdu</option>
          </select>

          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Users className="w-4 h-4" />
            <span>{filteredLeads.length} lead(s)</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leads List */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Liste des Leads</h3>
            <div className="space-y-3">
              {filteredLeads.map((lead) => (
                <div
                  key={lead.id}
                  onClick={() => setSelectedLead(lead)}
                  className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
                    selectedLead?.id === lead.id ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div>
                          <p className="font-medium text-gray-900">
                            {lead.firstName} {lead.lastName}
                          </p>
                          <p className="text-sm text-gray-500">{lead.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm text-gray-600">{lead.company}</span>
                        <span className="text-gray-300">•</span>
                        <span className="text-sm text-gray-600">{lead.position}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getScoreColor(lead.score)}`}>
                          {lead.score.toUpperCase()}
                        </span>
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(lead.status)}`}>
                          {lead.status === 'new' ? 'Nouveau' : 
                           lead.status === 'contacted' ? 'Contacté' :
                           lead.status === 'engaged' ? 'Engagé' :
                           lead.status === 'qualified' ? 'Qualifié' :
                           lead.status === 'converted' ? 'Converti' : 'Perdu'}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Dernière interaction</p>
                      <p className="text-sm font-medium text-gray-900">{lead.lastInteraction}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <Star className="w-3 h-3 text-yellow-400" />
                        <span className="text-xs text-gray-500">{lead.interactions.length} interactions</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Lead Details */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6">
            {selectedLead ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Détails du Lead</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        {selectedLead.firstName} {selectedLead.lastName}
                      </h4>
                      <p className="text-sm text-gray-600">{selectedLead.email}</p>
                      <p className="text-sm text-gray-600">{selectedLead.company} • {selectedLead.position}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <label className="text-sm font-medium text-gray-700">Score:</label>
                      <select
                        value={selectedLead.score}
                        onChange={(e) => updateLeadScore(selectedLead.id, e.target.value as LeadScore)}
                        className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="hot">Hot</option>
                        <option value="warm">Warm</option>
                        <option value="cold">Cold</option>
                      </select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <label className="text-sm font-medium text-gray-700">Statut:</label>
                      <select
                        value={selectedLead.status}
                        onChange={(e) => updateLeadStatus(selectedLead.id, e.target.value as LeadStatus)}
                        className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="new">Nouveau</option>
                        <option value="contacted">Contacté</option>
                        <option value="engaged">Engagé</option>
                        <option value="qualified">Qualifié</option>
                        <option value="converted">Converti</option>
                        <option value="lost">Perdu</option>
                      </select>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600">Source: {selectedLead.source}</p>
                      <p className="text-sm text-gray-600">Ajouté le: {selectedLead.dateAdded}</p>
                    </div>

                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Tags</h5>
                      <div className="flex flex-wrap gap-1">
                        {selectedLead.tags.map((tag, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Historique des Interactions</h4>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {selectedLead.interactions.map((interaction) => (
                      <div key={interaction.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0 mt-0.5">
                          {getInteractionIcon(interaction.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">
                            {getInteractionLabel(interaction.type)}
                          </p>
                          <p className="text-sm text-gray-600">{interaction.date}</p>
                          {interaction.details && (
                            <p className="text-sm text-gray-700 mt-1">{interaction.details}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 bg-primary-600 text-white py-2 px-3 rounded-lg hover:bg-primary-700 transition-colors duration-200 text-sm">
                    Contacter
                  </button>
                  <button className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm">
                    Qualifier
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Sélectionnez un lead pour voir les détails</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadManagement;