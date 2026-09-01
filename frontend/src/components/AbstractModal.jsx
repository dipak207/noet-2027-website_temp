import React, { useState } from 'react';
import './AbstractModal.css';
import { API_BASE_URL } from '../config.js';

const AbstractModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    institution: ''
  });
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setStatus('Please upload an abstract document.');
      return;
    }

    const submitData = new FormData();
    submitData.append('name', formData.name);
    submitData.append('email', formData.email);
    submitData.append('institution', formData.institution);
    submitData.append('document', file);

    setStatus('Submitting...');
    try {
      const response = await fetch(`${API_BASE_URL}/api/submit-abstract/`, {
        method: 'POST',
        body: submitData,
      });
      
      if (response.ok) {
        setStatus('Abstract submitted successfully!');
        setFormData({ name: '', email: '', institution: '' });
        setFile(null);
        setTimeout(() => {
          onClose();
          setStatus('');
        }, 2000);
      } else {
        const errorData = await response.json();
        setStatus(errorData.error || 'Submission failed. Please try again.');
      }
    } catch (err) {
      setStatus('Error connecting to the server.');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>&times;</button>
        
        <div className="modal-header">
          <h2>Submit Your Abstract</h2>
          <p className="modal-subtitle">Please read the guidelines and use the official template.</p>
        </div>

        <div className="template-buttons">
          <a href="/extras/N0ET27_Abstract_Template (1).docx" download className="btn-template">
            📄 Template
          </a>
          <a href="/extras/N0ET27_Full_Paper_Guidelines-1.docx" download className="btn-template">
            📋 Guidelines
          </a>
        </div>

        <form onSubmit={handleSubmit} className="abstract-form">
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} />
          </div>
          
          <div className="form-group">
            <label htmlFor="institution">Institution / Organization</label>
            <input type="text" id="institution" name="institution" value={formData.institution} onChange={handleChange} />
          </div>
          
          <div className="form-group file-upload-group">
            <label htmlFor="document">Upload Abstract (PDF/DOCX) *</label>
            <div className="file-input-wrapper">
              <input 
                type="file" 
                id="document" 
                name="document" 
                accept=".pdf,.doc,.docx" 
                required 
                onChange={handleFileChange}
              />
              <div className="file-input-label">
                {file ? (
                  <>
                    <span className="file-icon">✓</span>
                    <span className="file-name">{file.name}</span>
                  </>
                ) : (
                  <>
                    <span className="file-icon">↑</span>
                    <span>Click to upload or drag and drop</span>
                    <span className="file-hint">PDF, DOC, DOCX (Max 10MB)</span>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <button type="submit" className="btn btn-primary btn-submit">Submit Abstract</button>
          {status && <p className="status-msg">{status}</p>}
        </form>
      </div>
    </div>
  );
};

export default AbstractModal;
