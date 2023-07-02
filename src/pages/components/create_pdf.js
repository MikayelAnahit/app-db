const pdf = require('html-pdf');
var my_pdf = {};
function create_pdf(pdf_type, load_id, user_data){
    var load_info = user_data.loads[load_id];
    fetch(`https://api.npoint.io/ef3f955573256495efeb`)
            .then((data) => data.json())
            .then((data) => {
                my_pdf = data
                for(var i = 0; i < my_pdf.RC.length; i++){
                    if(my_pdf.RC[i].name == user_data.loads[load_id].type){
                        switch(pdf_type){
                            case "invoice":
                                var my_invoice = my_pdf.RC[i].invoice;
                                var b_info = my_invoice.replace('__B_number', load_info['load#'][0]).replace('__B_data', load_info['broker_name'])
                                var pu_del_wh = b_info.replace('__PU_wh', load_info['w_s'][0]).replace('__Del_wh', load_info['w_s'][1])
                                var pu_del_time = pu_del_wh.replace('__PU_time', load_info['date'][0]).replace('__Del_time', load_info['date'][1])
                                var pu_del = pu_del_time.replace('__PU', load_info['p_d'][0]).replace('__Del', load_info['p_d'][1])
                                var another_data = pu_del.replace('__Count', '-').replace('__Weight', load_info['weight']).replace('__Rate', load_info['rate'][0])

                                pdf.create(another_data, { format: "Letter" }).toFile(`./src/invoice/invoice_${load_info['load#'][0]}.pdf`, err => {
                                    err ? console.log(err) : console.log('created');
                                })
                                break;
                            case "rc":
                                var my_rc = my_pdf.RC[i].Code;
                                var p_d = my_rc.replace('__PU', load_info['p_d'][0]).replace('__Del', load_info['p_d'][1]);
                                var p_d_time = p_d.replace('__PU_time', load_info['date'][0]).replace('__Del_time', load_info['date'][1]);
                                var p_d_adress = p_d_time.replace('__PU_adress', load_info['adress'][0]).replace('__Del_adress', load_info['adress'][1])
                                var p_d_wh = p_d_adress.replace('__PU_wh', load_info['w_s'][0]).replace('__Del_wh', load_info['w_s'][1]);
                                var notes = p_d_wh.replace('__Notes_PU', load_info['notes'][0]).replace('__Notes_Del', load_info['notes'][1]);
                                var finish_data = notes.replace('__Weight', load_info['weight']).replace('__Rate', `$${load_info['rate'][1]}`);

                                pdf.create(finish_data, { format: "Letter" }).toFile(`./src/RC/ratecon_${+load_info['load#'][1]}.pdf`, err => {
                                    err ? console.log(err) : console.log('created');
                                })
                                break;
                        }
                    }
                }
            })
}

module.exports = create_pdf;

