import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateRentalUseCase } from "./CreateRentalUseCase";



class CreateRentalController {

    async handle(req: Request, res: Response): Promise<Response> {
        
        const { expected_return_date, car_id } = req.body;
        const { id } = req.user;
        
        const createrRentalUseCase = container.resolve(CreateRentalUseCase)

        const rental = await createrRentalUseCase.execute({
            user_id: id,
            expected_return_date,
            car_id
        })

        return res.status(201).json(rental)
    }

}

export { CreateRentalController }