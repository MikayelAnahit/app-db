const fs = require('fs');
const simpleGit = require('simple-git');
// LocalStorage
const login = localStorage.getItem('login');
// Vars
var user_data = {}
const margin_out = document.querySelector('.margin_color');
const loads_out = document.querySelector('.load_list');
const pay_out = document.querySelector('.pay_color');
const agents_out = document.querySelector('.agents_list');
// Components
const loads_render = require('./components/loads_render');
const create_json = require('./components/create_json');
const load_my_agents = require('./components/load_my_agents');

__Welcome();

function __Welcome(){
    fetch(`../local_db/user_${login}.json`)
            .then((data) => data.json())
            .then((data) => {
                user_data = data;
                document.querySelector('.agent_name').innerHTML = `$${user_data.name}`;
                loads_render(user_data, margin_out, pay_out, loads_out);
                load_my_agents(user_data.office_id, agents_out, login);
            })   
}

function change_the_status(_status, id){
    user_data.loads[id].status = _status;
    if (user_data.loads[id].status == 'delivered') {
        console.log('delivered!')
    }
    if(user_data.loads[id].scam == false){
        if(user_data.loads[id].status == 'no paid'){
            user_data.loads[id].margin = -user_data.loads[id].rate[1];
        }else{
            user_data.loads[id].margin = user_data.loads[id].rate[0] - user_data.loads[id].rate[1];
        }
    }
    create_json(user_data, login);
    loads_render(user_data, margin_out, pay_out, loads_out);
}

// Нажатие на кнопку новый лоад
document.querySelector('.new_load').addEventListener('click', () => {
    window.location.href = 'new_rc.html';
});