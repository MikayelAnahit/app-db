function loader(loader_, loader_status) {
    window.scrollTo(0, 0);
    loader_status == true ? loader_.style.display = "flex" : loader_.style.display = 'none';
}


module.exports = loader;