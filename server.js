const route = require('./route')
const databaseServer = require('./integration/sql')
const syncDatabase = require('./integration/sql/boostrap')
server = require('http').Server(route);
const PORT = process.env.PORT || 3005
async function bootstrap(argument) {
    const testConnect = await databaseServer.connect()
    if(testConnect) {
        //syncDatabase.restartDB(); //chỉ sử dụng khi muốn xóa bảng đang dùng
        syncDatabase.syncDB();
        // syncDatabase.deleteDB()
        //syncDatabase.alterDB()
        //syncDatabase.syncModel()
        server.listen(PORT, () => {
            console.log("http App is running at port " + PORT);
        });
    }
}

bootstrap()