# Application Architecture Documentation

## Overview

This document provides an overview of the application's structure and architecture. The application follows a component-based structure and uses dedicated pages and shared UI components to keep the code modular and maintainable.

## High-Level Structure

```
src/
└── app/
    ├── components/
    │   ├── login-form/
    │   ├── nav-bar/
    │   ├── nav-link/
    │   └── register-form/
    ├── pages/
    │   ├── home-page/
    │   ├── login-page/
    │   └── register-page/
    ├── app.config.ts
    ├── app.html
    ├── app.routes.ts
    ├── app.scss
    ├── app.spec.ts
    └── app.ts
```

## App Root (`<app-root>`)

The root component acts as the global container for the application. It hosts the navigation bar and the router outlet used to load pages.

* **app.html**: Defines the main layout including `<nav-bar/>` and the router outlet.
* **app.ts**: Bootstraps the application.
* **app.routes.ts**: Declares all routes for pages such as Login, Register, and Home.

---

## Components

Reusable UI elements located in `app/components/`.

### 1. `nav-bar` Component

The navigation bar displayed on all pages.

* Contains instances of `<nav-link/>` for navigation.
* Responsible for the top-level navigation layout.

### 2. `nav-link` Component

A simple component representing a button-style navigation link.

* Used inside `<nav-bar/>`.
* Handles active states and routing.

### 3. `login-form` Component

A standalone login form.

* Fields: Email, Password
* Submit button: "Se connecter"
* Used inside the `<login-page/>`.

### 4. `register-form` Component

A standalone registration form.

* Fields: Name, Email, Password
* Submit button: "S'inscrire"
* Used inside the `<register-page/>`.

---

## Pages

Pages act as containers for form components and other page-specific UI.
Located in the directory: `app/pages/`.

### 1. `login-page`

* Displays the `<login-form/>` centered inside the page.
* Injected into the DOM when navigating to `/login`.

### 2. `register-page`

* Displays the `<register-form/>`.
* Route: `/register`.

### 3. `home-page`

* Displays the main home view.
* Route: `/home`.
* Currently mostly empty except navigation bar.

---

## UI Layout (Based on Provided Sketches)

Each page uses a large blue container where forms are centered. The navigation bar appears at the top in a pink container with yellow clickable buttons.

### Common Layout Elements

* **Blue background**: Main content area.
* **Pink nav container**: Navigation bar.
* **Green form container**: Login/Register form areas.
* **Yellow buttons**: Navigation links & submit buttons.

This consistent visual language helps unify the UI.

---

## Routing Architecture

`app.routes.ts` defines the navigation flow:

* `/login` → `<login-page/>`
    ![alt text](docs/login-page.png)
* `/register` → `<register-page/>`
![alt text](docs/register-page.png)
* `/home` → `<home-page/>`
![alt text](docs/home-page.png)


The `<nav-link/>` components used in the `<nav-bar/>` trigger navigation using these routes.

---

## Summary

This application is structured around reusable components and dedicated page containers. Navigation is centralized in the nav bar, and each page focuses solely on displaying the relevant content. Forms are encapsulated in reusable components allowing easy maintenance and future scalability.

This architecture promotes clarity, modularity, and ease of development.
