import PaymentGateway from "../gateway/PaymentGateway";
import RideRepository from "../repository/RideRepository";

export default class FinishRide{
    constructor (readonly rideRepository: RideRepository, private paymentGateway: PaymentGateway) {

	}

	async execute (input: Input): Promise<void> {
		const ride = await this.rideRepository.get(input.rideId);
		if (!ride) throw new Error("Ride not found");
		ride.finish(input.rideId);
		await this.rideRepository.update(ride);
		await this.paymentGateway.processPayment({ rideId: ride.rideId, amount: ride.getFare() });
	}
}

type Input = {
	rideId: string
}