import PaymentGateway from "../../application/gateway/PaymentGateway";
import axios from "axios";

export default class PaymentGatewayHttp implements PaymentGateway {
	async processPayment(input: any): Promise<any> {
		const response = await axios.post(`http://localhost:3003/payment/`, input);
		return response.data;
	}
}