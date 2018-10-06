const fs = require('fs');
const readLine = require('readline-sync');

// config files;
const nginxConfigStubDir = "./stubs/nginx.conf.stubs";
const fileContentType = 'utf8';
let workdir = '/var/www/html';
//site generation
const site_name = readLine.question("Please enter your site name: ");
const inFolder = readLine.question("Inside a folder add folder name (/): ");

if (inFolder != ''){
    workdir = workdir + '/' + inFolder
}

workdir = workdir+'/'+site_name;

if(!fs.existsSync(workdir)){
    throw new Error(`Work directory (${workdir}) not exist for your site`);
}

console.log(workdir);

const entry_point = readLine.question("Select an entry point (/): ");
console.log(entry_point);

// read file from stubs
fs.readFile(nginxConfigStubDir,fileContentType,function (err,fileContent) {

});