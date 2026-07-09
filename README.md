# Taraka

An open-source on-device coding agent that runs entirely in your terminal.

## Features

- **AI-powered coding assistant** — automated code writing, editing, and research
- **Dual modes**: `PLAN` (read-only analysis) and `BUILD` (full read/write/execute)
- **Multi-step tool agent** — autonomously read, write, edit files and run commands until the task is done (up to 25 steps)
- **Multiple LLM providers**: OpenAI, Anthropic (Claude), Google Gemini, OpenRouter, Groq, Mistral
- **7 local tools**: `readFile`, `listDirectory`, `glob`, `grep`, `writeFile`, `editFile`, `bash` — all sandboxed to your project directory
- **Persistent sessions** — conversation history stored locally in your home directory (`~/.taraka/sessions`)
- **32 themes** — Taraka (default), Nightfox, Catppuccin, Dracula, Tokyo Night, Nord, and many more
- **Terminal UI** — built with OpenTUI with mouse support, scrollable messages, dialogs, and toast notifications
- **Theme persistence** — saved to `~/.taraka/preferences.json`
- **Command palette** — `Shift+Tab` to open quick actions

## Install & Setup

### Prerequisites

- [Bun](https://bun.sh/) 1.x or later

### Quick Start

```bash
# Install dependencies
bun install

# Run the CLI
# On Windows:
taraka.bat

# On macOS/Linux:
bun run dev:cli
```

### Configure an LLM Provider

1. Open the command palette (`Shift+Tab`)
2. Select **LLM Providers**
3. Choose a provider (e.g. Gemini, OpenAI, Anthropic)
4. Enter your API key
5. Choose a model

## Usage

| Key            | Action                       |
| -------------- | ---------------------------- |
| `Tab`          | Toggle mode (PLAN / BUILD)   |
| `Shift+Tab`    | Open command palette         |
| `Enter`        | Submit prompt                |
| `Shift+Enter`  | New line                     |
| `/` (at start) | Open command palette         |
| `Esc`          | Close dialog / interrupt     |
| Mouse          | Click items, scroll messages |

### Modes

**PLAN** — the agent can only read files and search the codebase. Use this to ask questions, review code, or plan changes.

**BUILD** — the agent gets full read/write/execute access. It can edit files, create new ones, and run shell commands.

## Project Structure

```
taraka/
├── packages/
│   ├── cli/              # Terminal UI app (OpenTUI + React)
│   ├── core/api/         # Core engine (AI, config, tools)
│   └── shared/           # Shared types and schemas
```

## Themes

Browse and select themes via the command palette. All 32 themes are defined in `packages/cli/src/themes/presets.ts`.

## License

MIT
