function change_the_status(status, id){
    user_data.loads[id].status = status;
    if (user_data.loads[id].status == 'delivered') {
        console.log('delivered!')
    }
    if(user_data.loads[id].scam == false){
        if(status = 'no paid'){
            user_data.loads[id].margin = -user_data.loads[id].rate[1];
        }
    }
}











// function change_the_status(e, o) {
//     console.log(RC_data),
//         (user_data.loads[o].status = e),
//         "delivered" == e && create_invoices(o, user_data, RC_data),
//         0 == user_data.loads[o].scam
//             ? "no paid" == e
//                 ? (user_data.loads[o].margin = -user_data.loads[o].rate[1])
//                 : "no paid" != e && (user_data.loads[o].margin = user_data.loads[o].rate[0] - user_data.loads[o].rate[1])
//             : (user_data.loads[o].margin = 0),
//         create_json();
// }