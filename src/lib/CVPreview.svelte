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
    padding: 15mm 20mm;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    font-family: 'Georgia', 'Times New Roman', serif;
    font-size: 11pt;
  }

  /* Header */
  .cv-header {
    text-align: center;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid #333;
  }

  .cv-header h1 {
    margin: 0 0 0.3rem 0;
    font-size: 2rem;
    color: #222;
    font-weight: 700;
    line-height: 1.2;
  }

  .title {
    font-size: 1.1rem;
    color: #555;
    margin-bottom: 0.7rem;
    font-style: italic;
    line-height: 1.3;
  }

  .contact-info {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.3rem 0.8rem;
    font-size: 0.85rem;
    color: #666;
    line-height: 1.4;
  }

  .contact-info span:not(:last-child)::after {
    content: " |";
    margin-left: 0.8rem;
  }

  /* Sections */
  .cv-section {
    margin-bottom: 1.2rem;
    page-break-inside: avoid;
  }

  .cv-section h2 {
    font-size: 1.2rem;
    color: #222;
    margin: 0 0 0.7rem 0;
    padding-bottom: 0.4rem;
    border-bottom: 1px solid #ddd;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .summary {
    line-height: 1.5;
    color: #444;
    text-align: justify;
  }

  /* Experience */
  .experience-item {
    margin-bottom: 1.1rem;
    page-break-inside: avoid;
  }

  .experience-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0.4rem;
  }

  .experience-item h3 {
    font-size: 1rem;
    margin: 0 0 0.2rem 0;
    color: #222;
    line-height: 1.3;
  }

  .company {
    font-weight: 600;
    color: #555;
    font-size: 0.95rem;
    line-height: 1.3;
  }

  .experience-meta {
    text-align: right;
    font-size: 0.85rem;
    color: #666;
    line-height: 1.3;
  }

  .date {
    font-style: italic;
  }

  .location {
    margin-top: 0.15rem;
  }

  .description {
    margin: 0.5rem 0 0 0;
    line-height: 1.5;
    color: #444;
    text-align: justify;
    white-space: pre-line;
    font-size: 0.95rem;
  }

  /* Education */
  .education-item {
    margin-bottom: 1.1rem;
    page-break-inside: avoid;
  }

  .education-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0.4rem;
  }

  .education-item h3 {
    font-size: 1rem;
    margin: 0 0 0.2rem 0;
    color: #222;
    line-height: 1.3;
  }

  .institution {
    font-weight: 600;
    color: #555;
    font-size: 0.95rem;
    line-height: 1.3;
  }

  .education-meta {
    text-align: right;
    font-size: 0.85rem;
    color: #666;
    line-height: 1.3;
  }

  .gpa {
    margin-top: 0.15rem;
  }

  /* Skills and Languages */
  .skills-list, .languages-list {
    line-height: 1.6;
    color: #444;
    font-size: 0.95rem;
  }

  /* Certifications */
  .certification-item {
    margin-bottom: 0.8rem;
    page-break-inside: avoid;
  }

  .certification-item h3 {
    font-size: 0.95rem;
    margin: 0 0 0.2rem 0;
    color: #222;
    line-height: 1.3;
  }

  .cert-meta {
    font-size: 0.85rem;
    color: #666;
    line-height: 1.3;
  }

  .cert-meta span:not(:last-child)::after {
    content: " • ";
    margin: 0 0.4rem;
  }

  .cert-url {
    color: #0066cc;
  }

  /* Print styles - Compact professional layout */
  @media print {
    @page {
      size: A4;
      margin: 12mm 15mm;
    }

    * {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      color-adjust: exact !important;
    }

    .cv-preview {
      padding: 0;
      background: white;
      margin: 0;
    }

    .cv-page {
      box-shadow: none;
      margin: 0;
      padding: 0;
      max-width: 100%;
      min-height: 0;
      width: 100%;
      page-break-after: auto;
      font-size: 10pt;
    }

    /* Compact header for printing */
    .cv-header {
      margin-bottom: 0.8rem;
      padding-bottom: 0.6rem;
      border-bottom-width: 1.5px;
    }

    .cv-header h1 {
      font-size: 1.4rem;
      margin-bottom: 0.15rem;
      line-height: 1.2;
    }

    .title {
      font-size: 0.95rem;
      margin-bottom: 0.4rem;
      line-height: 1.2;
    }

    .contact-info {
      font-size: 0.75rem;
      gap: 0.2rem 0.5rem;
      line-height: 1.3;
    }

    .contact-info span:not(:last-child)::after {
      margin-left: 0.5rem;
    }

    /* Compact sections for printing */
    .cv-section {
      page-break-inside: avoid;
      margin-bottom: 0.7rem;
    }

    .cv-section h2 {
      font-size: 0.95rem;
      margin-bottom: 0.4rem;
      padding-bottom: 0.15rem;
      letter-spacing: 0.5px;
      font-weight: 700;
    }

    .summary {
      line-height: 1.35;
      margin-bottom: 0;
      font-size: 0.85rem;
      text-align: left;
    }

    /* Compact experience items */
    .experience-item,
    .education-item,
    .certification-item {
      page-break-inside: avoid;
      margin-bottom: 0.6rem;
    }

    .experience-header,
    .education-header {
      margin-bottom: 0.25rem;
    }

    .experience-item h3,
    .education-item h3 {
      font-size: 0.9rem;
      margin-bottom: 0.1rem;
      line-height: 1.2;
    }

    .company,
    .institution {
      font-size: 0.85rem;
      line-height: 1.2;
    }

    .experience-meta,
    .education-meta {
      font-size: 0.75rem;
      line-height: 1.2;
    }

    .date {
      font-style: normal;
      font-weight: 500;
    }

    .location {
      margin-top: 0.1rem;
    }

    .description {
      line-height: 1.35;
      font-size: 0.85rem;
      margin-top: 0.3rem;
    }

    /* Compact skills and languages */
    .skills-list,
    .languages-list {
      line-height: 1.4;
      font-size: 0.85rem;
    }

    /* Compact certifications */
    .certification-item {
      margin-bottom: 0.4rem;
    }

    .certification-item h3 {
      font-size: 0.85rem;
      margin-bottom: 0.1rem;
    }

    .cert-meta {
      font-size: 0.75rem;
      line-height: 1.2;
    }

    .cert-meta span:not(:last-child)::after {
      margin: 0 0.3rem;
    }

    /* Avoid orphans and widows */
    p {
      orphans: 2;
      widows: 2;
    }

    h2,
    h3 {
      orphans: 3;
      widows: 3;
      page-break-after: avoid;
    }

    /* Allow sections to break if too long */
    .cv-section.experience,
    .cv-section.education {
      page-break-inside: auto;
    }
  }
</style>
