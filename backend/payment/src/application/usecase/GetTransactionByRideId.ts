import Transaction from "./domain/entity/Transaction";

export default class GetTransactionByRideId {

	constructor(readonly transactionRepository: TransactionRepository) {
	}

	async execute(input: Input): Promise<Output> {
		const transaction = await this.transactionRepository.findByRideId(input.rideId);
		return {
			transactionId: transaction.transactionId,
			rideId: transaction.rideId,
			amount: transaction.amount,
			date: transaction.date,
			status: transaction.getStatus()
		}
	}
}

type Input = {
	rideId: string
}

type Output = {
	transactionId: string,
	rideId: string,
	amount: number,
	date: Date,
	status: string
}
