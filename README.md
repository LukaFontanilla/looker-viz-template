# Looker Custom Visualization Template (React + TypeScript + Visx)

This repository is a "product-ready" template for building custom visualizations in Looker using **React**, **TypeScript**, and **Visx**. It comes with a pre-configured development environment, linting, testing, and a sample bar chart implementation.

## Project Structure

```
.
├── src/
│   ├── components/       # React components (Chart, Layout, DrillableCell)
│   ├── hooks/            # Custom React hooks
│   ├── styles/           # CSS files
│   ├── utils/            # Helper functions (Data transformation, etc.)
│   ├── types.ts          # TypeScript interfaces for Looker API
│   ├── custom_viz_container.tsx # Main entry point for Looker
├── .eslintrc.js          # Linting configuration
├── .prettierrc.js        # Formatting configuration
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── vitest.config.ts      # Test runner configuration
├── webpack.config.js     # Webpack configuration for bundling
```

## Getting Started

### Prerequisites

- Node.js (v16 or later recommended)
- npm

### Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally

To start the development server:

```bash
npm start
```

This will start a local webpack server (usually at `https://localhost:8080`). You can then point your Looker instance to this URL for development.

## Development Workflow

### Linting

Ensure your code follows the project's style guide:

```bash
npm run lint
# or to fix automatically
npm run lint:fix
```

### Testing

Run unit tests using Vitest:

```bash
npm test
```

### Building

To create a production build (outputs to `dist/`):

```bash
npm run build
```

## Customization

### Modifying the Visualization

The core logic lives in `src/components/LookerCustomViz.tsx` and `src/components/BarChart.tsx`.

- **LookerCustomViz.tsx**: Handles the high-level layout and data extraction.
- **BarChart.tsx**: A Visx-based bar chart component.
- **data_transforms.ts**: Helper to convert Looker's `VisData` into a format suitable for the chart.

To create a new visualization type, you can replace `BarChart.tsx` with your own component (e.g., using Visx, D3, or another library) and update the data transformation logic.

### Adding Options

You can add new configuration options in `src/custom_viz_container.tsx` inside the `options` object. These will appear in the Looker UI.

## Deployment

1. Run `npm run build`.
2. Host the generated `dist/bundle.js` (or similar) on a web server or CDN.
3. In Looker, add a new visualization in the Admin panel pointing to your hosted script.

## Resources

- [Looker Custom Visualizations Documentation](https://developers.looker.com/marketplace/site/custom-visualizations)
- [Visx Documentation](https://airbnb.io/visx/)
- [React Documentation](https://reactjs.org/)
