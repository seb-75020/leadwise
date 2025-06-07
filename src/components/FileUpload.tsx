import React, { useState, useCallback } from 'react';
import {
  Upload,
  File as FileIcon,
  CheckCircle,
  AlertCircle,
  Clock,
  X,
  Plus
} from 'lucide-react';
import { mockUploads } from '../data/mockData';

const FileUpload: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [uploads, setUploads] = useState(mockUploads);

  const platforms = [
    { value: 'lemlist', label: 'Lemlist' },
    { value: 'brevo', label: 'Brevo' },
    { value: 'google-ads', label: 'Google Ads' },
    { value: 'meta-ads', label: 'Meta Ads' },
    { value: 'linkedin-ads', label: 'LinkedIn Ads' },
    { value: 'other', label: 'Autre' }
  ];

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const newFiles = Array.from(e.dataTransfer.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    if (files.length === 0 || !selectedPlatform) return;

    // Simulate file upload
    files.forEach((file, index) => {
      const newUpload = {
        id: `upload-${Date.now()}-${index}`,
        fileName: file.name,
        fileType: file.name.endsWith('.pdf') ? 'pdf' as const : 'csv' as const,
        platform: platforms.find(p => p.value === selectedPlatform)?.label || 'Autre',
        uploadDate: new Date().toISOString().split('T')[0],
        status: 'processing' as const
      };

      setUploads(prev => [newUpload, ...prev]);

      // Simulate processing completion after 3 seconds
      setTimeout(() => {
        setUploads(prev => prev.map(upload => 
          upload.id === newUpload.id 
            ? { ...upload, status: 'completed' as const, campaignId: `campaign-${Date.now()}` }
            : upload
        ));
      }, 3000);
    });

    setFiles([]);
    setSelectedPlatform('');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'processing':
        return <Clock className="w-5 h-5 text-yellow-500 animate-pulse-soft" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
          return <FileIcon className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Traité';
      case 'processing':
        return 'En cours...';
      case 'error':
        return 'Erreur';
      default:
        return 'En attente';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Import de Fichiers</h1>
        <p className="text-gray-600">Téléchargez vos rapports de campagnes pour analyse automatique</p>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Nouveau Téléchargement</h2>
        
        {/* Platform Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Plateforme Source *
          </label>
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          >
            <option value="">Sélectionnez une plateforme</option>
            {platforms.map(platform => (
              <option key={platform.value} value={platform.value}>
                {platform.label}
              </option>
            ))}
          </select>
        </div>

        {/* Drag & Drop Area */}
        <div
          className={`relative border-2 border-dashed transition-colors duration-200 rounded-xl p-8 text-center ${
            dragActive 
              ? 'border-primary-400 bg-primary-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            multiple
            accept=".csv,.pdf"
            onChange={handleFileSelect}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Glissez vos fichiers ici ou cliquez pour sélectionner
          </h3>
          <p className="text-gray-500 mb-4">
            Formats acceptés: CSV, PDF (max 10MB par fichier)
          </p>
          <button className="inline-flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200">
            <Plus className="w-4 h-4" />
            <span>Sélectionner des fichiers</span>
          </button>
        </div>

        {/* Selected Files */}
        {files.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Fichiers sélectionnés:</h3>
            <div className="space-y-2">
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileIcon className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">{file.name}</p>
                      <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={handleUpload}
              disabled={!selectedPlatform}
              className="mt-4 w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Lancer l'analyse
            </button>
          </div>
        )}
      </div>

      {/* Upload History */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Historique des Téléchargements</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-600">Fichier</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Plateforme</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {uploads.map((upload) => (
                <tr key={upload.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <FileIcon className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">{upload.fileName}</p>
                        <p className="text-sm text-gray-500 uppercase">{upload.fileType}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-700">{upload.platform}</td>
                  <td className="py-4 px-4 text-gray-700">{upload.uploadDate}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(upload.status)}
                      <span className="text-sm">{getStatusText(upload.status)}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    {upload.status === 'completed' && (
                      <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                        Voir l'analyse
                      </button>
                    )}
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

export default FileUpload;