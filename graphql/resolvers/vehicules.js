const Vehicule = require("../../models/vehicules");
const helpers = require("../../helpers");

module.exports = {
    vehicules: async (args) => {
        let where = {};
        if (args.filter != null && args.filter != undefined) {
            where = helpers.getFilterFormObject(args.filter);
        }
        console.log("LISTADO... ");
        try {
            return await Vehicule.find(where);
        } catch (error) {
            throw error;
        }
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
            console.log(args);
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
            //return { ...newUser}
        } catch (error) {
            throw error;
        }
    },

    updateVehicule: async (args) => {
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

            const objToUpdate = {
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
                if (prop == "id") {
                    delete objToUpdate[prop];
                }
            }

            const newVehicule = await Vehicule.findOneAndUpdate(
                { id },
                { $set: objToUpdate },
                { new: false }
            );
            if (!newVehicule) {
                throw new Error("Vehivule not found");
            }
            return { ...newVehicule._doc, _id: newVehicule.id };
            //return { ...newUser}
        } catch (error) {
            throw error;
        }
    },

    deleteVehicule: async (args) => {
        // try {
        //     const { id } = args.vehicule;
        //     console.log(args);
        //     const item = new Vehicule({
        //         id,
        //     });
        //     const deletedVehicule = await item.deleteOne(item.id);
        //     return { ...deletedVehicule._doc, _id: deletedVehicule.id };
        // } catch (error) {
        //     throw error;
        // }

        console.log("ENTRO EN DELETE VEHICULO");

        try {
            const { id } = args.vehicule;
            console.log(args);
            const vehicule = new Vehicule({
                id: id,
            });
            const newVehicule = await vehicule.deleteOne(vehicule.id);
            return { ...newVehicule._doc, _id: newVehicule.id };
        } catch (error) {
            throw error;
        }
    },
};
