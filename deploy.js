var FtpDeploy = require('ftp-deploy');
var ftpDeploy = new FtpDeploy();

require('dotenv').config();

var config = {
    user: process.env.FTP_USER,                   // NOTE that this was username in 1.x 
    password: process.env.FTP_PASSWORD,           // optional, prompted if none given
    host: process.env.FTP_HOST,
    port: 21,
    localRoot: __dirname + '/dist',
    remoteRoot: '/student-docs',
    // include: ['*', '**/*'],      // this would upload everything except dot files
    include: ['*'],
    exclude: [],     // e.g. exclude sourcemaps - ** exclude: [] if nothing to exclude **
    deleteRemote: false,              // delete existing files at destination before uploading
    forcePasv: true                 // Passive mode is forced (EPSV command is not sent)
}
 
ftpDeploy.deploy(config)
    .then(res => console.log('finished:', res))
    .catch(err => console.log(err))

ftpDeploy.on('uploaded', function(data) {
    console.log(data);         // same data as uploading event
});

ftpDeploy.on('log', function(data) {
    console.log(data);         // same data as uploading event
});