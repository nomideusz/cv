// CV Store using Svelte 5 runes
import { writable } from 'svelte/store';

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

  constructor() {
    // Load from localStorage on init
    this.loadFromStorage();
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
  saveVersion(versionName) {
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
  deleteVersion(versionId) {
    this.savedVersions = this.savedVersions.filter(v => v.id !== versionId);
    if (this.activeVersionId === versionId) {
      this.activeVersionId = null;
    }
    this.saveToStorage();
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
