import Transaction from "../../domain/entity/Transaction";
import pgp from "pg-promise";
import DatabaseConnection from "../database/DatabaseConnection";

// Port
export default interface TransactionRepository {
	save (transaction: Transaction): Promise<void>;
	findByRideId(rideId: string): Promise<Transaction>;
}

// Adapter Database
export class TransactionRepositoryDatabase implements TransactionRepository {

	constructor (readonly connection: DatabaseConnection) {
	}

	async save (transaction: Transaction) {
		await this.connection.query("insert into cccat15.transaction (transaction_id, ride_id, amount, date, status) values ($1, $2, $3, $4, $5)", [transaction.transactionId, transaction.rideId, transaction.amount, transaction.date, transaction.getStatus()]);
	}

	async findByRideId(rideId: string){
		const transaction = await this.connection.query("select * from cccat15.transaction where ride_id = $1", [rideId]);
		return Transaction.restore(transaction.transaction_id, transaction.ride_id, transaction.amount, transaction.date, transaction.status);
	}
}
