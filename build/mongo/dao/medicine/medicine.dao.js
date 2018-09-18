"use strict";
exports.__esModule = true;
var medicine_schema_1 = require("../../schema/medicine/medicine.schema");
var MedicineDAO = /** @class */ (function () {
    function MedicineDAO() {
    }
    MedicineDAO.setMedicines = function (medicines, callback) {
        var medicinesCreated = [];
        console.log(medicines);
        medicines.forEach(function (m) {
            var medicineToCreate = new medicine_schema_1.Medicine(m);
            medicineToCreate.save(function (error, data) {
                if (error) {
                    console.log(error);
                }
                if (data) {
                    var medicineToCreate_1 = new medicine_schema_1.Medicine(data);
                    medicinesCreated.push(medicineToCreate_1);
                }
            });
        });
        callback(medicinesCreated, null);
    };
    return MedicineDAO;
}());
exports.MedicineDAO = MedicineDAO;
//# sourceMappingURL=medicine.dao.js.map