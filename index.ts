import {aaa} from './model'
import { Command } from 'commander';
import {db} from './lib/db'

const program = new Command();

program
  .option('-d, --debug', 'output extra debugging')
  .option('-s, --small', 'small pizza size')
  .option('-p, --pizza-type <type>', 'flavour of pizza');

program.parse(process.argv);

const options = program.opts();
if (options.debug) console.log(options);
console.log('pizza details:');
if (options.small) console.log('- small pizza size');
if (options.pizzaType) console.log(`- ${options.pizzaType}`);

db.pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack)
  }
  client.query('SELECT NOW()', (err, result) => {
    release()
    if (err) {
      return console.error('Error executing query', err.stack)
    }
    console.log(result.rows)
  })
})

aaa()