# SimonPine - Design

E-commerce simulator builded with React.js and Firestore.

## Deploy

[simonpine-design-admin.netlify.app](https://simonpine-design-admin.netlify.app/)
[![Netlify Status](https://api.netlify.com/api/v1/badges/a253097a-2925-4d33-bb21-7eb6cf663ab0/deploy-status)](https://app.netlify.com/sites/simonpine-design-admin/deploys)

## Description

The e-commerce admin vrew is divided in 5 pages, orders, products, details, categories and companys.
- Orders: Present 3 charts about the sold products, with the posibility of delete old orders.
- Details: It is where the products can be change.
- Products: Is where the items are shown and can be added.
- Categories and companys: Is where the diferent products categories and companys can be deleted, added, and update.

## Libraries

- [Create React App][cra] - Project setup
- [React Router][router] - Routing and navigation
- [Chart][chart] - Bar charts

## Scripts

- `npm start`
    Start the project in the development enviroment.
- `npm build`
    Build the project for production.
- `npm test`
    Start the project and run tests.

## Prerequisites

- [Visual Studio Code](https://code.visualstudio.com/)
- [Node.js](https://nodejs.org)

## Contact

- https://twitter.com/SimonPine2
- simonpineda0521@gmail.com
- https://www.linkedin.com/in/simon-pineda-0b8abb251

## Folder Structure

- `src`: Contains all the source code.
    - `components`: General components used across the app.
    - `views`: Specific components organized by view.
- `App.js`: Main component.

[chart]: https://recharts.org/en-US/
[deploy]: https://simonpine-design.netlify.app/
[status]: https://api.netlify.com/api/v1/badges/a253097a-2925-4d33-bb21-7eb6cf663ab0/deploy-status
[netlify]: https://app.netlify.com/sites/simonpine-design/deploys
[cra]: https://github.com/facebook/create-react-app
[router]: https://github.com/remix-run/react-router
