// Entity e atua como Raiz do Aggregate (Account<AR>, Name, Email, Cpf, CarPlate)
export default class Transaction {
	private constructor (readonly transactionId: string, readonly rideId: string, readonly amount: number, readonly date: Date, private status: string) {
	}
	
	static create (rideId: string, amount: number) {
		const transactionId = crypto.randomUUID();
        const now = new Date();
        const status = 'created';
		return new Transaction(transactionId, rideId, amount, now, status);
	}

	static restore (transactionId: string, rideId: string, amount: number, date: Date, status: string) {
		return new Transaction(transactionId, rideId, amount, date, status);
	}

    process(){
        this.status = "success";
    }

    getStatus(){
        return this.status;
    }
}
