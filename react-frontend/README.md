### Style Guide

This project follows the style guide stated below
https://airbnb.io/javascript/react/#naming

### Install ESLint 

You can install ESLint using npm: 
    npm install eslint --save-dev

You should then set up a configuration file:
    npm init @eslint/config

After that, you can run ESLint on any file or directory like this:

    ./node_modules/.bin/eslint yourfile.js


### Install Prettier with Hook

To format our code whenever we make a commit in git, we need to install the following dependencies:

    npm install --save husky lint-staged prettier

Add the following field to the package.json section:

    +  "husky": {
    +    "hooks": {
    +      "pre-commit": "lint-staged"
    +    }
    +  }

add a 'lint-staged' field to the package.json, for example:

    + "lint-staged": {
    +   "src/**/*.{js,jsx,ts,tsx,json,css,scss,md}": [
    +     "prettier --write"
    +   ]
    + },

Prettier will format the changed files automatically. You can also run 
    ./node_modules/.bin/prettier --write "src/**/*.{js,jsx,ts,tsx,json,css,scss,md}" 

to format your entire project for the first time.

