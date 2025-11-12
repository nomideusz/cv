<script>
  import { cvStore } from '../stores/cvStore.svelte.js';

  const cv = $derived(cvStore.currentCV);
</script>

<div class="cv-preview">
  <div class="cv-page">
    <!-- Header -->
    <header class="cv-header">
      <h1>{cv.name || 'Your Name'}</h1>
      <div class="title">{cv.title || 'Professional Title'}</div>

      {#if cv.contact.email || cv.contact.phone || cv.contact.location || cv.contact.linkedin || cv.contact.website}
        <div class="contact-info">
          {#if cv.contact.email}
            <span>{cv.contact.email}</span>
          {/if}
          {#if cv.contact.phone}
            <span>{cv.contact.phone}</span>
          {/if}
          {#if cv.contact.location}
            <span>{cv.contact.location}</span>
          {/if}
          {#if cv.contact.linkedin}
            <span>{cv.contact.linkedin}</span>
          {/if}
          {#if cv.contact.website}
            <span>{cv.contact.website}</span>
          {/if}
        </div>
      {/if}
    </header>

    <!-- Summary -->
    {#if cv.summary}
      <section class="cv-section">
        <h2>Professional Summary</h2>
        <p class="summary">{cv.summary}</p>
      </section>
    {/if}

    <!-- Experience -->
    {#if cv.experience.length > 0}
      <section class="cv-section">
        <h2>Professional Experience</h2>
        {#each cv.experience as exp}
          <div class="experience-item">
            <div class="experience-header">
              <div>
                <h3>{exp.position || 'Position'}</h3>
                <div class="company">{exp.company || 'Company'}</div>
              </div>
              <div class="experience-meta">
                <div class="date">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</div>
                {#if exp.location}
                  <div class="location">{exp.location}</div>
                {/if}
              </div>
            </div>
            {#if exp.description}
              <p class="description">{exp.description}</p>
            {/if}
          </div>
        {/each}
      </section>
    {/if}

    <!-- Education -->
    {#if cv.education.length > 0}
      <section class="cv-section">
        <h2>Education</h2>
        {#each cv.education as edu}
          <div class="education-item">
            <div class="education-header">
              <div>
                <h3>{edu.degree || 'Degree'} {edu.field ? `in ${edu.field}` : ''}</h3>
                <div class="institution">{edu.institution || 'Institution'}</div>
              </div>
              <div class="education-meta">
                <div class="date">{edu.startDate} - {edu.endDate}</div>
                {#if edu.location}
                  <div class="location">{edu.location}</div>
                {/if}
                {#if edu.gpa}
                  <div class="gpa">GPA: {edu.gpa}</div>
                {/if}
              </div>
            </div>
            {#if edu.description}
              <p class="description">{edu.description}</p>
            {/if}
          </div>
        {/each}
      </section>
    {/if}

    <!-- Skills -->
    {#if cv.skills.length > 0}
      <section class="cv-section">
        <h2>Skills</h2>
        <div class="skills-list">
          {#each cv.skills as skill, index}
            {skill}{#if index < cv.skills.length - 1} • {/if}
          {/each}
        </div>
      </section>
    {/if}

    <!-- Languages -->
    {#if cv.languages.length > 0}
      <section class="cv-section">
        <h2>Languages</h2>
        <div class="languages-list">
          {#each cv.languages as language, index}
            {language}{#if index < cv.languages.length - 1} • {/if}
          {/each}
        </div>
      </section>
    {/if}

    <!-- Certifications -->
    {#if cv.certifications.length > 0}
      <section class="cv-section">
        <h2>Certifications</h2>
        {#each cv.certifications as cert}
          <div class="certification-item">
            <h3>{cert.name || 'Certification Name'}</h3>
            <div class="cert-meta">
              {#if cert.issuer}
                <span>{cert.issuer}</span>
              {/if}
              {#if cert.date}
                <span>{cert.date}</span>
              {/if}
              {#if cert.url}
                <span class="cert-url">{cert.url}</span>
              {/if}
            </div>
          </div>
        {/each}
      </section>
    {/if}
  </div>
</div>

<style>
  .cv-preview {
    background: #f5f5f5;
    padding: 2rem;
    min-height: 100vh;
  }

  .cv-page {
    background: white;
    max-width: 210mm;
    min-height: 297mm;
    margin: 0 auto;
    padding: 20mm;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    font-family: 'Georgia', 'Times New Roman', serif;
  }

  /* Header */
  .cv-header {
    text-align: center;
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
    border-bottom: 2px solid #333;
  }

  .cv-header h1 {
    margin: 0 0 0.5rem 0;
    font-size: 2.5rem;
    color: #222;
    font-weight: 700;
  }

  .title {
    font-size: 1.3rem;
    color: #555;
    margin-bottom: 1rem;
    font-style: italic;
  }

  .contact-info {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem 1rem;
    font-size: 0.9rem;
    color: #666;
  }

  .contact-info span:not(:last-child)::after {
    content: " |";
    margin-left: 1rem;
  }

  /* Sections */
  .cv-section {
    margin-bottom: 1.5rem;
    page-break-inside: avoid;
  }

  .cv-section h2 {
    font-size: 1.4rem;
    color: #222;
    margin: 0 0 1rem 0;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #ddd;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .summary {
    line-height: 1.6;
    color: #444;
    text-align: justify;
  }

  /* Experience */
  .experience-item {
    margin-bottom: 1.5rem;
    page-break-inside: avoid;
  }

  .experience-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0.5rem;
  }

  .experience-item h3 {
    font-size: 1.1rem;
    margin: 0 0 0.25rem 0;
    color: #222;
  }

  .company {
    font-weight: 600;
    color: #555;
  }

  .experience-meta {
    text-align: right;
    font-size: 0.9rem;
    color: #666;
  }

  .date {
    font-style: italic;
  }

  .location {
    margin-top: 0.25rem;
  }

  .description {
    margin: 0.75rem 0 0 0;
    line-height: 1.6;
    color: #444;
    text-align: justify;
    white-space: pre-line;
  }

  /* Education */
  .education-item {
    margin-bottom: 1.5rem;
    page-break-inside: avoid;
  }

  .education-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0.5rem;
  }

  .education-item h3 {
    font-size: 1.1rem;
    margin: 0 0 0.25rem 0;
    color: #222;
  }

  .institution {
    font-weight: 600;
    color: #555;
  }

  .education-meta {
    text-align: right;
    font-size: 0.9rem;
    color: #666;
  }

  .gpa {
    margin-top: 0.25rem;
  }

  /* Skills and Languages */
  .skills-list, .languages-list {
    line-height: 1.8;
    color: #444;
  }

  /* Certifications */
  .certification-item {
    margin-bottom: 1rem;
    page-break-inside: avoid;
  }

  .certification-item h3 {
    font-size: 1rem;
    margin: 0 0 0.25rem 0;
    color: #222;
  }

  .cert-meta {
    font-size: 0.9rem;
    color: #666;
  }

  .cert-meta span:not(:last-child)::after {
    content: " • ";
    margin: 0 0.5rem;
  }

  .cert-url {
    color: #0066cc;
  }

  /* Print styles */
  @media print {
    .cv-preview {
      padding: 0;
      background: white;
    }

    .cv-page {
      box-shadow: none;
      margin: 0;
      padding: 15mm;
      max-width: 100%;
    }

    .cv-section {
      page-break-inside: avoid;
    }

    .experience-item,
    .education-item,
    .certification-item {
      page-break-inside: avoid;
    }
  }
</style>
