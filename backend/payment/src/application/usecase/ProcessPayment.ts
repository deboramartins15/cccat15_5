import Transaction from "./domain/entity/Transaction";

export default class ProcessPayment {

	constructor(readonly transactionRepository: TransactionRepository) {
	}

	async execute(input: Input) {
		const transaction = Transaction.create(input.rideId, input.amount);
		transaction.process();
		await this.transactionRepository.save(transaction);
	}
}

type Input = {
	rideId: string, creditCardToken: string, amount
}
