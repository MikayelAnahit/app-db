function load_my_agents(office_id_, agents_out, owner_login){
    var out = ``;
    fs.readdir('./src/local_db', (err, files) => {
        for(var i = 1; i < files.length; i++){
            fetch(`../local_db/${files[i]}`)
                .then((data) => data.json())
                .then((data) => {
                    if(data.login != owner_login){
                        if(data.office_id == office_id_){
                            var agent_margin = 0;
                            var scam_margin = 0;
                            for(var j = 0; j < data.loads.length; j ++){
                                if (data.loads[j].scam == false){
                                    agent_margin += +data.loads[j].margin;
                                }else{
                                    scam_margin += +data.loads[j].rate[0];
                                }
                            }
                            out += `<button class="agent_body" onclick="see_agents_loads(${data.login})">`;
                            out += `<div class="agent_name_">${data.name}</div>`;
                            out += `<div class="agent_margin_">$${agent_margin} / $${scam_margin} | $${data.pay}</div>`;
                            out += `</button>`;
                            agents_out.innerHTML = out;

                        }
                    }
                }) 
        }
      });
}

module.exports = load_my_agents;