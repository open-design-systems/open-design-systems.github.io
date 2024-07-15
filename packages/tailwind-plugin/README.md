<p>
  <a href="https://open-design-systems.github.io/" target="_blank">
    <img alt="Tailwind CSS Typography" src="https://raw.githubusercontent.com/open-design-systems/open-design-systems.github.io/HEAD/.github/assets/opends-logo.png" width="250" height="250" style="max-width: 100%;">
  </a>
</p>

The official Open Design System Tailwind CSS Plugin provides the easiest way to have access to your Design System tokens into Tailwind CSS.

```js
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  plugins: [
    require('@opends/tailwind'),
    //...
  ],
}
```

---

## Instalation

Install the plugin from npm:

```shell
npm install -D @opends/tailwind
```

Then add the plugin to your `tailwind.config.js` file:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    // ...
  },
  plugins: [
    require('@opends/tailwind', {
      desisgnSystemConfig: 'config/open-design-system.json', // optional defaults to root to project.
    }),
    // ...
  ],
}
```

## Basic Usage

Once your `open-design-system.json` file is loaded all yourt tokens are available as TailwindCSS utilities and CSS variables.

```html
<div class="box">
  <h1 class="text-title text-primary">My amazing title here</h1>
</div>
```

The Open Design System plugin extends the TailwindCSS configuration to allow users to still keep usage of any TailwindCSS option and being just an extra layer for it.

### Colors

All colors are added in a way that they can be used by tailwind internally.

```html
<p class="text-primary">The quick brown fox jumps over the lazy dog.</p>
```

> The aforementioned example assumes you already have a `primary` color set.

With the example above, you should be able to use out of the box your light and dark version of the `primary` color.

### Typography

```html
<p class="text-body font-body">The quick brown fox jumps over the lazy dog.</p>
```

> The aforementioned example assumes you already have a `body` typography set.

With the example above, everything that you have defined for your typography should be available under the name of the typography you set in your `open-design-system.json` and it should set all the properties for you (fontFamily, fontSize, fontWeight, letterSpacing and so on.)

### Spacings

```html
<div class="p-big m-small">
  <!-- ... -->
</div>
```

> The aforementioned example assumes you already have a `big` and `small` spacing set.

Every place you can specify some spacings in TailwindCSS you should be able to use the tokens you have defined in the `open-design-system.json`.

> For WEB we assume `px` as for spacing. In case you would like to extend such functionality open an issue for discussion.

### Surfaces

```html
<div class="box">
  <!-- ... -->
</div>
```

> The aforementioned example assumes you already have a `box` surface set.

Surfaces are available as component classes, so you can use already all the configurations you did under a single class. But it also creates css variables using the schema: `--surface-{surface-name}-border-radius` and it is used for all the properties.

### Shadows

```html
<div class="shadow-elevation1">
  <!-- ... -->
</div>
```

Shadows also extends the current theme and include the shadows (box shadow) availabel for your usage
