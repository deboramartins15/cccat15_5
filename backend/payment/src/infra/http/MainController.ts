import { PgPromiseAdapter } from "../database/DatabaseConnection";
import HttpServer from "./HttpServer";
import ProcessPayment from "../../application/usecase/ProcessPayment";
import Registry, { inject } from "../di/Registry";

// Interface Adapter (verde)
export default class MainController {
	@inject("processPayment")
	processPayment?: ProcessPayment;

	constructor (httpServer: HttpServer) {
		const registry = Registry.getInstance();
		httpServer.register("post", "/payment", async (params: any, body: any) => {
			const output = await this.processPayment?.execute(body);
			return output;
		});
	}
}