const Vehicule = require("../../models/vehicules");
const helpers = require("../../helpers");

module.exports = {
    vehicules: async (args) => {
        let where = {};
        if (args.filter != null && args.filter != undefined) {
            where = helpers.getFilterFormObject(args.filter);
        }
        return await Vehicule.find(where);
    },

    createVehicule: async (args) => {
        try {
            const {
                id,
                name,
                img,
                description,
                brand,
                model,
                color,
            } = args.vehicule;
            const item = new Vehicule({
                id,
                name,
                img,
                description,
                brand,
                model,
                color,
            });
            const newItem = await item.save();
            return { ...newItem._doc, _id: newItem.id };
        } catch (error) {
            throw error;
        }
    },

    updateVehicule: async (args) => {
        try {
            const {
                _id,
                id,
                name,
                img,
                description,
                brand,
                model,
                color,
            } = args.vehicule;

            const objToUpdate = {
                _id,
                id,
                name,
                img,
                description,
                brand,
                model,
                color,
            };

            for (let prop in objToUpdate) {
                if (!objToUpdate[prop]) {
                    delete objToUpdate[prop];
                }
                if (prop == "_id") {
                    delete objToUpdate[prop];
                }
            }

            const newVehicule = await Vehicule.findOneAndUpdate(
                { _id },
                { $set: objToUpdate },
                { new: false }
            );
            if (!newVehicule) {
                throw new Error("Vehicule not found");
            }
            return { ...newVehicule._doc, _id: newVehicule.id };
        } catch (error) {
            throw error;
        }
    },

    deleteVehicule: async (args) => {
        try {
            const { _id } = args.vehicule;
            const vehicule = new Vehicule({
                _id: _id,
            });
            const newVehicule = await vehicule.deleteOne(vehicule._id);
            return { ...newVehicule._doc, _id: newVehicule._id };
        } catch (error) {
            throw error;
        }
    },
};
