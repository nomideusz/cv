// Run this script from your local machine (not in the Docker container)
// Usage: node add-cv-to-deployment.js

const API_URL = 'https://cv-maker-api.zaur.app';

// Polyfill for crypto.randomUUID if needed
function randomUUID() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for older Node versions
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Login as nomid
async function login() {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: 'nomid' })
  });

  const data = await response.json();
  console.log('Login response:', data);
  return data.user.id;
}

// Create CV data
function createCVData() {
  return {
    id: randomUUID(),
    versionName: 'Professional CV',
    name: 'BARTOSZ DYMET',
    title: 'Data Analyst & Web Developer',
    contact: {
      email: 'b.dymet@gmail.com',
      phone: '+48 602 846 912',
      location: '27E/4 Korzeniowskiego St., 30-214 Krakow, Poland',
      linkedin: '',
      website: 'github.com/nomideusz'
    },
    summary: 'Experienced specialist with over 15 years in data analysis, web development, and surveying, including 2.5 years of hands-on experience with Picarro technology and software solutions. Deep understanding of Picarro\'s technology, company strategy, and growth potential in the Polish market. Combines technical expertise with strong communication skills to help clients successfully adopt new technologies and support company goals.',
    experience: [
      {
        id: randomUUID(),
        company: 'INTERTECH POLAND / PICARRO',
        position: 'Mobile measuring station operator / Data Analyst',
        location: 'Krakow, PL',
        startDate: 'February 2022',
        endDate: 'Present',
        current: true,
        description: '• Picarro Operations: Operate Picarro vehicle and equipment for gas measurements, ensuring optimal data collection and quality.\n• Collaboration with PSG: Work closely with the Polish Gas Company (PSG) to facilitate successful adoption of Picarro technology, providing training support and operational guidance.\n• Software Proficiency: Master the Picarro software suite and analytical tools, contributing to efficient data processing and analysis.\n• Strategic Understanding: Develop a strong understanding of Picarro\'s company strategy and market positioning to align efforts with organizational goals.'
      },
      {
        id: randomUUID(),
        company: 'Freelance',
        position: 'Web Developer',
        location: '',
        startDate: '2007',
        endDate: 'Present',
        current: true,
        description: '• Web Application Development: Design and develop modern web applications using SvelteKit, Svelte, and TypeScript.\n• Custom Solutions: Create complete websites, including custom content management systems tailored to client needs.\n• Performance Optimization: Optimize web applications for speed and performance using best practices and tools like TanStack Query.\n• Client Collaboration: Work closely with clients to understand requirements and deliver tailored solutions that meet their objectives.'
      },
      {
        id: randomUUID(),
        company: 'TESLA EXPLORATION / IMC GEOPHYSICAL SERVICES / TERREX SEISMIC',
        position: 'Surveyor',
        location: '',
        startDate: 'July 2007',
        endDate: 'October 2019',
        current: false,
        description: '• Team Leadership: Led international surveyor teams in complex seismic projects across multiple countries.\n• Equipment Management: Managed and maintained advanced surveying equipment, ensuring accuracy and reliability.\n• Data Processing: Processed and analyzed survey data'
      }
    ],
    education: [
      {
        id: randomUUID(),
        institution: 'AGH University of Science and Technology',
        degree: 'Bachelor\'s Degree',
        field: 'Surveying Technology',
        location: 'Krakow, PL',
        startDate: '2002',
        endDate: '2006',
        gpa: '',
        description: ''
      }
    ],
    skills: [
      'Picarro Technology',
      'Data Analysis',
      'SvelteKit',
      'Svelte',
      'TypeScript',
      'HTML5',
      'CSS3',
      'SQL',
      'Database Management',
      'Linux',
      'VPS setup',
      'Docker',
      'Git',
      'Python',
      'GIS Systems',
      'Advanced Surveying',
      'Team Leadership'
    ],
    languages: [
      'Polish (Native)',
      'English (Fluent)'
    ],
    certifications: []
  };
}

// Save CV
async function saveCV(userId, cvData) {
  const response = await fetch(`${API_URL}/api/cvs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-user-id': userId
    },
    body: JSON.stringify(cvData)
  });

  const data = await response.json();
  console.log('Save CV response:', data);
  return data;
}

// Verify CV was saved
async function verifyCVs(userId) {
  const response = await fetch(`${API_URL}/api/cvs`, {
    method: 'GET',
    headers: {
      'x-user-id': userId
    }
  });

  const data = await response.json();
  console.log('\nSaved CVs:', data);
  return data;
}

// Main execution
async function main() {
  try {
    console.log('Logging in as "nomid"...');
    const userId = await login();

    console.log('\nCreating CV data...');
    const cvData = createCVData();

    console.log('\nSaving CV to deployed backend...');
    await saveCV(userId, cvData);

    console.log('\nVerifying CV was saved...');
    await verifyCVs(userId);

    console.log('\n✓ CV successfully added to deployment!');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main();
