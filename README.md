# Mozshops-Plugins SDK Documentation

## Overview
Mozshops-Plugins is a framework designed to facilitate the creation of custom plugins and themes for [Mozshops.store](https://mozshops.store). It provides a streamlined way to design and deploy plugins with customized functionality and themes for online stores.

---

## Features
- Create custom plugins and themes.
- Use familiar Node.js and EJS templating for development.
- Manage and display store data dynamically.
- Easy setup and deployment with CLI commands.

---

## Requirements
- **Node.js**: Ensure Node.js is installed on your system.
- **NPM**: Comes with Node.js installation.

---

## Installation
To install the Mozshops-Plugins SDK, run:

```bash
npm install mozshops-plugins
```

---

## Getting Started
### Initialize a Project
To start a new project, use the command:

```bash
ms-plugins --init
```

This will create a new project directory. The directory name will be used as the **ID** for the theme, so it is important to name it as `<project_name>.theme`.

Example:

```bash
mkdir my-theme.theme && cd my-theme.theme
ms-plugins --init
```

### Project Structure
Upon initialization, the following files will be created:
- **plugin.json**: Manifest file for the plugin.
- **theme.json**: Configuration file for the theme.

An example `plugin.json` file:

```json
{
    "id": "default.theme",
    "name": "plugin",
    "version": "1.0",
    "type": "theme",
    "author": "author",
    "description": "Tema claro elegante e moderno para todo o tipo de lojas",
    "preview": "/docs/pcontent/default.theme/preview.jpg"
}
```

An example `theme.json` file:

```json
{
    "pageRoot": "./views", // Directory containing view files 
    "@pages": {
        "home": "home.html" //  Initial page within the views folder 
    },
    "static": "./public/" // Directory containing static assets 
}
```

---

## Template Engine
The SDK uses EJS templating with the following modifications:

### Supported Features
- All standard EJS features.

### Differences
- `include` is replaced by `link()`.
- Use `link_to(asset)` to return the URL of a specific static asset.

### Example Usage
Data placeholders for the shop and products can be used as follows:

```html
<h1>Welcome to <%= shop[0].shop_name %></h1>
<p>Description: <%= shop[0].shop_description %></p>
<img src="<%= shop[0].shop_icon %>" alt="Shop Icon">
```

---

## Placeholder Data
Below is an example of the data structure provided to templates:

### Product Data
```javascript
const product = {
    id: "rrgggre4rrrf",
    product_name: "Sample Product",
    product_description: "This is a sample product to test your plugin",
    price: "999",
    quantity: 10,
    product_photos: "/docs/pcontent/default.theme/233392354.jpg"
};
```

### Shop Data
```javascript
const data = {
    id: "bfhhvfhvureure7r",
    shop_name: "Test Shop",
    shop_description: "Test Shop",
    shop_icon: "/docs/pcontent/default.theme/app_icon.jpg",
    visits: 19,
    products: [product, product, product] // Example array
};

const meta = {
    shop: data.id,
    name: data.shop_name,
    icon: data.shop_icon,
    all: [data],
    is_auth: {
        whatsapp: "860614661",
        address: "Maputo"
    }
};

module.exports = { meta, shop: [data] };
```

---

## Development Commands
### Publish a Plugin
To publish your plugin, use:

```bash
ms-plugins publish
```

### Test Locally
To test the plugin locally:

```bash
ms-plugins test <project_id> <http_port>
```
Example:

```bash
ms-plugins test my-theme 3000
```

---

## Submitting Plugins
To submit your plugin, zip the project files and send them to:

```
mozinovati@gmail.com
```

---

## License
This SDK is licensed under [Your License Name]. Please include the full license text here.

---

For more details, visit [Mozshops.store Documentation](https://mozshops.store/dev/plugins).

