// CV Store using Svelte 5 runes
import { apiService } from '../services/api.js';

// Default CV template
export function createEmptyCV() {
  return {
    id: crypto.randomUUID(),
    name: '',
    title: '',
    contact: {
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      website: ''
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    languages: [],
    certifications: []
  };
}

// Create a new experience entry
export function createExperience() {
  return {
    id: crypto.randomUUID(),
    company: '',
    position: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: ''
  };
}

// Create a new education entry
export function createEducation() {
  return {
    id: crypto.randomUUID(),
    institution: '',
    degree: '',
    field: '',
    location: '',
    startDate: '',
    endDate: '',
    gpa: '',
    description: ''
  };
}

// Create a new certification entry
export function createCertification() {
  return {
    id: crypto.randomUUID(),
    name: '',
    issuer: '',
    date: '',
    url: ''
  };
}

// CV Store state
class CVStore {
  currentCV = $state(createEmptyCV());
  savedVersions = $state([]);
  activeVersionId = $state(null);
  isLoggedIn = $state(false);
  username = $state('');
  syncEnabled = $state(false);
  isSyncing = $state(false);
  syncError = $state(null);

  constructor() {
    // Load from localStorage on init
    this.loadFromStorage();
    this.checkLoginStatus();
  }

  // Check if user is already logged in
  async checkLoginStatus() {
    const userId = apiService.getUserId();
    const savedUsername = localStorage.getItem('cv-username');

    if (userId && savedUsername) {
      this.username = savedUsername;
      this.isLoggedIn = true;

      // Check if server is online
      const isOnline = await apiService.checkHealth();
      if (isOnline) {
        this.syncEnabled = true;
      }
    }
  }

  // Login to enable database sync
  async login(username) {
    try {
      this.isSyncing = true;
      this.syncError = null;

      const user = await apiService.login(username);
      this.username = username;
      this.isLoggedIn = true;
      this.syncEnabled = true;

      localStorage.setItem('cv-username', username);

      // Sync local versions to server
      await this.syncToServer();

      // Load all CVs from server
      await this.loadFromServer();

      this.isSyncing = false;
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      this.syncError = 'Failed to connect to server';
      this.isSyncing = false;
      throw error;
    }
  }

  // Logout
  logout() {
    this.isLoggedIn = false;
    this.username = '';
    this.syncEnabled = false;
    apiService.setUserId(null);
    localStorage.removeItem('cv-username');
  }

  // Sync local versions to server
  async syncToServer() {
    if (!this.syncEnabled) return;

    try {
      this.isSyncing = true;

      for (const version of this.savedVersions) {
        await apiService.saveCV(version);
      }

      this.syncError = null;
      this.isSyncing = false;
    } catch (error) {
      console.error('Sync to server failed:', error);
      this.syncError = 'Failed to sync to server';
      this.isSyncing = false;
    }
  }

  // Load all CVs from server
  async loadFromServer() {
    if (!this.syncEnabled) return;

    try {
      this.isSyncing = true;

      const cvs = await apiService.getAllCVs();

      // Merge with local versions (server is source of truth)
      this.savedVersions = cvs;

      this.saveToStorage();
      this.syncError = null;
      this.isSyncing = false;
    } catch (error) {
      console.error('Load from server failed:', error);
      this.syncError = 'Failed to load from server';
      this.isSyncing = false;
    }
  }

  // Update current CV
  updateCV(updates) {
    this.currentCV = { ...this.currentCV, ...updates };
    this.saveToStorage();
  }

  // Update nested contact info
  updateContact(updates) {
    this.currentCV.contact = { ...this.currentCV.contact, ...updates };
    this.saveToStorage();
  }

  // Add experience
  addExperience() {
    this.currentCV.experience = [...this.currentCV.experience, createExperience()];
    this.saveToStorage();
  }

  // Update experience
  updateExperience(id, updates) {
    this.currentCV.experience = this.currentCV.experience.map(exp =>
      exp.id === id ? { ...exp, ...updates } : exp
    );
    this.saveToStorage();
  }

  // Remove experience
  removeExperience(id) {
    this.currentCV.experience = this.currentCV.experience.filter(exp => exp.id !== id);
    this.saveToStorage();
  }

  // Add education
  addEducation() {
    this.currentCV.education = [...this.currentCV.education, createEducation()];
    this.saveToStorage();
  }

  // Update education
  updateEducation(id, updates) {
    this.currentCV.education = this.currentCV.education.map(edu =>
      edu.id === id ? { ...edu, ...updates } : edu
    );
    this.saveToStorage();
  }

  // Remove education
  removeEducation(id) {
    this.currentCV.education = this.currentCV.education.filter(edu => edu.id !== id);
    this.saveToStorage();
  }

  // Add certification
  addCertification() {
    this.currentCV.certifications = [...this.currentCV.certifications, createCertification()];
    this.saveToStorage();
  }

  // Update certification
  updateCertification(id, updates) {
    this.currentCV.certifications = this.currentCV.certifications.map(cert =>
      cert.id === id ? { ...cert, ...updates } : cert
    );
    this.saveToStorage();
  }

  // Remove certification
  removeCertification(id) {
    this.currentCV.certifications = this.currentCV.certifications.filter(cert => cert.id !== id);
    this.saveToStorage();
  }

  // Update skills array
  updateSkills(skills) {
    this.currentCV.skills = skills;
    this.saveToStorage();
  }

  // Update languages array
  updateLanguages(languages) {
    this.currentCV.languages = languages;
    this.saveToStorage();
  }

  // Save current CV as a version
  async saveVersion(versionName) {
    const version = {
      ...this.currentCV,
      versionName,
      savedAt: new Date().toISOString()
    };

    const existingIndex = this.savedVersions.findIndex(v => v.id === version.id);
    if (existingIndex >= 0) {
      this.savedVersions[existingIndex] = version;
    } else {
      this.savedVersions = [...this.savedVersions, version];
    }

    this.activeVersionId = version.id;
    this.saveToStorage();

    // Sync to server if enabled
    if (this.syncEnabled) {
      try {
        await apiService.saveCV(version);
      } catch (error) {
        console.error('Failed to sync version to server:', error);
        this.syncError = 'Failed to sync to server';
      }
    }
  }

  // Load a saved version
  loadVersion(versionId) {
    const version = this.savedVersions.find(v => v.id === versionId);
    if (version) {
      this.currentCV = { ...version };
      this.activeVersionId = versionId;
    }
  }

  // Delete a saved version
  async deleteVersion(versionId) {
    this.savedVersions = this.savedVersions.filter(v => v.id !== versionId);
    if (this.activeVersionId === versionId) {
      this.activeVersionId = null;
    }
    this.saveToStorage();

    // Delete from server if enabled
    if (this.syncEnabled) {
      try {
        await apiService.deleteCV(versionId);
      } catch (error) {
        console.error('Failed to delete version from server:', error);
        this.syncError = 'Failed to delete from server';
      }
    }
  }

  // Copy a saved version
  async copyVersion(versionId, newVersionName) {
    const version = this.savedVersions.find(v => v.id === versionId);
    if (!version) return;

    // Create a copy with new ID and name
    const copiedVersion = {
      ...version,
      id: crypto.randomUUID(),
      versionName: newVersionName || `Copy of ${version.versionName}`,
      savedAt: new Date().toISOString()
    };

    // Add to saved versions
    this.savedVersions = [...this.savedVersions, copiedVersion];

    // Load the copied version as current CV
    this.currentCV = { ...copiedVersion };
    this.activeVersionId = copiedVersion.id;

    this.saveToStorage();

    // Sync to server if enabled
    if (this.syncEnabled) {
      try {
        await apiService.saveCV(copiedVersion);
      } catch (error) {
        console.error('Failed to sync copied version to server:', error);
        this.syncError = 'Failed to sync to server';
      }
    }

    return copiedVersion;
  }

  // Create new CV
  createNew() {
    this.currentCV = createEmptyCV();
    this.activeVersionId = null;
    this.saveToStorage();
  }

  // Save to localStorage
  saveToStorage() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cv-current', JSON.stringify(this.currentCV));
      localStorage.setItem('cv-versions', JSON.stringify(this.savedVersions));
      localStorage.setItem('cv-active-id', this.activeVersionId || '');
    }
  }

  // Load from localStorage
  loadFromStorage() {
    if (typeof window !== 'undefined') {
      const savedCurrent = localStorage.getItem('cv-current');
      const savedVersions = localStorage.getItem('cv-versions');
      const activeId = localStorage.getItem('cv-active-id');

      if (savedCurrent) {
        try {
          this.currentCV = JSON.parse(savedCurrent);
        } catch (e) {
          console.error('Error loading current CV:', e);
        }
      }

      if (savedVersions) {
        try {
          this.savedVersions = JSON.parse(savedVersions);
        } catch (e) {
          console.error('Error loading saved versions:', e);
        }
      }

      if (activeId) {
        this.activeVersionId = activeId || null;
      }
    }
  }
}

// Export singleton instance
export const cvStore = new CVStore();
