# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the project for production (outputs to `dist/`)  
- `npm start` - Start the production HTTP server (`node dist/http.js`)
- `npm run lint` - Run TypeScript type checking (equivalent to `tsc --noEmit`)

## Architecture Overview

This is an xMCP (Model Context Protocol) application that provides Airtable integration tools. The project uses a structured approach where tools are automatically discovered from the `src/tools/` directory.

### Tool Structure Pattern

Each tool file in `src/tools/` must export:
- `metadata`: ToolMetadata object with name, description, and annotations
- `schema` (optional): Zod schema for input parameters  
- `default export`: Async function implementing the tool logic

Tools that require parameters use `InferSchema<typeof schema>` for type-safe argument handling.

### Environment Configuration

The application requires two environment variables:
- `AIRTABLE_API_KEY` - Airtable API authentication token
- `AIRTABLE_API_URL` - Base URL for Airtable API (typically `https://api.airtable.com`)

### Current Tools

- `listBases`: Fetches all Airtable bases owned by the user (no parameters)
- `getBaseSchema`: Fetches table schema for a specific base (requires `baseId` parameter)

Both tools make authenticated requests to Airtable's Meta API endpoints and return JSON responses.

## Project Configuration

- **TypeScript**: Targets ES2016, CommonJS modules, strict mode enabled
- **xMCP**: HTTP transport enabled in `xmcp.config.ts`  
- **Build Output**: Compiled JavaScript goes to `dist/` directory
- **Dependencies**: Core dependencies are `airtable`, `xmcp`, and `zod`

## Key Files

- `xmcp.config.ts` - xMCP framework configuration
- `xmcp-env.d.ts` - Auto-generated type definitions (do not edit)
- `src/tools/` - Tool implementations auto-discovered by xMCP