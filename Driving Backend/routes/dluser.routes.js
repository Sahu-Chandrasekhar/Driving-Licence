const {
    DlUserInsert, ReadDlUsers, getDlByUser, updateDlStatus, DeleteDl
} = require("../controller/dluser.controller");

module.exports = app => {
    app.post("/api/dl_user_insert", DlUserInsert);
    app.get("/api/dl_user_view", ReadDlUsers)
    // app.get("/api/dl_get_by_Id", getDlById)
    app.post("/api/get_dl_by_user_id", getDlByUser)
    app.post("/api/update_dl_status",updateDlStatus)
    app.post("/api/delete_dl_data",DeleteDl)


};