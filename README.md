# Resource Sharing System

A simple Node.js/Express API for managing resources, users, groups, and access rules.

## Overview

This project provides a RESTful API to:
- List resources and users
- Query which users have access to a resource
- Query which resources a user can access
- Get aggregated counts for users and resources

All data is loaded from JSON files for easy prototyping and testing.

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm

### Installation

```bash
npm install
```

### Running the App

- **Development:**  
  `npm run serve`
- **Production:**  
  `npm run build && npm start`

### Testing

Run all API tests with:

```bash
npm test
```

## API Endpoints

- **GET `/resources/with-user-count`**  
  Returns all resources, each with a `userCount` property.

- **GET `/users/with-resource-count`**  
  Returns all users, each with a `resourceCount` property.

- **GET `/resource/:id/access-list`**  
  Returns a list of user IDs who have access to the resource.

- **GET `/user/:id/resources`**  
  Returns a list of resource IDs accessible by the user.

## Project Structure

- `src/api/route/` — API route handlers
- `src/api/utils/` — API utility functions
- `src/database/` — Data access logic (reads from JSON files)
- `src/cache/` — Caching logic
- `src/schema/` — Type definitions and schemas
- `data/` — Example data (JSON files)
- `tests/` — API tests
- `app.ts` — Main app entry point

## License

MIT
