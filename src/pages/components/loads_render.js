function loads_render(user_data, margin_out, pay_out, load_out){
    const loads = user_data.loads;
    var margin_num = 0;
    var scam_margin_num = 0;
    var pay_num = 0;
    var load_status_color = '#606467'
    var out = ``;
    for(var i = 0; i < user_data.loads.length; i++){
        switch (user_data.loads[i].status){
            case "paid":
                load_status_color = '#C3F73A';
                break;
            case "no paid":
                load_status_color = '#E90000';
                break;
            case "status":
                load_status_color = '#606467';
                break;
            case "on the way":
                load_status_color = '#3A91F7';
                break;
            case "delivered":
                load_status_color = 'orange';
                break;
        }
        out += `<div class="load_body" load_id=${i}>`;
        out += `<div class="load_status_dash" style="background-color: ${load_status_color}"></div>`;
        out += '<div class="load_info_body">';
        out += '<div class="load_controll load_display">';
        out += `<p class="pickup_date loads_padding">${loads[i].date[0]}</p>`;
        out += `<p class="delivery_date loads_padding">${loads[i].date[1]}</p>`;
        out += `<p class="load_status loads_padding">${loads[i].status}</p>`;
        out += '<div class="load_btns">';
        out += `<button class="btns" id="paid" onclick="change_the_status('paid', ${i})">PAID</button>`;
        out += `<button class="btns" id="no_paid" onclick="change_the_status('no paid', ${i})">NO paid</button>`;
        out += `<button class="btns clicked_on_the_way" id="on_the_way" onclick="change_the_status('on the way', ${i})">on the way</button>`;
        out += `<button style="text-decoration: none;" class="btns download_pdf" href="../../src/invoice/invoice_${loads[i]["load#"][0]}.pdf" id="delivered" download="NAME.pdf" onclick="change_the_status('delivered', ${i})">delivered</button>`;
        out += "</div></div>";
        out += '<div class="general_info load_display">';
        out += `<p class="brocker_number loads_padding">B#${loads[i]["load#"][0]}</p>`;
        out += `<p class="our_number loads_padding">O#${loads[i]["load#"][1]}</p>`;
        out += `<p class="pick_del_cityes loads_padding">${loads[i].p_d[0]} - ${loads[i].p_d[1]}</p>`;
        out += `<p class="equipment loads_padding">${loads[i].equipment}</p>`;
        out += `<p class="broker_rate loads_padding">B rate $<span class="b_rate">${loads[i].rate[0]}</span></p>`;
        out += `<p class="carrier_rate loads_padding">C rate $<span class="c_rate">${loads[i].rate[1]}</span></p>`;
        out += `<p class="load_margin loads_padding">Margin: <span class="load_margin_plus">$${loads[i].margin}</span></p>`;
        out += "</div></div></div>";

        load_out.innerHTML = out;
        if (user_data.loads[i].scam == false) {
            margin_num += user_data.loads[i].margin;
        }else{
            scam_margin_num += user_data.loads[i].rate[0];
        }
    }

    if(margin_num < 6000){ pay_num += (margin_num / 100) * 20 }
    if(margin_num >= 6000 && margin_num < 12000) { pay_num += (margin_num / 100) * 25 }
    if(margin_num >= 12000) { pay_num += (margin_num / 100) * 30 }
    pay_num += ( scam_margin_num / 100 ) * 7;

    margin_out.innerHTML = `$${margin_num}`;
    pay_out.innerHTML = `$${pay_num}`;
}

module.exports = loads_render;