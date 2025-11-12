# How to Add the CV to Your Deployed Application

I cannot directly access your deployed API from this environment due to network restrictions. Here are three ways you can add the CV data:

## Option 1: Use Browser Console (Easiest)

1. Open your frontend: https://nomov.netlify.app
2. Make sure you're logged in as "nomid"
3. Open browser DevTools (F12 or right-click → Inspect)
4. Go to the Console tab
5. Paste this code and press Enter:

```javascript
// CV data
const cvData = {
  id: crypto.randomUUID(),
  versionName: "Professional CV",
  name: "BARTOSZ DYMET",
  title: "Data Analyst & Web Developer",
  contact: {
    email: "b.dymet@gmail.com",
    phone: "+48 602 846 912",
    location: "27E/4 Korzeniowskiego St., 30-214 Krakow, Poland",
    linkedin: "",
    website: "github.com/nomideusz"
  },
  summary: "Experienced specialist with over 15 years in data analysis, web development, and surveying, including 2.5 years of hands-on experience with Picarro technology and software solutions. Deep understanding of Picarro's technology, company strategy, and growth potential in the Polish market. Combines technical expertise with strong communication skills to help clients successfully adopt new technologies and support company goals.",
  experience: [
    {
      id: crypto.randomUUID(),
      company: "INTERTECH POLAND / PICARRO",
      position: "Mobile measuring station operator / Data Analyst",
      location: "Krakow, PL",
      startDate: "February 2022",
      endDate: "Present",
      current: true,
      description: "• Picarro Operations: Operate Picarro vehicle and equipment for gas measurements, ensuring optimal data collection and quality.\n• Collaboration with PSG: Work closely with the Polish Gas Company (PSG) to facilitate successful adoption of Picarro technology, providing training support and operational guidance.\n• Software Proficiency: Master the Picarro software suite and analytical tools, contributing to efficient data processing and analysis.\n• Strategic Understanding: Develop a strong understanding of Picarro's company strategy and market positioning to align efforts with organizational goals."
    },
    {
      id: crypto.randomUUID(),
      company: "Freelance",
      position: "Web Developer",
      location: "",
      startDate: "2007",
      endDate: "Present",
      current: true,
      description: "• Web Application Development: Design and develop modern web applications using SvelteKit, Svelte, and TypeScript.\n• Custom Solutions: Create complete websites, including custom content management systems tailored to client needs.\n• Performance Optimization: Optimize web applications for speed and performance using best practices and tools like TanStack Query.\n• Client Collaboration: Work closely with clients to understand requirements and deliver tailored solutions that meet their objectives."
    },
    {
      id: crypto.randomUUID(),
      company: "TESLA EXPLORATION / IMC GEOPHYSICAL SERVICES / TERREX SEISMIC",
      position: "Surveyor",
      location: "",
      startDate: "July 2007",
      endDate: "October 2019",
      current: false,
      description: "• Team Leadership: Led international surveyor teams in complex seismic projects across multiple countries.\n• Equipment Management: Managed and maintained advanced surveying equipment, ensuring accuracy and reliability.\n• Data Processing: Processed and analyzed survey data"
    }
  ],
  education: [
    {
      id: crypto.randomUUID(),
      institution: "AGH University of Science and Technology",
      degree: "Bachelor's Degree",
      field: "Surveying Technology",
      location: "Krakow, PL",
      startDate: "2002",
      endDate: "2006",
      gpa: "",
      description: ""
    }
  ],
  skills: [
    "Picarro Technology",
    "Data Analysis",
    "SvelteKit",
    "Svelte",
    "TypeScript",
    "HTML5",
    "CSS3",
    "SQL",
    "Database Management",
    "Linux",
    "VPS setup",
    "Docker",
    "Git",
    "Python",
    "GIS Systems",
    "Advanced Surveying",
    "Team Leadership"
  ],
  languages: [
    "Polish (Native)",
    "English (Fluent)"
  ],
  certifications: []
};

// Get user ID from localStorage
const userId = localStorage.getItem('cv-user-id');

// Save CV
fetch('https://cv-maker-api.zaur.app/api/cvs', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-user-id': userId
  },
  body: JSON.stringify(cvData)
})
.then(res => res.json())
.then(data => {
  console.log('✓ CV saved successfully!', data);
  alert('CV saved! Refresh the page to see it.');
})
.catch(error => {
  console.error('Error saving CV:', error);
  alert('Error saving CV. Check console for details.');
});
```

6. You should see "CV saved! Refresh the page to see it."
7. Refresh the page

## Option 2: Run Node Script Locally

1. Download `add-cv-to-deployment.js` to your local machine
2. Make sure you have Node.js 18+ installed
3. Run: `node add-cv-to-deployment.js`

## Option 3: Manual Entry

1. Go to https://nomov.netlify.app
2. Login as "nomid"
3. Manually enter the CV data from `nomid-cv-data.json`
4. Click "Save Version" and name it "Professional CV"

## Files Created

- `nomid-cv-data.json` - The CV data in JSON format
- `add-cv-to-deployment.js` - Node.js script to add CV via API
- `ADD_CV_INSTRUCTIONS.md` - This file

**Recommendation:** Use Option 1 (Browser Console) as it's the quickest and easiest!
