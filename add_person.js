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

const input = process.argv[2];

const knex = require('knex')({
  client: 'pg',
  connection: config
});

const firstName = process.argv[2];
const lastName = process.argv[3];
const birthDate = process.argv[4];



  function addPerson(firstName, lastName, birthDate){
    knex.insert({first_name: firstName, last_name: lastName, birthdate: birthDate}).into('famous_people').asCallback(function(err,result) {
       if (err) {
          return console.error("error", err);
        }

        console.log('done');
    });
  }




addPerson(firstName, lastName, birthDate);
