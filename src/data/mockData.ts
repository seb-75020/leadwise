import { Campaign, Lead, AnalysisReport, FileUpload } from '../types';

export const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Campagne Email Q4 2024',
    platform: 'lemlist',
    status: 'active',
    dateCreated: '2024-10-01',
    lastUpdated: '2024-12-15',
    metrics: {
      sent: 5000,
      delivered: 4750,
      opened: 1425,
      clicked: 285,
      replied: 57,
      bounced: 250,
      unsubscribed: 12,
      conversions: 23,
      openRate: 30.0,
      clickRate: 20.0,
      replyRate: 4.0,
      conversionRate: 1.6,
      cost: 2500,
      revenue: 15400,
      roi: 516
    },
    leads: []
  },
  {
    id: '2',
    name: 'Google Ads - SaaS B2B',
    platform: 'google-ads',
    status: 'active',
    dateCreated: '2024-11-15',
    lastUpdated: '2024-12-15',
    metrics: {
      sent: 0,
      delivered: 0,
      opened: 0,
      clicked: 1250,
      replied: 0,
      bounced: 0,
      unsubscribed: 0,
      conversions: 45,
      openRate: 0,
      clickRate: 3.2,
      replyRate: 0,
      conversionRate: 3.6,
      cost: 8500,
      revenue: 27000,
      roi: 218
    },
    leads: []
  },
  {
    id: '3',
    name: 'Meta Ads - Retargeting',
    platform: 'meta-ads',
    status: 'completed',
    dateCreated: '2024-09-01',
    lastUpdated: '2024-11-30',
    metrics: {
      sent: 0,
      delivered: 0,
      opened: 0,
      clicked: 890,
      replied: 0,
      bounced: 0,
      unsubscribed: 0,
      conversions: 34,
      openRate: 0,
      clickRate: 4.1,
      replyRate: 0,
      conversionRate: 3.8,
      cost: 3200,
      revenue: 18500,
      roi: 478
    },
    leads: []
  }
];

export const mockLeads: Lead[] = [
  {
    id: '1',
    email: 'marie.dupont@techcorp.com',
    firstName: 'Marie',
    lastName: 'Dupont',
    company: 'TechCorp',
    position: 'Marketing Director',
    score: 'hot',
    status: 'qualified',
    interactions: [
      {
        id: '1',
        type: 'email_sent',
        date: '2024-12-10',
        campaignId: '1'
      },
      {
        id: '2',
        type: 'email_opened',
        date: '2024-12-10',
        campaignId: '1'
      },
      {
        id: '3',
        type: 'link_clicked',
        date: '2024-12-11',
        campaignId: '1'
      },
      {
        id: '4',
        type: 'reply_received',
        date: '2024-12-12',
        details: 'Intéressée par une démo',
        campaignId: '1'
      }
    ],
    source: 'Lemlist',
    dateAdded: '2024-12-10',
    lastInteraction: '2024-12-12',
    tags: ['SaaS', 'Enterprise', 'Marketing']
  },
  {
    id: '2',
    email: 'pierre.martin@startup.io',
    firstName: 'Pierre',
    lastName: 'Martin',
    company: 'Startup.io',
    position: 'CEO',
    score: 'warm',
    status: 'engaged',
    interactions: [
      {
        id: '5',
        type: 'email_sent',
        date: '2024-12-08',
        campaignId: '1'
      },
      {
        id: '6',
        type: 'email_opened',
        date: '2024-12-09',
        campaignId: '1'
      },
      {
        id: '7',
        type: 'link_clicked',
        date: '2024-12-09',
        campaignId: '1'
      }
    ],
    source: 'Google Ads',
    dateAdded: '2024-12-08',
    lastInteraction: '2024-12-09',
    tags: ['Startup', 'Tech', 'Growth']
  },
  {
    id: '3',
    email: 'sophie.bernard@bigcorp.fr',
    firstName: 'Sophie',
    lastName: 'Bernard',
    company: 'BigCorp',
    position: 'IT Manager',
    score: 'cold',
    status: 'contacted',
    interactions: [
      {
        id: '8',
        type: 'email_sent',
        date: '2024-12-05',
        campaignId: '1'
      }
    ],
    source: 'Meta Ads',
    dateAdded: '2024-12-05',
    lastInteraction: '2024-12-05',
    tags: ['Enterprise', 'IT', 'Security']
  }
];

export const mockReports: AnalysisReport[] = [
  {
    id: '1',
    title: 'Analyse Q4 2024 - Campagne Email',
    campaignId: '1',
    dateGenerated: '2024-12-15',
    summary: {
      totalLeads: 1425,
      hotLeads: 85,
      warmLeads: 340,
      coldLeads: 1000,
      conversionRate: 1.6,
      topPerformingChannels: ['Email', 'LinkedIn']
    },
    recommendations: [
      'Augmenter la fréquence des follow-ups pour les leads warm',
      'Personnaliser davantage les messages pour les leads cold',
      'Tester de nouveaux objets d\'emails pour améliorer l\'open rate',
      'Segmenter davantage selon le secteur d\'activité'
    ],
    insights: [
      'Les leads du secteur SaaS montrent un taux de conversion 3x supérieur',
      'Les emails envoyés le mardi matin ont 25% d\'ouverture en plus',
      'Les messages personnalisés avec le prénom augmentent le taux de réponse de 40%'
    ]
  }
];

export const mockUploads: FileUpload[] = [
  {
    id: '1',
    fileName: 'lemlist_campaign_report_dec2024.csv',
    fileType: 'csv',
    platform: 'Lemlist',
    uploadDate: '2024-12-15',
    status: 'completed',
    campaignId: '1'
  },
  {
    id: '2',
    fileName: 'google_ads_performance_nov2024.pdf',
    fileType: 'pdf',
    platform: 'Google Ads',
    uploadDate: '2024-12-10',
    status: 'completed',
    campaignId: '2'
  },
  {
    id: '3',
    fileName: 'meta_ads_analytics_oct2024.csv',
    fileType: 'csv',
    platform: 'Meta Ads',
    uploadDate: '2024-12-08',
    status: 'processing'
  }
];