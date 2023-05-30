# Step By Step Guide to creating this project

## Step 1: Install yarn
First, make sure you have the latest version of node.

Then, run `npm install --global yarn`

This should install yarn (a package manager alternative to npm).

To verify, run `yarn --version`


## Step 2: Install Vite and Create a Project
Once yarn is set up, run `yarn create vite` to download vite and then set up the project.

To Setup the Project, vite will ask some questions:
- the name of the project
- when asked which framework you want to use, select React
- when asked whether you want to use JS or TS, select TS with SWE (a superfast TS compiler)


## Step 3: Installing Dependencies and Setting Up TailwindCSS
Once the project creation is complete, `cd` to the project and run `yarn` to install all the dependencies. This may take a couple of minutes.

Then, to add Tailwind to the project, run `yarn add -D tailwindcss postcss autoprefixer`.

Once these packages are installed, we need to run `yarn tailwindcss init -p` to initialize tailwind config.

Add the following properties to tailwind.config.js:
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content:['./src/**/*.{js,jsx,ts,tsx,svg}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Finally, add the Tailwind directives to your CSS by replacing the code of your index.css file with the following code:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Step 4: Running the dev environment

Run `yarn dev` to start up the project for the first time.

Any changes you make will prompt an auto-compile from vite which should be very fast.

Enjoy!