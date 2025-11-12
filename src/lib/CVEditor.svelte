<script>
  import { cvStore } from '../stores/cvStore.svelte.js';

  let skillInput = $state('');
  let languageInput = $state('');

  function addSkill() {
    if (skillInput.trim()) {
      cvStore.updateSkills([...cvStore.currentCV.skills, skillInput.trim()]);
      skillInput = '';
    }
  }

  function removeSkill(index) {
    cvStore.updateSkills(cvStore.currentCV.skills.filter((_, i) => i !== index));
  }

  function addLanguage() {
    if (languageInput.trim()) {
      cvStore.updateLanguages([...cvStore.currentCV.languages, languageInput.trim()]);
      languageInput = '';
    }
  }

  function removeLanguage(index) {
    cvStore.updateLanguages(cvStore.currentCV.languages.filter((_, i) => i !== index));
  }
</script>

<div class="editor">
  <h2>Edit CV</h2>

  <section class="section">
    <h3>Personal Information</h3>
    <div class="form-grid">
      <input
        type="text"
        placeholder="Full Name"
        value={cvStore.currentCV.name}
        oninput={(e) => cvStore.updateCV({ name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Professional Title"
        value={cvStore.currentCV.title}
        oninput={(e) => cvStore.updateCV({ title: e.target.value })}
      />
    </div>
  </section>

  <section class="section">
    <h3>Contact Information</h3>
    <div class="form-grid">
      <input
        type="email"
        placeholder="Email"
        value={cvStore.currentCV.contact.email}
        oninput={(e) => cvStore.updateContact({ email: e.target.value })}
      />
      <input
        type="tel"
        placeholder="Phone"
        value={cvStore.currentCV.contact.phone}
        oninput={(e) => cvStore.updateContact({ phone: e.target.value })}
      />
      <input
        type="text"
        placeholder="Location"
        value={cvStore.currentCV.contact.location}
        oninput={(e) => cvStore.updateContact({ location: e.target.value })}
      />
      <input
        type="text"
        placeholder="LinkedIn"
        value={cvStore.currentCV.contact.linkedin}
        oninput={(e) => cvStore.updateContact({ linkedin: e.target.value })}
      />
      <input
        type="text"
        placeholder="Website"
        value={cvStore.currentCV.contact.website}
        oninput={(e) => cvStore.updateContact({ website: e.target.value })}
      />
    </div>
  </section>

  <section class="section">
    <h3>Professional Summary</h3>
    <textarea
      placeholder="Brief professional summary..."
      value={cvStore.currentCV.summary}
      oninput={(e) => cvStore.updateCV({ summary: e.target.value })}
      rows="4"
    ></textarea>
  </section>

  <section class="section">
    <h3>Experience</h3>
    {#each cvStore.currentCV.experience as exp (exp.id)}
      <div class="entry">
        <div class="form-grid">
          <input
            type="text"
            placeholder="Company"
            value={exp.company}
            oninput={(e) => cvStore.updateExperience(exp.id, { company: e.target.value })}
          />
          <input
            type="text"
            placeholder="Position"
            value={exp.position}
            oninput={(e) => cvStore.updateExperience(exp.id, { position: e.target.value })}
          />
          <input
            type="text"
            placeholder="Location"
            value={exp.location}
            oninput={(e) => cvStore.updateExperience(exp.id, { location: e.target.value })}
          />
          <input
            type="text"
            placeholder="Start Date (e.g., Jan 2020)"
            value={exp.startDate}
            oninput={(e) => cvStore.updateExperience(exp.id, { startDate: e.target.value })}
          />
          <input
            type="text"
            placeholder="End Date (e.g., Dec 2022)"
            value={exp.endDate}
            oninput={(e) => cvStore.updateExperience(exp.id, { endDate: e.target.value })}
            disabled={exp.current}
          />
          <label class="checkbox-label">
            <input
              type="checkbox"
              checked={exp.current}
              onchange={(e) => cvStore.updateExperience(exp.id, {
                current: e.target.checked,
                endDate: e.target.checked ? 'Present' : ''
              })}
            />
            Current Position
          </label>
        </div>
        <textarea
          placeholder="Job description and achievements..."
          value={exp.description}
          oninput={(e) => cvStore.updateExperience(exp.id, { description: e.target.value })}
          rows="3"
        ></textarea>
        <button class="btn-remove" onclick={() => cvStore.removeExperience(exp.id)}>
          Remove Experience
        </button>
      </div>
    {/each}
    <button class="btn-add" onclick={() => cvStore.addExperience()}>+ Add Experience</button>
  </section>

  <section class="section">
    <h3>Education</h3>
    {#each cvStore.currentCV.education as edu (edu.id)}
      <div class="entry">
        <div class="form-grid">
          <input
            type="text"
            placeholder="Institution"
            value={edu.institution}
            oninput={(e) => cvStore.updateEducation(edu.id, { institution: e.target.value })}
          />
          <input
            type="text"
            placeholder="Degree"
            value={edu.degree}
            oninput={(e) => cvStore.updateEducation(edu.id, { degree: e.target.value })}
          />
          <input
            type="text"
            placeholder="Field of Study"
            value={edu.field}
            oninput={(e) => cvStore.updateEducation(edu.id, { field: e.target.value })}
          />
          <input
            type="text"
            placeholder="Location"
            value={edu.location}
            oninput={(e) => cvStore.updateEducation(edu.id, { location: e.target.value })}
          />
          <input
            type="text"
            placeholder="Start Date"
            value={edu.startDate}
            oninput={(e) => cvStore.updateEducation(edu.id, { startDate: e.target.value })}
          />
          <input
            type="text"
            placeholder="End Date"
            value={edu.endDate}
            oninput={(e) => cvStore.updateEducation(edu.id, { endDate: e.target.value })}
          />
          <input
            type="text"
            placeholder="GPA (optional)"
            value={edu.gpa}
            oninput={(e) => cvStore.updateEducation(edu.id, { gpa: e.target.value })}
          />
        </div>
        <textarea
          placeholder="Additional details..."
          value={edu.description}
          oninput={(e) => cvStore.updateEducation(edu.id, { description: e.target.value })}
          rows="2"
        ></textarea>
        <button class="btn-remove" onclick={() => cvStore.removeEducation(edu.id)}>
          Remove Education
        </button>
      </div>
    {/each}
    <button class="btn-add" onclick={() => cvStore.addEducation()}>+ Add Education</button>
  </section>

  <section class="section">
    <h3>Skills</h3>
    <div class="tags-input">
      <input
        type="text"
        placeholder="Add a skill..."
        bind:value={skillInput}
        onkeypress={(e) => e.key === 'Enter' && addSkill()}
      />
      <button onclick={addSkill}>Add</button>
    </div>
    <div class="tags">
      {#each cvStore.currentCV.skills as skill, index}
        <span class="tag">
          {skill}
          <button onclick={() => removeSkill(index)}>&times;</button>
        </span>
      {/each}
    </div>
  </section>

  <section class="section">
    <h3>Languages</h3>
    <div class="tags-input">
      <input
        type="text"
        placeholder="Add a language..."
        bind:value={languageInput}
        onkeypress={(e) => e.key === 'Enter' && addLanguage()}
      />
      <button onclick={addLanguage}>Add</button>
    </div>
    <div class="tags">
      {#each cvStore.currentCV.languages as language, index}
        <span class="tag">
          {language}
          <button onclick={() => removeLanguage(index)}>&times;</button>
        </span>
      {/each}
    </div>
  </section>

  <section class="section">
    <h3>Certifications</h3>
    {#each cvStore.currentCV.certifications as cert (cert.id)}
      <div class="entry">
        <div class="form-grid">
          <input
            type="text"
            placeholder="Certification Name"
            value={cert.name}
            oninput={(e) => cvStore.updateCertification(cert.id, { name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Issuer"
            value={cert.issuer}
            oninput={(e) => cvStore.updateCertification(cert.id, { issuer: e.target.value })}
          />
          <input
            type="text"
            placeholder="Date"
            value={cert.date}
            oninput={(e) => cvStore.updateCertification(cert.id, { date: e.target.value })}
          />
          <input
            type="text"
            placeholder="URL (optional)"
            value={cert.url}
            oninput={(e) => cvStore.updateCertification(cert.id, { url: e.target.value })}
          />
        </div>
        <button class="btn-remove" onclick={() => cvStore.removeCertification(cert.id)}>
          Remove Certification
        </button>
      </div>
    {/each}
    <button class="btn-add" onclick={() => cvStore.addCertification()}>+ Add Certification</button>
  </section>

  <section class="section">
    <h3>Consent Statement (GDPR)</h3>
    <p class="section-hint">
      Optional statement for data processing consent, typically required for CVs in Europe.
    </p>
    <textarea
      placeholder="E.g., I consent to the processing of my personal data for recruitment purposes..."
      value={cvStore.currentCV.consentStatement || ''}
      oninput={(e) => cvStore.updateCV({ consentStatement: e.target.value })}
      rows="3"
    ></textarea>
  </section>
</div>

<style>
  .editor {
    padding: 2rem;
    max-width: 800px;
  }

  .section {
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: #f8f9fa;
    border-radius: 8px;
  }

  h2 {
    margin-top: 0;
    margin-bottom: 2rem;
    color: #333;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: #555;
    font-size: 1.2rem;
  }

  .section-hint {
    margin: 0 0 1rem 0;
    color: #666;
    font-size: 0.9rem;
    line-height: 1.5;
  }

  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  input, textarea {
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    font-family: inherit;
    width: 100%;
    box-sizing: border-box;
  }

  input:focus, textarea:focus {
    outline: none;
    border-color: #4CAF50;
  }

  textarea {
    grid-column: 1 / -1;
    resize: vertical;
  }

  .entry {
    padding: 1rem;
    background: white;
    border-radius: 4px;
    margin-bottom: 1rem;
    border-left: 3px solid #4CAF50;
  }

  .checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    grid-column: 1 / -1;
  }

  .checkbox-label input {
    width: auto;
  }

  .btn-add {
    background: #4CAF50;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    width: 100%;
  }

  .btn-add:hover {
    background: #45a049;
  }

  .btn-remove {
    background: #f44336;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    margin-top: 0.5rem;
  }

  .btn-remove:hover {
    background: #da190b;
  }

  .tags-input {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .tags-input input {
    flex: 1;
  }

  .tags-input button {
    background: #2196F3;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    cursor: pointer;
  }

  .tags-input button:hover {
    background: #0b7dda;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .tag {
    background: #e3f2fd;
    color: #1976D2;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }

  .tag button {
    background: none;
    border: none;
    color: #1976D2;
    cursor: pointer;
    font-size: 1.2rem;
    padding: 0;
    line-height: 1;
  }

  .tag button:hover {
    color: #f44336;
  }
</style>
