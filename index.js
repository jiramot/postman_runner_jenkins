#!/usr/bin/env node

const newman = require('newman');
const fs = require('fs');

let onlyPostmanCollectionFilter = (file) => {
  return (/^((?!(package(-lock)?)).+)\.json/).test(file);
}
fs.readdir('./collections/', function (err, files) {
    if (err) { throw err; }

    files = files.filter(onlyPostmanCollectionFilter);

    files.forEach(function (file) {
        newman.run({
            collection: require(`${__dirname}/collections/${file}`),
            reporters: ['html','junit', 'cli'],
            reporter: {
              html: {
                export: `reports/html/${file}.html`
              },
              junit: {
                export: `reports/xml/${file}.xml`
              }
            }

        }, function (err) {
            console.info(`${file}: ${err ? err.name : 'ok'}!`);
        });
    });
});
