# tccpp.wiki

Website for the Together C & C++ community.

# Contributing

Contributions are welcome!

Prerequisites: node 18 or newer and ideally make.

To get started: Run `make dev`.

If you do not have make, run `npm i` then `npm run dev`.

The site uses VitePress, which allows for content to easily be written in markdown and custom stuff to be done in Vue.
All normal markdown is supported. Additionally, VitePress comes with a handful of useful extensions (github
note/warning/etc blocks, line highlighting for code, emojis, math equations, and more) which can be seen at
https://vitepress.dev/guide/markdown. Additionally, we use the following markdown extensions:

- [markdown-it-footnote](https://github.com/markdown-it/markdown-it-footnote)

The site source is in [src/](src/).
