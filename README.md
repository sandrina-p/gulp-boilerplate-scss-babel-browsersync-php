# Gulp Boilerplate
#### SCSS, Babel, PHP - HTML minify, BrowserSync and more

If you are someone looking for a starter-kit that compiles your **SCSS to CSS**, Javascript **ES6 to ES5** and get tired of **reloading your browser** everytime you save your code, this boilerplate might suit you!  
During 2016, I've been gathering some pieces of code that I find to be always useful on my next project, so I ended up by creating this boilerplate.

---

## What makes this boilerplate useful

##### SCSS
- Compile and minify `*.scss` directly to `*.min.css` skipping the `*.css` file
- Add **[auto prefixers](http://webdesign.about.com/od/css/a/css-vendor-prefixes.htm)** for you. No more `-webkit-` on your SCSS.
- BroswerSync - You don't need to reload your page to see the new SCSS you've just written
- Has **Normalize**, and some SCSS configuration
- [StyleLint](https://simenb.github.io/stylint/)

##### Javascript
- Compile ES6 to ES5 with **Babel.js**
- **minify** `*.js` directly to `*.min.js`
- You can divide your JS in partials like you do on SCSS
- Stripe what `console.log()` on production that everyone forgets about
- [EsLint](eslint.org)


##### HTML
- **Minify** your HTML
- It has some **Schema** and **Meta Tags** to help you on **SEO**
- **[Fontawesome 4.7](http://www.fontawesome.io)** is included
- [You can use **PHP** to help you build the HTML files. If you don't feel comfortable with it, just use HTML as always.
- Possibility to have CSS inline (_only_ if you use php) _[Does it sound wrong?](https://developers.google.com/speed/docs/insights/OptimizeCSSDelivery#dataURI)_

---

## Table of contents
- [Getting started](#getting-started)
- [Dealing with source files](#dealing-with-source-files)
- [Boilerplate structure](#boilerplate-structure)
- [Bonus](#bonus)
- [Support](#support)
- [License](#license)

---





## Getting Started

##### Before you start *you need these installed*

1. Download and install [Node](https://nodejs.org/en/)
2. [Gulp](http://gulpjs.com/) `npm install gulp-cli -g `


##### Set up

0. Download or clone this repo `git clone https://github.com/sandrina-p/gulp-boilerplate-scss-babel-browsersync-php.git`
1. `cd gulp-boilerplate-scss-babel-browsersync-php`
2. `npm install` - All dependecies you need to make this work will be installed on a new folder `/node_modules`. You can find those dependecies on `/package.json`
3. `gulp start`
4. Go to http://localhost:3000/ and you are ready to rock!


##### Gulp tasks available
- `gulp` - see what you can do with gulp
- `gulp start` - this is what makes the magic while you code. It compiles your code and you don't need to reload the page anymore when saving your html or css files.
- `gulp build` - now that your code is ready, let's minify it (css, js and html) before going to production.


##### Using PHP to generate HTML (optional)

Usually I write some basic PHP like `$variables` and `@foreach` to avoid repeting HTML markup and other stuff like css-line. [php2html](https://www.npmjs.com/package/gulp-php2html) is the secret. If you don't feel like that you can just delete `index.php` and use `index.html` as usually.

###### OSX
1. Install [Homebrew](http://brew.sh/)

`/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`

2. Install php-cgi

```
  brew tap homebrew/dupes
  brew tap homebrew/versions
  brew tap homebrew/homebrew-php
  brew install php56
```

###### WINDOWS

The php-cgi binary can be installed via [XAMPP](https://www.apachefriends.org/download.html). _[Check here](https://www.monosnap.com/image/psLZ5fpwuSsvJJeZPdklEjxMr)_ how you can add the binary to your PATH


---


## Dealing with source files


#### SCSS
SCSS files are located in `assets/styles`.

##### Generate files
Gulp ignores the files that has `_` as prefix (ex: `_buttons.scss`). The minified file has the same path as the original.

```

  styles/
  |—— atoms/
  |   |—— _buttons.scss #will not be minified
  |—— layouts/
  |   |—— index.scss # will be minified
  |   |—— index.min.scss #into this file

```

##### @import partials
To use `_footer.scss` inside `index.scss` you need to import it.

**`index.scss`**
```css

	@import "../atoms/buttons";

```

##### @ autoprefixer
The generated file includes vendor prefixes. Right now it supports _last 2 version', 'safari 6', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'_. You can change it in `gulpfile.js`. Just look for `autoprefixer` and modify its values.

```css

    /* scss */
	.foo {
    	animation: fadein 250ms;
    }

    /* css generated by Gulp */
    .foo {
  		-webkit-animation: fadein 250ms;
        animation: fadein 250ms;
    }

```



#### Javascript
Javascript files are divided in two folders:
- `assets/scripts` - your javascript code
- `assets/vendor` - all dependecies like plugins, libraries or frameworks

##### Generate files
Gulp generates .js files that are inside `assets/scripts` and ignore the ones that has `_` as prefix (ex: `_footer.js`). The minified file has the same path as the original.


```

  scripts/
  |—— component/
  |   |—— _footer.js #will not be minified
  |—— layouts/
  |   |—— index.js # will be minified
  |   |—— index.min.js #into this file
  vendor/
  |—— # every file inside vendor/ will not be minified

```

##### Include partials
To use `_footer.js` inside `index.js` you need to import it. It's similar as you do with SCSS.

**`index.js`**
```js

  // =include ../../vendor/jquery/jquery-2.1.4.min.js
  // =include ../components/_footer.js

```

This will prepend jQuery, and `_footer.js` to `index.js` and export it to `index.min.js`. To know more about how this plugin works, check *[gulp-include](https://www.npmjs.com/package/gulp-include#require-vs-include)*

---

#### Images

For a while I used a plugin to compress images, but then I found some manual tools more effective.
- **[compresspng](compresspng.com)** - online ~ 60% reduction
- **[imageOptim](https://imageoptim.com/mac)** - app ~ 20% reduction


---

## Boilerplate structure
```

gulp-boilerplate/
  |—— assets/
  |   |—— media/
  |   |   |—— # images, videos, svg, etc..
  |   |—— scripts/
  |   |   |—— atoms
  |   |   |   |—— # general parts that can be used in different places. ex: buttons or modals
  |   |   |—— components
  |   |   |   |—— # specifics parts ex: footer or navigation
  |   |   |—— templates
  |   |   |   |—— # imagine this as pages/layouts of your site that combine its pieces (atoms or components)
  |   |—— styles/
  |   |   |—— atoms
  |   |   |   |—— /fonts
  |   |   |   |—— |—— # local fonts you might use
  |   |   |   |—— /normalize
  |   |   |   |—— |—— # normalize files and some custom
  |   |   |   |—— _buttons.scss
  |   |   |   |—— _config.scss
  |   |   |   |—— _grid.scss
  |   |   |   |—— _typography.scss
  |   |   |   |—— _util.scss
  |   |   |—— components
  |   |   |   |—— # similar to scripts/components
  |   |   |—— templates
  |   |   |   |—— # similar to scripts/templates
  |—— vendor/ # all dependecies like plugins, libraries or frameworks
  |   |—— jquery/
  |   |   |—— jquery-2.1.4.min.js
  |—— gulfile.js
  |—— index.php # you can delete this if you don't use PHP
  |—— index.html
  |—— package.json
  |—— README.md

```

---

## Bonus

##### SCSS

Inside `assets/styles/atoms` you will find some SCSS config (variables, mixins, etc). Some of them have comments explaining what they do.

Here is a list of some of the code available:
- Colors variables
- @function rem/em to px
- Typography variables - sizes, weights, fonts
- @media queries
- Clearfix and Flexbox with [Modernizr](http://www.modernizr.com)
- Fallback @mixins
- Retina support
- Buttons List
- @extend-grid
- Utilities/helpers classes

##### Javascript

- jQuery 2.1.4
- Modernizr-flexbox

Thease are inside `assets/vendor/` and are being imported in `assets/scripts/templates/index.js`

##### HTML
In `index.html|php` you have some markup
- `<meta>` tags
- CSS inline (PHP only)
- `<noscript>` tag
- `Schema` Tag @Type Website
- [Fontawesome 4.7](http://wwww.fontawesome.io)

---

## Support

Any bug / suggestion / feedback you might have please let me know. In the future I plan to add some test scripts, probably with **[Intern](https://theintern.github.io)**.

---

## License
The code is available under the MIT License.
