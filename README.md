# EssayPulse

A narrative writing practice app that helps students improve their storytelling skills with real-time AI feedback.

## Features

- **Prompt Selector**: Choose from 25 narrative writing prompts across 5 categories
- **Rich Text Editor**: Write with a distraction-free Tiptap editor
- **AI Feedback**: Get scored on 6 narrative writing traits with detailed feedback
- **Auto-Save**: Your essays are automatically saved as you write
- **Progress Tracking**: See your scores improve with each revision

## Tech Stack

- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Convex (database + serverless functions)
- **Editor**: Tiptap
- **AI**: OpenAI GPT-4

## Getting Started

### Prerequisites

- Node.js 18+
- A Convex account (free at [convex.dev](https://convex.dev))
- An OpenAI API key

### Installation

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Start the Convex development server:

```bash
npx convex dev
```

This will prompt you to log in to Convex and create a new project. It will also create a `.env.local` file with your `VITE_CONVEX_URL`.

3. Add your OpenAI API key to Convex:

Go to your [Convex dashboard](https://dashboard.convex.dev), select your project, go to Settings > Environment Variables, and add:

```
OPENAI_API_KEY=your_openai_api_key_here
```

4. In a new terminal, start the Vite development server:

```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Writing Traits

Essays are evaluated on 6 narrative writing traits:

1. **Hook & Opening** - Does the opening grab attention?
2. **Story Structure** - Is there a clear beginning, middle, and end?
3. **Descriptive Details** - Are vivid sensory details used?
4. **Transitions** - Do ideas flow smoothly?
5. **Voice & Tone** - Is there an authentic, consistent voice?
6. **Conclusion** - Does the ending provide closure and reflection?

## Project Structure

```
├── src/
│   ├── components/     # React components
│   ├── pages/          # Page components
│   ├── lib/            # Utilities and data
│   ├── App.tsx         # Router setup
│   └── main.tsx        # Entry point
├── convex/
│   ├── schema.ts       # Database schema
│   ├── essays.ts       # Essay CRUD operations
│   └── feedback.ts     # OpenAI integration
└── ...config files
```

## License

MIT
