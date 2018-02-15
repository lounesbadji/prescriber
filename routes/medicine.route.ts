import express = require("express")
import {MedicineDAO} from "../mongo/dao/medicine/medicine.dao";

export class MedicineRoute {

    static addMedicines(req: express.Request, res: express.Response) {

        let medicines = req.body;

        console.log(req.body);

        MedicineDAO.setMedicines(medicines, (medicinesAdded, error) => {
            res.status(error ? 401 : 200).send(error ? error : medicinesAdded);
        });
    }
}
