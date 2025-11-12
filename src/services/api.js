const API_BASE_URL = 'http://localhost:3001/api';

class ApiService {
  constructor() {
    this.userId = null;
    this.isOnline = false;
  }

  setUserId(userId) {
    this.userId = userId;
    if (userId) {
      localStorage.setItem('cv-user-id', userId);
    } else {
      localStorage.removeItem('cv-user-id');
    }
  }

  getUserId() {
    if (!this.userId) {
      this.userId = localStorage.getItem('cv-user-id');
    }
    return this.userId;
  }

  getHeaders() {
    const headers = {
      'Content-Type': 'application/json'
    };

    if (this.userId) {
      headers['X-User-Id'] = this.userId;
    }

    return headers;
  }

  async checkHealth() {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      this.isOnline = response.ok;
      return this.isOnline;
    } catch (error) {
      this.isOnline = false;
      return false;
    }
  }

  async login(username) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      this.setUserId(data.user.id);
      this.isOnline = true;
      return data.user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async getAllCVs() {
    try {
      const response = await fetch(`${API_BASE_URL}/cvs`, {
        headers: this.getHeaders()
      });

      if (!response.ok) {
        throw new Error('Failed to fetch CVs');
      }

      const data = await response.json();
      return data.cvs;
    } catch (error) {
      console.error('Get CVs error:', error);
      throw error;
    }
  }

  async getCV(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/cvs/${id}`, {
        headers: this.getHeaders()
      });

      if (!response.ok) {
        throw new Error('Failed to fetch CV');
      }

      const data = await response.json();
      return data.cv;
    } catch (error) {
      console.error('Get CV error:', error);
      throw error;
    }
  }

  async saveCV(cv) {
    try {
      const response = await fetch(`${API_BASE_URL}/cvs`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(cv)
      });

      if (!response.ok) {
        throw new Error('Failed to save CV');
      }

      const data = await response.json();
      return data.cv;
    } catch (error) {
      console.error('Save CV error:', error);
      throw error;
    }
  }

  async updateCV(cv) {
    try {
      const response = await fetch(`${API_BASE_URL}/cvs/${cv.id}`, {
        method: 'PUT',
        headers: this.getHeaders(),
        body: JSON.stringify(cv)
      });

      if (!response.ok) {
        throw new Error('Failed to update CV');
      }

      const data = await response.json();
      return data.cv;
    } catch (error) {
      console.error('Update CV error:', error);
      throw error;
    }
  }

  async deleteCV(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/cvs/${id}`, {
        method: 'DELETE',
        headers: this.getHeaders()
      });

      if (!response.ok) {
        throw new Error('Failed to delete CV');
      }

      return true;
    } catch (error) {
      console.error('Delete CV error:', error);
      throw error;
    }
  }
}

export const apiService = new ApiService();
