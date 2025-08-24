# Airtable MCP

An MCP (Model Context Protocol) server that provides tools for interacting with Airtable bases and schemas.

## Overview

This project implements an xMCP application that allows AI assistants to interact with Airtable.

## Features

- 🗃️ List all accessible Airtable bases
- 📋 Retrieve detailed schema information for any base
- 🔒 Secure authentication using Airtable API keys
- 🚀 Built with TypeScript and xMCP framework
- 🔧 HTTP server support for easy integration

## Prerequisites

- Node.js >= 20.0.0
- Airtable API key
- Access to Airtable bases

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd airtable-mcp
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env` file in the root directory with:

```env
AIRTABLE_API_KEY=your_airtable_api_key_here
AIRTABLE_API_URL=https://api.airtable.com
```

## Getting Started

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
npm start
```

## Available Tools

### `listBases`

- **Description**: List all Airtable bases owned by the user
- **Parameters**: None
- **Returns**: JSON array of bases with their metadata

### `getBaseSchema`

- **Description**: Get the schema of a specific Airtable base
- **Parameters**:
  - `baseId` (string): The ID of the Airtable base
- **Returns**: JSON object containing the base's table schemas

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the project for production
- `npm start` - Start the production HTTP server
- `npm run lint` - Run TypeScript type checking

## Project Structure

```
airtable-mcp/
├── src/
│   └── tools/
├── package.json
├── xmcp.config.ts           # xMCP configuration
└── tsconfig.json           # TypeScript configuration
```

This project uses the structured approach where tools are automatically discovered from the `src/tools` directory. Each tool is defined in its own file with the following structure:

```typescript
import { type ToolMetadata, InferSchema } from "xmcp";
import { z } from "zod";

// Define the schema for tool parameters (optional)
export const schema = {
  baseId: z.string(),
};

// Define tool metadata
export const metadata: ToolMetadata = {
  name: "getBaseSchema",
  description: "List the schema of the base owned by the user",
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
  },
};

// Tool implementation
export default async function getBaseSchema(args: InferSchema<typeof schema>) {
  // Implementation here
}
```

## Dependencies

- **airtable**: Official Airtable JavaScript client
- **xmcp**: xMCP framework for building MCP servers
- **zod**: Runtime type validation

## Learn More

- [xmcp Documentation](https://xmcp.dev/docs)
- [Airtable API Documentation](https://airtable.com/developers/web/api/introduction)
