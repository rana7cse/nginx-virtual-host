const fs = require('fs');
const readLine = require('readline-sync');
const createSymlink = require('create-symlink');


// config files;
const nginxConfigStubFile = "./stubs/nginx.conf.stubs";
const fileContentType = 'utf8';
let workdir = '/var/www/html';
let outputdir = '/etc/nginx/sites-available';
let symlinkTo = '/etc/nginx/sites-enabled';
// site generation
const site_name = readLine.question("Please enter your site name: ");
const inFolder = readLine.question("Inside a folder add folder name (/): ");

if (inFolder != '') {
    workdir = workdir + '/' + inFolder
}

workdir = workdir+'/'+site_name;

if(!fs.existsSync(workdir)){
    throw new Error(`Work directory (${workdir}) not exist for your site`);
}

let entry_point = readLine.question("Select an entry point (/): ");
entry_point = (entry_point != '') ? workdir + "/" + entry_point : workdir;

// read file from stubs
let stubContent = fs.readFileSync(nginxConfigStubFile,fileContentType);
let outputFileName = outputdir+'/'+site_name;
symlinkTo = symlinkTo+'/'+site_name;
let configContent = stubContent
    .replace(new RegExp(":site-name:",'g'),site_name)
    .replace(":entry-point:",entry_point);
let writeDir = fs.writeFileSync(outputFileName,configContent);
createSymlink(outputFileName,symlinkTo)
    .then(() => {
        console.log("Successfully nginx config setup completed. Please restart nginx process");
    });
