const pg = require('pg');
const settings = require('./settings'); //settings.json
const input = process.argv[2];

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }

  client.query(`SELECT * FROM famous_people WHERE last_name = $1::text;`,[input], (err, result) => {
    console.log('searching...');
    if (err) {
      return console.error("error running query", err);
    }
console.log("resulllllllt: ", result);
    let num = result.rows.length;
    //console.log(result.rows);
    console.log(`Found ${num} person(s) by the name ${input}:`);
    for (key in result.rows) {
      console.log(`${result.rows[key].first_name} ${result.rows[key].last_name}, born, ${result.rows[key].birthdate}`)
    }

    client.end();
  });
});
