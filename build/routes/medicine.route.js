"use strict";
exports.__esModule = true;
var medicine_dao_1 = require("../mongo/dao/medicine/medicine.dao");
var MedicineRoute = /** @class */ (function () {
    function MedicineRoute() {
    }
    MedicineRoute.addMedicines = function (req, res) {
        var medicines = req.body;
        console.log(req.body);
        medicine_dao_1.MedicineDAO.setMedicines(medicines, function (medicinesAdded, error) {
            res.status(error ? 401 : 200).send(error ? error : medicinesAdded);
        });
    };
    return MedicineRoute;
}());
exports.MedicineRoute = MedicineRoute;
//# sourceMappingURL=medicine.route.js.map