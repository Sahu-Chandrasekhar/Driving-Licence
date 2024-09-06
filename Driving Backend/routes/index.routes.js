module.exports = app => {
    // require("./user.route")(app);
    require("./auth.routes")(app);
    require("./dluser.routes")(app);
}