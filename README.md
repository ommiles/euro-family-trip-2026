# EURO SPACE CAMP - Trip Planner

A beautiful, interactive questionnaire app designed to help plan a family trip to Europe (Belgium & Paris) in 2026. The app collects preferences about budget, experiences, accommodations, comfort needs, and Paris-specific activities, then generates a formatted summary that can be copied or emailed.

## 🌟 Overview

**EURO SPACE CAMP** is a multi-step trip planning questionnaire that helps Tyler and Nova (parent and child) communicate their travel preferences to Lib, the trip planner. The app guides users through 7 comprehensive steps, collecting detailed information about their ideal European vacation experience.

## ✨ Features

### Multi-Step Questionnaire

- **Budget Framework**: Select total trip budget, vegan meal approach, and budget focus priorities
- **Experience Priorities**: Rank preferences for cobblestone towns, city days, forests, markets, vegan bistros, art, and science museums
- **Accommodation Style**: Rank preferences for hotels, B&Bs, apartments, and unique stays
- **Environment & Comfort**: Select comfort preferences and rate sensitivities (noise, crowds, scents, lighting, cleanliness, etc.)
- **Paris & Eiffel Tower**: Detailed preferences for Eiffel Tower visit timing, going up vs. viewing, picnic preferences, photos, and Paris must-dos
- **Nova's Preferences**: Rank activities for Nova (learning, adventure, fun, chill days) and energy level
- **Summary & Email**: Auto-generated formatted summary with copy-to-clipboard and email functionality

### User Experience

- 🎨 Beautiful, modern UI with warm color palette (amber/slate theme)
- 📱 Fully responsive design with mobile navigation drawer
- 🖼️ Image galleries showcasing Belgium and Paris destinations
- ✏️ Editable summary text before sharing
- 🧭 Step-by-step navigation with progress indicators
- 💾 State persistence throughout the questionnaire

## 🛠️ Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4
- **Testing**: Playwright
- **Deployment**: GitHub Pages

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm test

# Run tests with UI
npm run test:ui

# Deploy to GitHub Pages
npm run deploy
```

## 🏗️ Project Structure

```
euro-family-trip-2026/
├── src/
│   ├── App.jsx          # Main application component with all steps
│   ├── App.css          # Component-specific styles
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles
├── public/
│   └── images/          # Belgium and Paris destination images
├── tests/
│   └── summary-email.spec.js  # Playwright E2E tests
├── dist/                # Production build output
└── package.json         # Dependencies and scripts
```

## 🎯 User Flow

1. **Budget Step**: User selects total budget, vegan meal approach, and budget focus
2. **Experience Step**: User ranks experience preferences (1-5 scale)
3. **Stay Step**: User ranks accommodation preferences (1-5 scale)
4. **Comfort Step**: User selects environment preferences and rates sensitivities (1-10 scale)
5. **Paris Step**: User selects Eiffel Tower preferences and Paris must-dos
6. **Nova Step**: User ranks Nova's activity preferences and energy level
7. **Summary Step**: App generates formatted summary; user can edit, copy, or email

## 📝 Questionnaire Sections

### Budget & Food

- Total shared budget (excluding $3,000 lodging gift)
- Vegan meal approach: Dining out, Mix, or Self-catering
- Budget focus: Experiences, Comfort, or Balanced

### Experience Priorities

Ranking system (1 = must-do, 5 = nice-to-have):

- Cobblestone river towns
- City days in Paris
- Forests & rivers
- Markets & park picnics
- Vegan bistros & bakeries
- Classic art & architecture
- Science & space museums

### Accommodation Priorities

Ranking system (1 = ideal, 5 = low priority):

- Hotel
- B&B
- Apartment
- Unique stay

### Environment & Comfort

- Multi-select comfort preferences
- Sensitivity ratings (1-10 scale): Noise, Crowds, Scents, Lighting, Cleanliness, Unclear rules
- Mobility comfort: Walking/standing and stairs (1-10 scale)

### Paris & Eiffel Tower

- Eiffel Tower timing preferences
- Going up vs. viewing from ground
- Picnic vs. meal preferences
- Photo priorities
- Paris must-dos (checkboxes)
- Optional notes

### Nova's Preferences

- Activity ranking (1 = favorite, 5 = low priority)
- Big-day energy level (1-10 scale)

## 🧪 Testing

The app includes comprehensive Playwright end-to-end tests covering:

- Navigation between steps
- Summary generation
- Text editing functionality
- Copy-to-clipboard functionality
- Email link generation
- Full user flow validation

Run tests with:

```bash
npm test
```

## 🚀 Deployment

The app is configured for GitHub Pages deployment with the base path `/euro-family-trip-2026/`. Deploy using:

```bash
npm run deploy
```

## 🎨 Design Philosophy

The app uses a warm, inviting color palette with:

- Primary colors: Amber accents for selections and CTAs
- Background: Warm beige gradient (`#f2eee4` to `#f8f4ec`)
- Typography: Serif font for headers, clean sans-serif for content
- Spacing: Generous padding and rounded corners for a friendly feel
- Responsive: Mobile-first design with hamburger menu for navigation

## 📧 Summary Output

The generated summary includes:

- Budget and food preferences
- Ranked experience priorities
- Ranked accommodation preferences
- Environment and comfort selections
- Sensitivity ratings
- Mobility comfort levels
- Paris and Eiffel Tower preferences
- Nova's activity priorities and energy level
- Vegan travel notes

The summary is formatted as plain text and can be edited before copying or emailing.

## 🔧 Configuration

- **Base URL**: Configured in `vite.config.js` for GitHub Pages
- **Email Recipient**: Currently set to `lib@example.com` (update in `App.jsx` line 341)
- **Images**: Stored in `public/images/` and referenced via `import.meta.env.BASE_URL`

### 📊 Google Analytics Setup

The app includes Google Analytics 4 (GA4) for tracking page views. To enable it:

1. **Create a Google Analytics account** (free): https://analytics.google.com/
2. **Create a new GA4 property** for your website
3. **Get your Measurement ID** (format: `G-XXXXXXXXXX`)
4. **Create a `.env` file** in the project root:
   ```bash
   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
5. **Restart your dev server** after adding the `.env` file

The app will automatically track:

- Initial page load
- Each step/page navigation
- Page views with step names

**Note**: The `.env` file is gitignored, so your measurement ID won't be committed to the repository. For production builds, you'll need to set the environment variable in your deployment platform (e.g., GitHub Actions, Netlify, Vercel).

## 📄 License

Private project for family trip planning.

---

Built with ❤️ for planning an amazing European adventure in 2026!
