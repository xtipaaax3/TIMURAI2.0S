"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var koa_1 = require("koa");
var koa_bodyparser_1 = require("koa-bodyparser");
var koa2_cors_1 = require("koa2-cors");
var routers_1 = require("./routers/routers");
var app = new koa_1.default();
var port = Number(process.env.PORT) || 3000;
app.use((0, koa_bodyparser_1.default)());
app.use((0, koa2_cors_1.default)());
app.use(routers_1.default.routes());
app.listen(port, function () {
    console.log("Server is running on port ".concat(port, "."));
});
app.on('error', function (err, ctx) {
    if (err.code === 'EADDRINUSE') { // 如果端口被占用
        console.log("Port ".concat(port, " is in use, trying another..."));
        port += 1;
        app.listen(port); // 尝试监听下一个端口
    }
    else {
        console.error('Server error', err);
    }
});
