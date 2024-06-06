import jsonServer from "json-server";
const server = jsonServer.create();
const router = jsonServer.router("./src/database/tasks.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

export default server;
