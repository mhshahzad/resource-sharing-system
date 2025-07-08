# Resource Sharing System

A simple Node.js/Express API for managing resources, users, groups, and access rules.

## Features

- List resources and users
- Query which users have access to a resource
- Query which resources a user can access
- Aggregated endpoints for user/resource counts

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm

### Install

```bash
npm install
```

## Scripts

- **`npm run build`**: Compile TypeScript source files into JavaScript in the `dist/` directory.
- **`npm run serve`**: Run the app directly using `ts-node` (without building), useful for development.
- **`npm start`**: Run the compiled app from the `dist/` directory.
- **`npm test`**: Run the test suite.

## API Endpoints

### Get all resources with user count

```
GET /resources/with-user-count
```

Returns all resources, each with a `userCount` property.

### Get all users with resource count

```
GET /users/with-resource-count
```

Returns all users, each with a `resourceCount` property.

### Get users with access to a resource

```
GET /resource/:id/access-list
```

Returns a list of user IDs who have access to the resource.

### Get resources accessible by a user

```
GET /user/:id/resources
```

Returns a list of resource IDs accessible by the user.

## Project Structure

- `src/api/route/` - API route handlers
- `src/api/utils/` - API utility functions
- `src/database/` - Data access logic (reads from JSON files)
- `src/cache/` - Caching logic
- `src/schema/` - Type definitions and schemas
- `data/` - Example data (JSON files)
- `tests/` - API tests
- `app.ts` - Main app entry point

> The codebase is modular: API logic is separated from data access and caching. All data is loaded from JSON files for simplicity.

## Testing

API tests are located in `tests/api/`. Run them with:

```bash
npm test
```
