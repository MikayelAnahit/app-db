// 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

const simpleGit = require("simple-git");
const fs = require('fs');
const repositoryUrl = "https://github.com/AramArutyunyan/StatusTest.git";
const destinationPath = "./src/local_db";
const loader_ = document.querySelector('.loader');
const loader = require('./pages/components/loader');

__Welcome();

function __Welcome(){
    loader(loader_, true);
    fs.rmdir(destinationPath, { recursive: !0 }, (e) => {
        e ? console.error("Ошибка при удалении папки:", e) : console.log("Папка удалена:", destinationPath);
    });
    simpleGit().clone(repositoryUrl, destinationPath, (e, o) => {
        e ? __Welcome() : loader(loader_, false);
    });
}

document.querySelector('.login_btn').addEventListener('click', () => {
    let userLogin = document.querySelector('.login_input').value;
    let userPass = document.querySelector('.pass_input').value;
    fetch(`./local_db/user_${userLogin}.json`)
            .then((data) => data.json())
            .then((data) => {
                if(userLogin == data.login && userPass == data.pass){
                    localStorage.setItem('login', userLogin);
                    localStorage.setItem('owner', data.owner);
                    localStorage.setItem('office', data.office_id);

                    data.owner == true ? window.location.href = './pages/owner_dashboard.html' : window.location.href = './pages/dashboard.html'; 
                }
            });
});