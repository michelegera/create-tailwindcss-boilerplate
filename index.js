#! /usr/bin/env node

const fs = require('fs');
const path = require('path');

const execa = require('execa');
const Listr = require('Listr');

const tasks = new Listr([
  {
    title: 'Create directory structure',
    task: () => {
      const directories = ['src/css', 'src/img', 'src/js'];

      directories.forEach((dir) =>
        fs.mkdirSync(dir, { recursive: true }, (err) => {
          if (err) throw new Error(`Cannot create directory ${dir}: ${err}`);
        })
      );
    },
  },
  {
    title: 'Create PostCSS configuration',
    task: async () => {
      const source = path.join(__dirname, 'templates', 'postcss.config.js');
      const destination = path.join('postcss.config.js');

      await fs.copyFile(source, destination, (err) => {
        if (err) throw new Error(`Cannot create PostCSS configuration: ${err}`);
      });
    },
  },
  {
    title: 'Create templates',
    task: () => {
      return new Listr([
        {
          title: 'index.html',
          task: async () => {
            const source = path.join(__dirname, 'templates', 'index.html');
            const destination = path.join('src', 'index.html');

            await fs.copyFile(source, destination, (err) => {
              if (err) throw new Error(`Cannot create index.html: ${err}`);
            });
          },
        },
        {
          title: 'main.css',
          task: async () => {
            const source = path.join(__dirname, 'templates', 'main.css');
            const destination = path.join('src', 'css', 'main.css');

            await fs.copyFile(source, destination, (err) => {
              if (err) throw new Error(`Cannot create main.css: ${err}`);
            });
          },
        },
      ]);
    },
  },
  {
    title: 'Install dependencies',
    task: () => {
      return new Listr([
        {
          title: 'Create package.json',
          task: async () => {
            const source = path.join(__dirname, 'templates', 'package.json');
            const destination = path.join('package.json');

            await fs.copyFile(source, destination, (err) => {
              if (err) throw new Error(`Cannot create package.json: ${err}`);
            });
          },
        },
        {
          title: 'Install dependencies',
          task: async () => {
            const params = ['add', '-D'];
            const dependencies = [
              '@fullhuman/postcss-purgecss',
              'autoprefixer',
              'parcel-bundler',
              'postcss',
              'tailwindcss',
            ];

            await execa('yarn', [...params, ...dependencies]);
          },
        },
      ]);
    },
  },
]);

tasks.run().catch((err) => console.log(err));
