const {
    login, signUp, getAllUsers, DeleteUser
} = require("../controller/auth.controller");

module.exports = app => {
    app.post("/api/login", login);
    app.post("/api/signup", signUp);
    app.get("/api/viewAllUser", getAllUsers);
    app.post("/api/deleteDlUser", DeleteUser);

};
