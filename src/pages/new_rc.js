const fs = require('fs');
const create_json = require('./components/create_json');
const create_pdf = require('./components/create_pdf');

const rc_pdf_exempls = document.getElementById('type_of_rc');

const login = localStorage.getItem('login');
var RC_data = {};
var user_data = {};

__Welcome();
function __Welcome(){
    fetch(`../local_db/user_${login}.json`)
            .then((data) => data.json())
            .then((data) => {
                user_data = data;
            });
    var out = ``;
    fetch(`https://api.npoint.io/ef3f955573256495efeb`)
        .then((data) => data.json())
        .then((data) => {
            for(let i = 0; i < data.RC.length; i++){
                out += `<option>${data.RC[i].name}</option>`;
                rc_pdf_exempls.innerHTML = out;
            }
            RC_data = data;

        })
}

document.querySelector('.create_rc').addEventListener('click', () => {
    // Another data
    const broker_data = document.querySelector('.broker_name_').value;
    const load_num = document.querySelector('.load_num').value;
    const equipment = document.querySelector('.eq').value;
    const broker_rate = document.querySelector('.b_rate').value;
    const carrier_rate = document.querySelector('.c_rate').value;
    const weight = document.querySelector('.weight').value;
    // Pickup data
    const pu_city = document.querySelector('.pu_city').value;
    const shipper = document.querySelector('.pickup_wh').value;
    const pu_date = document.querySelector('.pu_date').value;
    const pu_time = document.querySelector('.pu_time').value;
    const pu_last_time = document.querySelector('.pu_last_time').value;
    const pu_adress = document.querySelector('.pu_adress').value;
    const pickup_notes = document.querySelector('.pickup_notes').value;
    // Delivery data
    const del_city = document.querySelector('.del_city').value;
    const reciver = document.querySelector('.del_wh').value;
    const del_date = document.querySelector('.del_date').value;
    const del_time = document.querySelector('.del_time').value;
    const del_last_time = document.querySelector('.del_last_time').value;
    const del_adress = document.querySelector('.del_adress').value;
    const del_notes = document.querySelector('.del_notes').value;
    const our_load_num = `101${Math.floor(Math.random() * 99999) - 1000}`
    const create_rc_data = {
        "status": "status",
        "type": rc_pdf_exempls.value,
        "broker_name": broker_data,
        "load#": [
          load_num,
          our_load_num
        ],
        "p_d": [
          pu_city,
          del_city
        ],
        "adress": [
          pu_adress,del_adress
        ],
        "date": [
          `${pu_date} - ${pu_time} - ${pu_last_time}`,
          `${del_date} - ${del_time} - ${del_last_time}`
        ],
        "rate": [+broker_rate, +carrier_rate],
        "weight": weight,
        "w_s": [
          shipper,
          reciver
        ],
        "equipment": equipment,
        "margin": broker_rate - carrier_rate,
        "notes": [
          pickup_notes,
          del_notes
        ],
        "scam": document.getElementById('checkbox_of_db').checked,
        "pay": 0,
        "remove_day": "25.07.2023"
      }

    user_data.loads.unshift(create_rc_data);
    create_json(user_data, login);
    create_pdf('rc', 0, user_data);
    setTimeout(() => {
        localStorage.getItem('owner') == "true" ? window.location.href = './owner_dashboard.html' : window.location.href = './dashboard.html';
    }, 1000)
});



