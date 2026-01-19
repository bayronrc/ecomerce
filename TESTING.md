# Testing Documentation

This document describes the test suites created for the ecommerce application.

## Test Structure

### PHP Tests (Laravel/PHPUnit)

#### CategoryController Tests
**Location:** `tests/Feature/Admin/CategoryControllerTest.php`

Tests for the CategoryController index method covering:
- ✅ Pagination with default parameters (15 items per page)
- ✅ Custom `per_page` parameter handling
- ✅ Custom `page` parameter handling
- ✅ Categories ordered by ID in descending order
- ✅ Query parameters appended to pagination links

**Run PHP tests:**
```bash
php artisan test
# Or specific test file
php artisan test tests/Feature/Admin/CategoryControllerTest.php
```

### Frontend Tests (Vitest + React Testing Library)

#### DataTable Component Tests
**Location:** `resources/js/Components/__tests__/DataTable.test.tsx`

Tests for the DataTable component covering:
- ✅ Renders table with data correctly
- ✅ Displays correct pagination information
- ✅ Pagination controls with correct enabled/disabled state
- ✅ Router navigation with correct parameters
- ✅ Empty state rendering
- ✅ Sorting state initialization
- ✅ Filter state initialization
- ✅ Route parameters handling

#### Categories Index Page Tests
**Location:** `resources/js/Pages/Admin/categories/__tests__/Index.test.tsx`

Tests for the Categories Index page covering:
- ✅ Renders DataTable with categories data
- ✅ Pagination footer with correct data
- ✅ Create category button rendering
- ✅ Correct pagination data passed to footer
- ✅ Empty categories list handling
- ✅ Correct number of categories displayed

#### Columns Definition Tests
**Location:** `resources/js/Pages/Admin/categories/partials/__tests__/columns.test.tsx`

Tests for the columns configuration covering:
- ✅ Correct number of columns defined
- ✅ ID column with correct header
- ✅ Name column with sortable header
- ✅ Sort button functionality
- ✅ Created_at column with formatted dates
- ✅ Updated_at column with formatted dates
- ✅ Actions column configuration
- ✅ All column headers render correctly
- ✅ Category data renders in cells
- ✅ Spanish locale date formatting

**Run frontend tests:**
```bash
npm test
# Or with UI
npm run test:ui
```

## Test Configuration

### Vitest Configuration
**File:** `vitest.config.ts`

Configured with:
- React plugin for JSX/TSX support
- jsdom environment for DOM testing
- Path alias `@` pointing to `resources/js`
- Global test utilities

### Test Setup
**File:** `resources/js/test/setup.ts`

Includes:
- Jest-DOM matchers
- Mocked Inertia `route` helper

## Dependencies

### PHP Testing
- PHPUnit (included with Laravel)
- Laravel Testing utilities
- Inertia test helpers

### Frontend Testing
- vitest
- @testing-library/react
- @testing-library/jest-dom
- jsdom

## Running All Tests

```bash
# Run PHP tests
php artisan test

# Run frontend tests
npm test

# Run both
php artisan test && npm test
```

## Coverage

To generate test coverage reports:

```bash
# Frontend coverage
npm test -- --coverage
```

## CI/CD Integration

These tests can be integrated into your CI/CD pipeline:

```yaml
# Example GitHub Actions
- name: Run PHP Tests
  run: php artisan test

- name: Run Frontend Tests
  run: npm test
```
