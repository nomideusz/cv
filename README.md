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
- **Local Storage**: Automatic saving to browser localStorage - your data never leaves your device
- **Print-Ready**: Professional print layout with proper styling for physical CVs
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Svelte 5** with runes (modern reactive state management)
- **Vite** for fast development and optimized builds
- **Vanilla CSS** for styling (no external CSS frameworks)

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
```bash
npm run dev
```

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

### Editing Your CV

1. Navigate to the **Edit** tab
2. Fill in your personal information, experience, education, skills, etc.
3. Your data is automatically saved to localStorage

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

All CV data is stored in your browser's localStorage:
- `cv-current`: The currently active CV
- `cv-versions`: All saved CV versions
- `cv-active-id`: The ID of the currently loaded version

Your data never leaves your device and is not sent to any server.

## Project Structure

```
src/
├── lib/
│   ├── CVEditor.svelte       # CV editing form
│   ├── CVPreview.svelte      # Professional CV preview
│   └── VersionManager.svelte # Version management UI
├── stores/
│   └── cvStore.svelte.js     # State management with Svelte 5 runes
├── App.svelte                # Main application component
├── app.css                   # Global styles
└── main.js                   # Application entry point
```

## Future Enhancements

Potential features for future versions:
- Export to PDF directly
- Multiple CV templates/themes
- Import from LinkedIn
- Collaboration features for multiple users
- Cloud storage/backup options
- AI-powered content suggestions

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
