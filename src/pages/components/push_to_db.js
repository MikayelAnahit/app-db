const simpleGit = require('simple-git');
const dir_path = './src/local_db';
const loader = require('./loader');
const repositoryUrl = "https://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@github.com/AramArutyunyan/StatusTest.git";
function push_to_db(login){
    loader(document.querySelector('.loader'), true);
    simpleGit(dir_path).add(`user_${login}.json`, (err) => err ? console.log(`ADD error : ${err}`) : console.log('add'))
        .raw(['config', 'user.email', 'aru.aram99@yandex.ru'], (err) => err ? console.log(`email error : ${err}`) : console.log('user email'))
        .raw(['config', 'user.name', 'AramArutyunyan'], (err) => err ? console.log(`user name error : ${err}`) : console.log('user name'))
        .commit(`Add new person login: ${login}`, (err) => err ? console.log(`Commit error : ${err}`) : console.log('commit'))
        // .addRemote('origin', repositoryUrl)
        .push((err) => {err ? push_to_db(login) : loader(document.querySelector('.loader'), false); console.log('pushed')})
}
module.exports = push_to_db;