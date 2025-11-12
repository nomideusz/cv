# CV Maker - Svelte 5

A professional CV/Resume maker built with Svelte 5 (using runes). Create, edit, and manage multiple versions of your CV with ease.

## Features

- **Professional CV Design**: Clean, print-friendly CV layout optimized for both screen and paper
- **Comprehensive Data Management**: Add and edit all CV sections:
  - Personal information
  - Contact details
  - Professional summary
  - Work experience
  - Education
  - Skills
  - Languages
  - Certifications
- **Version Management**: Save and manage multiple versions of your CV for different job applications
- **Database Sync**: Optional database synchronization to access your CVs from different browsers and devices
- **Local Storage**: Works offline with automatic localStorage backup
- **Print-Ready**: Professional print layout with proper styling for physical CVs
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

### Frontend
- **Svelte 5** with runes (modern reactive state management)
- **Vite** for fast development and optimized builds
- **Vanilla CSS** for styling (no external CSS frameworks)

### Backend (Optional)
- **Express.js** for API server
- **SQLite** (better-sqlite3) for database storage
- **CORS** enabled for cross-origin requests

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cv
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:

**Option A: With database sync (frontend + backend)**
```bash
npm run dev
```
This will start both the Vite dev server (port 5173) and the Express backend (port 3001).

**Option B: Frontend only (no database sync)**
```bash
npm run dev:client
```
This will start only the Vite dev server. CVs will be stored in browser localStorage only.

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Usage

### Database Sync (Optional)

If you're running the backend server, you can enable database sync to access your CVs from different browsers:

1. Make sure the backend is running (`npm run dev` or `npm run dev:server`)
2. Click **Login to Sync** in the sync status area
3. Enter a username (e.g., "john_doe")
4. Your local CVs will be automatically synced to the database
5. Use the same username on any other browser to access your CVs

**Benefits:**
- Access your CVs from different browsers and devices
- Automatic synchronization when you save versions
- Your data is backed up on the server

**Note:** You can still use the app without logging in. All data will be stored locally in your browser.

### Editing Your CV

1. Navigate to the **Edit** tab
2. Fill in your personal information, experience, education, skills, etc.
3. Your data is automatically saved to localStorage (and synced to database if logged in)

### Managing Versions

1. Navigate to the **Versions** tab
2. Click **Save Version** to save the current CV with a name (e.g., "Software Engineer - Tech Corp")
3. Load saved versions by clicking the **Load** button
4. Delete versions you no longer need
5. Create a new blank CV with the **New CV** button

### Previewing and Printing

1. Navigate to the **Preview** tab to see your CV in its final format
2. Click the **Print CV** button in the header to print or save as PDF
3. The print layout is optimized for A4 paper size

## Data Storage

### Local Storage (Always Active)

All CV data is stored in your browser's localStorage:
- `cv-current`: The currently active CV
- `cv-versions`: All saved CV versions
- `cv-active-id`: The ID of the currently loaded version
- `cv-username`: Your username (if logged in)
- `cv-user-id`: Your user ID (if logged in)

### Database Storage (Optional)

When logged in, your CVs are also stored in a SQLite database:
- Location: `server/cv-database.db`
- Tables: `users` and `cvs`
- Automatic sync when saving/deleting versions

**Important:** The database file is git-ignored and stays on your local server. To deploy with database sync, you'll need to set up your own backend server.

## Project Structure

```
src/
├── lib/
│   ├── CVEditor.svelte       # CV editing form
│   ├── CVPreview.svelte      # Professional CV preview
│   ├── VersionManager.svelte # Version management UI
│   └── SyncStatus.svelte     # Database sync UI
├── stores/
│   └── cvStore.svelte.js     # State management with Svelte 5 runes
├── services/
│   └── api.js                # API service for backend communication
├── App.svelte                # Main application component
├── app.css                   # Global styles
└── main.js                   # Application entry point

server/
├── server.js                 # Express API server
├── database.js               # SQLite database setup and operations
└── cv-database.db            # SQLite database (auto-created, git-ignored)
```

## Future Enhancements

Potential features for future versions:
- Export to PDF directly
- Multiple CV templates/themes
- Import from LinkedIn
- Password protection for user accounts
- Cloud hosting options (AWS, Heroku, etc.)
- AI-powered content suggestions
- Rich text editor for descriptions
- Drag-and-drop section reordering

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
