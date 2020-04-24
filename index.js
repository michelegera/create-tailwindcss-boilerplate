const Listr = require('Listr');

const tasks = new Listr([
  {
    title: 'Create directory structure',
    task: () => {
      return new Listr([
        {
          title: 'src/css',
          task: () => {},
        },
        {
          title: 'src/img',
          task: () => {},
        },
        {
          title: 'src/js',
          task: () => {},
        },
      ]);
    },
  },
  {
    title: 'Create PostCSS configuration',
    task: () => {},
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
