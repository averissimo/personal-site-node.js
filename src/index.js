// If you use require (Node etc), require as first the module and then create the instance
const Remarkable = require('remarkable');
// If you're in the browser, the Remarkable class is already available in the window
const md = new Remarkable();
// Outputs: <h1>Remarkable rulezz!</h1>

const fs = require('fs');
const path = require('path');

const data = md.render(fs.readFileSync(path.join(__dirname, '..', 'data', 'description.md'), {encoding: 'utf-8'}));
const title = md.render(fs.readFileSync(path.join(__dirname, '..', 'data', 'title.md'), {encoding: 'utf-8'}));

const template = fs.readFileSync(path.join(__dirname, 'template.html'), {encoding: 'utf-8'});

const cheerio = require('cheerio');
const $ = cheerio.load(template.toString());

$('#description').html(data);
$('#title').html(title);

const html = require("html");
const prettyData = html.prettyPrint($.html(), {indent_size: 2});

fs.writeFileSync(path.join(__dirname, '..', 'index.html'), prettyData, {encoding: 'utf-8'});
console.log("Written to index.html");

