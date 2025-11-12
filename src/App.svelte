<script>
  import CVEditor from './lib/CVEditor.svelte';
  import CVPreview from './lib/CVPreview.svelte';
  import VersionManager from './lib/VersionManager.svelte';

  let activeTab = $state('edit');

  function handlePrint() {
    window.print();
  }
</script>

<div class="app">
  <header class="app-header">
    <h1>CV Maker</h1>
    <button class="btn-print" onclick={handlePrint}>Print CV</button>
  </header>

  <nav class="tabs">
    <button
      class="tab"
      class:active={activeTab === 'edit'}
      onclick={() => activeTab = 'edit'}
    >
      Edit
    </button>
    <button
      class="tab"
      class:active={activeTab === 'preview'}
      onclick={() => activeTab = 'preview'}
    >
      Preview
    </button>
    <button
      class="tab"
      class:active={activeTab === 'versions'}
      onclick={() => activeTab = 'versions'}
    >
      Versions
    </button>
  </nav>

  <div class="content">
    {#if activeTab === 'edit'}
      <CVEditor />
    {:else if activeTab === 'preview'}
      <CVPreview />
    {:else if activeTab === 'versions'}
      <VersionManager />
    {/if}
  </div>
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    background: #f0f2f5;
  }

  :global(*) {
    box-sizing: border-box;
  }

  .app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .app-header {
    background: #fff;
    padding: 1.5rem 2rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .app-header h1 {
    margin: 0;
    color: #333;
    font-size: 1.5rem;
  }

  .btn-print {
    background: #FF9800;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 500;
  }

  .btn-print:hover {
    background: #F57C00;
  }

  .tabs {
    display: flex;
    background: white;
    border-bottom: 2px solid #e0e0e0;
    padding: 0 2rem;
    position: sticky;
    top: 76px;
    z-index: 99;
  }

  .tab {
    background: none;
    border: none;
    padding: 1rem 2rem;
    cursor: pointer;
    font-size: 1rem;
    color: #666;
    border-bottom: 3px solid transparent;
    margin-bottom: -2px;
    transition: all 0.2s;
  }

  .tab:hover {
    color: #333;
    background: #f8f9fa;
  }

  .tab.active {
    color: #4CAF50;
    border-bottom-color: #4CAF50;
    font-weight: 600;
  }

  .content {
    flex: 1;
    overflow-y: auto;
  }

  @media print {
    .app-header,
    .tabs {
      display: none !important;
    }

    .content {
      overflow: visible;
    }

    :global(body) {
      background: white;
    }
  }

  @media (max-width: 768px) {
    .app-header {
      flex-direction: column;
      gap: 1rem;
      align-items: stretch;
    }

    .app-header h1 {
      text-align: center;
    }

    .tabs {
      padding: 0;
    }

    .tab {
      flex: 1;
      padding: 1rem 0.5rem;
    }
  }
</style>
