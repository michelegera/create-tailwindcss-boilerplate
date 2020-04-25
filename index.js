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
          title: './index.html',
          task: () => {},
        },
        {
          title: './src/css/main.css',
          task: () => {},
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
