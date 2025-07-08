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

### Run

```bash
npm start
```

### Run Tests

```bash
npm test
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

- `src/api/route/` - Express route handlers
- `src/database/` - Data access logic
- `data/` - Example data (JSON files)

## Testing

API tests are located in `tests/api/`. Run them with:

```bash
npm test
```
