const fs = require('fs');
const create_json = require('./components/create_json');

document.querySelector('.register_btn').addEventListener('click', () => {
    const reg_login = document.querySelector('.reg_login').value;
    const reg_name = document.querySelector('.reg_input').value;
    const reg_pass = document.querySelector('.pass_input').value;
    const office_id = document.querySelector('.id_input').value;
    const user_data = { 
        "login": reg_login, 
        "name": reg_name, 
        "pass": reg_pass, 
        "office_id": office_id, 
        "owner": false, 
        "admin": false, 
        "pay": 0, 
        "sacm_pay": 0, 
        "broker_pay": 0, 
        "loads": []
    }
    create_json(user_data, reg_login);
});

// { login: e, name: o, pass: t, office_id: r, owner: !1, admin: !1, pay: 0, sacm_pay: 0, broker_pay: 0, loads: [], save: !0 },