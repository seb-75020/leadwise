export interface Campaign {
  id: string;
  name: string;
  platform: 'lemlist' | 'brevo' | 'google-ads' | 'meta-ads' | 'other';
  status: 'active' | 'paused' | 'completed';
  dateCreated: string;
  lastUpdated: string;
  metrics: CampaignMetrics;
  leads: Lead[];
}

export interface CampaignMetrics {
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  replied: number;
  bounced: number;
  unsubscribed: number;
  conversions: number;
  openRate: number;
  clickRate: number;
  replyRate: number;
  conversionRate: number;
  cost: number;
  revenue: number;
  roi: number;
}

export interface Lead {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  position?: string;
  score: LeadScore;
  status: LeadStatus;
  interactions: Interaction[];
  source: string;
  dateAdded: string;
  lastInteraction: string;
  tags: string[];
}

export type LeadScore = 'hot' | 'warm' | 'cold';
export type LeadStatus = 'new' | 'contacted' | 'engaged' | 'qualified' | 'converted' | 'lost';

export interface Interaction {
  id: string;
  type: 'email_sent' | 'email_opened' | 'link_clicked' | 'reply_received' | 'call_made' | 'meeting_scheduled';
  date: string;
  details?: string;
  campaignId?: string;
}

export interface AnalysisReport {
  id: string;
  title: string;
  campaignId: string;
  dateGenerated: string;
  summary: {
    totalLeads: number;
    hotLeads: number;
    warmLeads: number;
    coldLeads: number;
    conversionRate: number;
    topPerformingChannels: string[];
  };
  recommendations: string[];
  insights: string[];
}

export interface FileUpload {
  id: string;
  fileName: string;
  fileType: 'csv' | 'pdf';
  platform: string;
  uploadDate: string;
  status: 'processing' | 'completed' | 'error';
  campaignId?: string;
}