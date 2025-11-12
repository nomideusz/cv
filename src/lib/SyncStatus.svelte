<script>
  import { cvStore } from '../stores/cvStore.svelte.js';

  let showLoginDialog = $state(false);
  let usernameInput = $state('');
  let isLoggingIn = $state(false);
  let loginError = $state('');

  async function handleLogin() {
    if (!usernameInput.trim()) {
      loginError = 'Please enter a username';
      return;
    }

    try {
      isLoggingIn = true;
      loginError = '';
      await cvStore.login(usernameInput.trim());
      showLoginDialog = false;
      usernameInput = '';
    } catch (error) {
      loginError = 'Failed to login. Make sure the server is running.';
    } finally {
      isLoggingIn = false;
    }
  }

  function handleLogout() {
    if (confirm('Logout from sync? Your CVs will remain saved locally.')) {
      cvStore.logout();
    }
  }

  async function handleSync() {
    await cvStore.loadFromServer();
  }
</script>

<div class="sync-status">
  {#if cvStore.isLoggedIn}
    <div class="status-info">
      <span class="username">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 1.5c-2.67 0-8 1.34-8 4v1.5h16v-1.5c0-2.66-5.33-4-8-4z"/>
        </svg>
        {cvStore.username}
      </span>

      {#if cvStore.syncEnabled}
        <span class="sync-indicator online" title="Synced with database">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M13.468 3.507a.5.5 0 0 1 .025.707l-7 7.5a.5.5 0 0 1-.756-.033l-3-3.5a.5.5 0 1 1 .756-.649L6 9.878l6.693-7.164a.5.5 0 0 1 .775-.207z"/>
          </svg>
          Synced
        </span>
      {:else}
        <span class="sync-indicator offline" title="Not connected to database">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM4.5 7.5a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7z"/>
          </svg>
          Offline
        </span>
      {/if}

      {#if cvStore.isSyncing}
        <span class="syncing">Syncing...</span>
      {/if}

      {#if cvStore.syncError}
        <span class="error" title={cvStore.syncError}>⚠ Error</span>
      {/if}
    </div>

    <div class="actions">
      {#if cvStore.syncEnabled}
        <button class="btn-sync" onclick={handleSync} disabled={cvStore.isSyncing}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
            <path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
          </svg>
          Sync
        </button>
      {/if}
      <button class="btn-logout" onclick={handleLogout}>Logout</button>
    </div>
  {:else}
    <button class="btn-login" onclick={() => showLoginDialog = true}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 1.5c-2.67 0-8 1.34-8 4v1.5h16v-1.5c0-2.66-5.33-4-8-4z"/>
      </svg>
      Login to Sync
    </button>
  {/if}
</div>

{#if showLoginDialog}
  <div class="dialog-overlay" onclick={() => showLoginDialog = false}>
    <div class="dialog" onclick={(e) => e.stopPropagation()}>
      <h3>Login to Sync CVs</h3>
      <p class="dialog-description">
        Enter a username to sync your CVs across different browsers and devices.
        Your CVs will be stored in a database on the server.
      </p>

      {#if loginError}
        <div class="error-message">{loginError}</div>
      {/if}

      <input
        type="text"
        placeholder="Username (e.g., john_doe)"
        bind:value={usernameInput}
        onkeypress={(e) => e.key === 'Enter' && !isLoggingIn && handleLogin()}
        disabled={isLoggingIn}
      />

      <div class="dialog-actions">
        <button onclick={() => showLoginDialog = false} disabled={isLoggingIn}>
          Cancel
        </button>
        <button
          class="btn-primary"
          onclick={handleLogin}
          disabled={isLoggingIn || !usernameInput.trim()}
        >
          {isLoggingIn ? 'Logging in...' : 'Login'}
        </button>
      </div>

      <p class="dialog-note">
        <strong>Note:</strong> Make sure the server is running with <code>npm run dev</code>
      </p>
    </div>
  </div>
{/if}

<style>
  .sync-status {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem 1rem;
    background: #f8f9fa;
    border-radius: 4px;
  }

  .status-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex: 1;
  }

  .username {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 500;
    color: #333;
  }

  .sync-indicator {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.85rem;
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
  }

  .sync-indicator.online {
    background: #d4edda;
    color: #155724;
  }

  .sync-indicator.offline {
    background: #f8d7da;
    color: #721c24;
  }

  .syncing {
    font-size: 0.85rem;
    color: #666;
    font-style: italic;
  }

  .error {
    font-size: 0.85rem;
    color: #dc3545;
  }

  .actions {
    display: flex;
    gap: 0.5rem;
  }

  .btn-login, .btn-logout, .btn-sync {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 500;
  }

  .btn-login {
    background: #4CAF50;
    color: white;
  }

  .btn-login:hover {
    background: #45a049;
  }

  .btn-sync {
    background: #2196F3;
    color: white;
  }

  .btn-sync:hover:not(:disabled) {
    background: #0b7dda;
  }

  .btn-sync:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .btn-logout {
    background: #6c757d;
    color: white;
  }

  .btn-logout:hover {
    background: #5a6268;
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
    margin: 0 0 0.5rem 0;
    color: #333;
  }

  .dialog-description {
    color: #666;
    font-size: 0.9rem;
    margin: 0 0 1.5rem 0;
    line-height: 1.5;
  }

  .error-message {
    background: #f8d7da;
    color: #721c24;
    padding: 0.75rem;
    border-radius: 4px;
    margin-bottom: 1rem;
    font-size: 0.9rem;
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

  .dialog input:disabled {
    background: #f5f5f5;
    cursor: not-allowed;
  }

  .dialog-actions {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    margin-bottom: 1rem;
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

  .dialog-actions button:first-child:hover:not(:disabled) {
    background: #d0d0d0;
  }

  .dialog-actions button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .btn-primary {
    background: #4CAF50;
    color: white;
  }

  .btn-primary:hover:not(:disabled) {
    background: #45a049;
  }

  .dialog-note {
    font-size: 0.85rem;
    color: #666;
    margin: 0;
    padding: 0.75rem;
    background: #f8f9fa;
    border-radius: 4px;
  }

  .dialog-note code {
    background: #e9ecef;
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
    font-family: 'Courier New', monospace;
  }
</style>
