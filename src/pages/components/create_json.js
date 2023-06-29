const push_to_db = require('./push_to_db');

function create_json(user_data, login) {
    var path = `./src/local_db/user_${login}.json`;
    fs.unlink(path, (err) => {
        err ? console.log(`error: ${err}`) : console.log("removed");
    });

    const data = JSON.stringify(user_data, null, 2);
    fs.writeFile(path, data, (e) => {
        e ? console.log(`Error : ${e}`) : console.log(`Created : ${path}`)
    });
    push_to_db(login);
}

module.exports = create_json;