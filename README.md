# Natya Boutique

Natya Boutique is a responsive React storefront for dancers shopping for traditional Indian classical dance costumes and accessories. It supports the complete customer journey: discovering products, searching the catalog, viewing details, managing a cart, validating checkout information, placing an order, and reviewing order history.

## User stories

- As a shopper, I can browse costumes and accessories so I can compare products.
- As a shopper, I can search by name, category, or description.
- As a shopper, I can inspect product details before buying.
- As a shopper, I can add, remove, and change cart quantities.
- As a shopper, I receive specific guidance when form input is invalid.
- As a shopper, I can submit a contact request and receive confirmation.
- As a shopper, my cart and order history remain after a refresh.
- As a mobile user, I can navigate through a responsive menu.

## Features

- Responsive desktop, tablet, and mobile layouts
- React Router navigation with a friendly 404 page
- Reusable `Button`, `ProductCard`, and `SearchBar` components
- Catalog search with empty-result recovery
- Product-detail pages with invalid-ID handling
- Cart state shared through Context and a custom `useCart` hook
- Quantity limits from 1–99 and consistently formatted currency
- Persistent cart and order history using `localStorage`
- Accessible checkout and contact validation
- Order confirmation with a unique confirmation number
- Automated component and user-flow tests

## Architecture and decisions

The project separates responsibilities by concern:

- `src/components` contains reusable UI components.
- `src/pages` contains route-level screens.
- `src/context` owns shared cart and order state.
- `src/hooks` provides a safe interface to shared state.
- `src/data` contains catalog data independently of the UI.
- `src/test` contains behavior-focused tests.

The cart context uses immutable updates so React detects changes reliably. Context is appropriate because cart and order information is needed across unrelated routes. Browser storage provides persistence for this front-end MVP; a production store would use an authenticated API and database.

Product cards receive data and handlers through props. This keeps them reusable across Browse and Search Results. Forms use application validation instead of only browser validation, allowing field-specific, accessible messages.

## Error handling and edge cases

- Missing or malformed stored data falls back to an empty collection.
- Cart quantities are clamped to the valid range of 1–99.
- Empty carts cannot submit orders.
- Invalid product IDs show recovery navigation instead of crashing.
- Checkout reports errors next to each invalid field.
- Direct confirmation-page navigation displays a safe fallback.
- Empty search results explain the problem and link back to products.
- Unknown URLs render the Not Found page.

## Run locally

Requirements: Node.js 20 or newer and npm.

```bash
npm install
npm run dev
```

## Quality commands

```bash
npm run lint
npm test
npm run build
npm run preview
```

Lint, tests, and the production build should all complete without errors.

## Manual testing checklist

1. Verify both Home hero links.
2. Search with a name, category, description, and unknown term.
3. Open a product and add it to the cart.
4. Add the same item twice and confirm quantity increases.
5. Try valid, empty, negative, and greater-than-99 quantities.
6. Remove an item and verify two-decimal totals.
7. Refresh with items in the cart and confirm persistence.
8. Submit Checkout empty and verify four specific errors.
9. Correct every field and place an order.
10. Confirm the cart clears and the order persists under My Orders.
11. Submit Contact with invalid and valid values.
12. Test `/product/99999` and an unknown route.
13. Test the hamburger menu below 768 px.
14. Directly refresh `/about`, `/browse`, and `/product/1` after deployment.

## Deployment

For Netlify, use `npm run build` as the build command and `dist` as the publish directory. Configure the host to redirect application routes to `index.html` so React Router routes work when refreshed.

## Production limitations

This is a front-end educational MVP. Authentication, payments, inventory, messages, and orders are not connected to external services. Payment choices are demonstrations only; no payment details are collected.
