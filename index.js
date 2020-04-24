const Listr = require('Listr');

const tasks = new Listr([
  {
    title: 'Create directory structure',
    task: () => {},
  },
  {
    title: 'Create PostCSS configuration',
    task: () => {},
  },
  {
    title: 'Create templates',
    task: () => {},
  },
  {
    title: 'Install dependencies',
    task: () => {},
  },
]);

tasks.run().catch((err) => console.log(err));
