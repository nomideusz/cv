<script>
  import { cvStore } from '../stores/cvStore.svelte.js';

  let versionName = $state('');
  let showSaveDialog = $state(false);
  let showCopyDialog = $state(false);
  let copyVersionId = $state(null);
  let copyVersionName = $state('');

  function handleSaveVersion() {
    if (versionName.trim()) {
      cvStore.saveVersion(versionName.trim());
      versionName = '';
      showSaveDialog = false;
    }
  }

  function handleLoadVersion(versionId) {
    cvStore.loadVersion(versionId);
  }

  function handleDeleteVersion(versionId) {
    if (confirm('Are you sure you want to delete this version?')) {
      cvStore.deleteVersion(versionId);
    }
  }

  function handleCopyVersion(versionId, originalName) {
    copyVersionId = versionId;
    copyVersionName = `Copy of ${originalName}`;
    showCopyDialog = true;
  }

  function handleConfirmCopy() {
    if (copyVersionName.trim() && copyVersionId) {
      cvStore.copyVersion(copyVersionId, copyVersionName.trim());
      copyVersionName = '';
      copyVersionId = null;
      showCopyDialog = false;
    }
  }

  function handleNewCV() {
    if (confirm('Create a new CV? Unsaved changes will be lost.')) {
      cvStore.createNew();
    }
  }

  function formatDate(isoDate) {
    return new Date(isoDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
</script>

<div class="version-manager">
  <div class="actions">
    <button class="btn-new" onclick={handleNewCV}>New CV</button>
    <button class="btn-save" onclick={() => showSaveDialog = true}>Save Version</button>
  </div>

  {#if showSaveDialog}
    <div class="dialog-overlay" onclick={() => showSaveDialog = false}>
      <div class="dialog" onclick={(e) => e.stopPropagation()}>
        <h3>Save CV Version</h3>
        <input
          type="text"
          placeholder="Version name (e.g., Software Engineer - Tech Corp)"
          bind:value={versionName}
          onkeypress={(e) => e.key === 'Enter' && handleSaveVersion()}
          autofocus
        />
        <div class="dialog-actions">
          <button onclick={() => showSaveDialog = false}>Cancel</button>
          <button class="btn-primary" onclick={handleSaveVersion}>Save</button>
        </div>
      </div>
    </div>
  {/if}

  {#if showCopyDialog}
    <div class="dialog-overlay" onclick={() => showCopyDialog = false}>
      <div class="dialog" onclick={(e) => e.stopPropagation()}>
        <h3>Copy CV Version</h3>
        <p class="dialog-hint">Enter a name for the copied CV version:</p>
        <input
          type="text"
          placeholder="Version name"
          bind:value={copyVersionName}
          onkeypress={(e) => e.key === 'Enter' && handleConfirmCopy()}
          autofocus
        />
        <div class="dialog-actions">
          <button onclick={() => showCopyDialog = false}>Cancel</button>
          <button class="btn-primary" onclick={handleConfirmCopy}>Copy</button>
        </div>
      </div>
    </div>
  {/if}

  {#if cvStore.savedVersions.length > 0}
    <div class="versions-list">
      <h3>Saved Versions</h3>
      {#each cvStore.savedVersions as version (version.id)}
        <div class="version-item" class:active={cvStore.activeVersionId === version.id}>
          <div class="version-info">
            <div class="version-name">{version.versionName}</div>
            <div class="version-meta">
              <span>{version.name || 'Unnamed'}</span>
              <span class="version-date">{formatDate(version.savedAt)}</span>
            </div>
          </div>
          <div class="version-actions">
            {#if cvStore.activeVersionId !== version.id}
              <button class="btn-load" onclick={() => handleLoadVersion(version.id)}>
                Load
              </button>
            {/if}
            <button class="btn-copy" onclick={() => handleCopyVersion(version.id, version.versionName)}>
              Copy
            </button>
            <button class="btn-delete" onclick={() => handleDeleteVersion(version.id)}>
              Delete
            </button>
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <div class="no-versions">
      <p>No saved versions yet. Click "Save Version" to save your current CV.</p>
    </div>
  {/if}
</div>

<style>
  .version-manager {
    padding: 2rem;
    background: #f8f9fa;
    border-radius: 8px;
  }

  .actions {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .btn-new, .btn-save {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 500;
  }

  .btn-new {
    background: #2196F3;
    color: white;
  }

  .btn-new:hover {
    background: #0b7dda;
  }

  .btn-save {
    background: #4CAF50;
    color: white;
  }

  .btn-save:hover {
    background: #45a049;
  }

  .dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .dialog {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    max-width: 500px;
    width: 90%;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  }

  .dialog h3 {
    margin: 0 0 1rem 0;
    color: #333;
  }

  .dialog-hint {
    margin: 0 0 0.75rem 0;
    color: #666;
    font-size: 0.95rem;
    line-height: 1.4;
  }

  .dialog input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    margin-bottom: 1.5rem;
    box-sizing: border-box;
  }

  .dialog input:focus {
    outline: none;
    border-color: #4CAF50;
  }

  .dialog-actions {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
  }

  .dialog-actions button {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
  }

  .dialog-actions button:first-child {
    background: #e0e0e0;
    color: #333;
  }

  .dialog-actions button:first-child:hover {
    background: #d0d0d0;
  }

  .btn-primary {
    background: #4CAF50;
    color: white;
  }

  .btn-primary:hover {
    background: #45a049;
  }

  .versions-list h3 {
    margin: 0 0 1rem 0;
    color: #333;
  }

  .version-item {
    background: white;
    padding: 1rem;
    border-radius: 4px;
    margin-bottom: 0.75rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 2px solid transparent;
    transition: border-color 0.2s;
  }

  .version-item.active {
    border-color: #4CAF50;
    background: #f1f8f4;
  }

  .version-info {
    flex: 1;
  }

  .version-name {
    font-weight: 600;
    color: #333;
    margin-bottom: 0.25rem;
  }

  .version-meta {
    font-size: 0.85rem;
    color: #666;
    display: flex;
    gap: 1rem;
  }

  .version-date {
    font-style: italic;
  }

  .version-actions {
    display: flex;
    gap: 0.5rem;
  }

  .btn-load, .btn-copy, .btn-delete {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
  }

  .btn-load {
    background: #2196F3;
    color: white;
  }

  .btn-load:hover {
    background: #0b7dda;
  }

  .btn-copy {
    background: #FF9800;
    color: white;
  }

  .btn-copy:hover {
    background: #F57C00;
  }

  .btn-delete {
    background: #f44336;
    color: white;
  }

  .btn-delete:hover {
    background: #da190b;
  }

  .no-versions {
    text-align: center;
    padding: 3rem;
    color: #666;
  }

  .no-versions p {
    margin: 0;
  }
</style>
