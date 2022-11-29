#! /usr/bin/env node

'use strict';

import { execa } from 'execa';
import { fileURLToPath } from 'url';
import { Listr } from 'listr2';
import fs from 'fs';
import inquirer from 'inquirer';
import path from 'path';
import validFilename from 'valid-filename';

const dependencies = [
  // Parcel dependencies
  // https://github.com/postcss/postcss/wiki/PostCSS-8-for-end-users#parcel
  'parcel@nightly',

  // Tailwind CSS dependencies
  'tailwindcss',
  'postcss',
  'autoprefixer',
];

const questions = [
  {
    type: 'input',
    name: 'root',
    message: 'Name your project root directory',
    validate: (value) =>
      validFilename(value.trim()) ? true : 'Please enter a valid path',
  },
];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tasks = new Listr([
  {
    title: 'Create directory structure',
    task: (context) => {
      const root = context.root;
      const tree = ['src/css', 'src/img', 'src/js'];

      if (fs.existsSync(root)) {
        throw new Error(`Project directory ${root} already exists`);
      }

      fs.mkdirSync(root);

      tree.forEach((branch) => {
        const dir = path.join(root, branch);

        fs.mkdirSync(dir, { recursive: true }, (err) => {
          if (err) throw new Error(`Cannot create directory ${dir}: ${err}`);
        });
      });
    },
  },
  {
    title: 'Create project files',
    task: () => {
      return new Listr([
        {
          title: 'Create Tailwind CSS configuration',
          task: async (context) => {
            const root = context.root;
            const source = path.join(
              __dirname,
              'templates',
              'tailwind.config.js'
            );
            const destination = path.join(root, 'tailwind.config.js');

            fs.copyFile(source, destination, (err) => {
              if (err)
                throw new Error(
                  `Cannot create Tailwind CSS configuration: ${err}`
                );
            });
          },
        },
        {
          title: 'Create PostCSS configuration',
          task: async (context) => {
            const root = context.root;
            const source = path.join(__dirname, 'templates', '.postcssrc');
            const destination = path.join(root, '.postcssrc');

            fs.copyFile(source, destination, (err) => {
              if (err)
                throw new Error(`Cannot create PostCSS configuration: ${err}`);
            });
          },
        },
        {
          title: 'Create gitignore file',
          task: async (context) => {
            const root = context.root;
            const source = path.join(__dirname, 'templates', '_gitignore');
            const destination = path.join(root, '.gitignore');

            fs.copyFile(source, destination, (err) => {
              if (err) throw new Error(`Cannot create gitignore file: ${err}`);
            });
          },
        },
      ]);
    },
  },
  {
    title: 'Create templates',
    task: () => {
      return new Listr([
        {
          title: 'index.html',
          task: async (context) => {
            const root = context.root;
            const source = path.join(__dirname, 'templates', 'index.html');
            const destination = path.join(root, 'src', 'index.html');

            fs.copyFile(source, destination, (err) => {
              if (err) throw new Error(`Cannot create index.html: ${err}`);
            });
          },
        },
        {
          title: 'main.css',
          task: async (context) => {
            const root = context.root;
            const source = path.join(__dirname, 'templates', 'main.css');
            const destination = path.join(root, 'src', 'css', 'main.css');

            fs.copyFile(source, destination, (err) => {
              if (err) throw new Error(`Cannot create main.css: ${err}`);
            });
          },
        },
      ]);
    },
  },
  {
    title: 'Set up dependencies',
    task: () => {
      return new Listr([
        {
          title: 'Create package.json',
          task: async (context) => {
            const root = context.root;
            const source = path.join(__dirname, 'templates', '_package.json');
            const destination = path.join(root, 'package.json');

            fs.copyFile(source, destination, (err) => {
              if (err) throw new Error(`Cannot create package.json: ${err}`);
            });
          },
        },
        {
          title: 'Install dependencies with Yarn',
          task: async (context, task) => {
            const root = context.root;
            const params = ['add', '-D'];

            process.chdir(root);

            await execa('yarn', [...params, ...dependencies]).catch(() => {
              context.yarn = false;
              task.skip('Yarn not available');
            });
          },
        },
        {
          title: 'Install dependencies with npm',
          enabled: (context) => context.yarn === false,
          task: async () => {
            const params = ['install', '--save-dev'];

            await execa('npm', [...params, ...dependencies]);
          },
        },
      ]);
    },
  },
]);

inquirer.prompt(questions).then((answers) => {
  tasks.run(answers).catch((err) => console.log(err));
});
