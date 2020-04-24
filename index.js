const execa = require('execa');
const Listr = require('Listr');

const tasks = new Listr([
  {
    title: 'Hello world',
    task: () => execa('say', ['Hello world']),
  },
]);

tasks.run().catch((err) => console.log(err));
