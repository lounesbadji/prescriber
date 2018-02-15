import {IMedicineModel} from "../../model/medicine/medicine.model";
import {MedicineInput} from "../../../model/input/medicine/medicine.input";
import {Medicine} from "../../schema/medicine/medicine.schema";
export class MedicineDAO {

    static setMedicines(medicines: MedicineInput[], callback: (medicines: IMedicineModel[], error: string) => void) {
        let medicinesCreated: IMedicineModel[] = [];

        console.log(medicines);
        medicines.forEach(m => {
            let medicineToCreate = new Medicine(m);
            medicineToCreate.save((error, data) => {
                if (error) {
                    console.log(error);
                }
                if (data) {
                    let medicineToCreate = new Medicine(data);
                    medicinesCreated.push(medicineToCreate);
                }
            });

        });
        callback(medicinesCreated, null);
    }
}
