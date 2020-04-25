const fs = require('fs');
const path = require('path');
const Listr = require('Listr');

const tasks = new Listr([
  {
    title: 'Create directory structure',
    task: () => {
      const directories = ['src/css', 'src/img', 'src/js'];

      return new Listr(
        directories.map((dir) => {
          return {
            title: dir,
            task: () =>
              fs.mkdir(
                dir,
                {
                  recursive: true,
                },
                (err) => {
                  if (err)
                    throw new Error(`Cannot create directory ${dir}: ${err}`);
                }
              ),
          };
        })
      );
    },
  },
  {
    title: 'Create PostCSS configuration',
    task: () => {
      const source = path.join(__dirname, 'templates', 'postcss.config.js');
      const destination = path.join(__dirname, 'postcss.config.js');

      fs.copyFileSync(source, destination);
    },
  },
  {
    title: 'Create templates',
    task: () => {
      return new Listr([
        {
          title: 'index.html',
          task: () => {
            const source = path.join(__dirname, 'templates', 'index.html');
            const destination = path.join(__dirname, 'src', 'index.html');

            fs.copyFileSync(source, destination);
          },
        },
        {
          title: 'main.css',
          task: () => {
            const source = path.join(__dirname, 'templates', 'main.css');
            const destination = path.join(__dirname, 'src', 'css', 'main.css');

            fs.copyFileSync(source, destination);
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
          task: () => {},
        },
        {
          title: 'Install dependencies',
          task: () => {},
        },
      ]);
    },
  },
]);

tasks.run().catch((err) => console.log(err));
