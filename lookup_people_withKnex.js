const settings = require('./settings'); //settings.json
const pg = require('pg');

const config = {
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl

}
const knex = require('knex')({
  client: 'pg',
  connection: config,
});
const input = process.argv[2];

// const client = new pg.Client({
//   user     : settings.user,
//   password : settings.password,
//   database : settings.database,
//   host     : settings.hostname,
//   port     : settings.port,
//   ssl      : settings.ssl
// });
function knexConnect(knex) {
  knex.select('*').from('famous_people').where('last_name', input).asCallback(function (err,result){
    if (err) {
        return console.error("error", err);
      }
    return printResults(result);
  });
}

function printResults(result) {
  let num = result.length;
  console.log(`Found ${num} person(s) by the name ${input}:`);
    for (i in result) {
      console.log(`-${i}: ${result[i].first_name} ${result[i].last_name}, born ${result[i].birthdate.toDateString()}`)
    }
}

knexConnect(knex);
