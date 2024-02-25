import ProcessPayment from "./application/usecase/ProcessPayment";
import { PgPromiseAdapter } from "./infra/database/DatabaseConnection";
import { ExpressAdapter } from "./infra/http/HttpServer";
import MainController from "./infra/http/MainController";
import Registry from "./infra/di/Registry";

const httpServer = new ExpressAdapter();
const connection = new PgPromiseAdapter();
const processPayment = new ProcessPayment(accountRepository, mailerGateway);
const registry = Registry.getInstance();
registry.register("processPayment", processPayment);
new MainController(httpServer);
httpServer.listen(3003);