const Documento = require("../../models/documentos");
const helpers = require("../../helpers");

module.exports = {
    documentos: async (args) => {
        let where = {};
        if (args.filter != null && args.filter != undefined) {
            where = helpers.getFilterFormObject(args.filter);
        }
        console.log(where)
        return await Documento.find(where);
    },

    createDocumento: async (args) => {
        console.log(args)
        try {
            const {
                id,
                name,
                description,
                fechaPublicacion,
            } = args.Documento;
            const item = new Documento({
                id,
                name,
                description,
                fechaPublicacion,
            });
            const newItem = await item.save();
            return { ...newItem._doc, _id: newItem.id };
        } catch (error) {
            throw error;
        }
    },

    updateDocumento: async (args) => {
        try {
            const {
                _id,
                id,
                name,
                description,
                fechaPublicacion,
            } = args.Documento;

            const objToUpdate = {
                _id,
                id,
                name,
                description,
                fechaPublicacion,
            };

            for (let prop in objToUpdate) {
                if (!objToUpdate[prop]) {
                    delete objToUpdate[prop];
                }
                if (prop == "_id") {
                    delete objToUpdate[prop];
                }
            }

            const newDocumento = await Documento.findOneAndUpdate(
                { _id },
                { $set: objToUpdate },
                { new: false }
            );
            if (!newDocumento) {
                throw new Error("Documento not found");
            }
            return { ...newDocumento._doc, _id: newDocumento.id };
        } catch (error) {
            throw error;
        }
    },

    deleteDocumento: async (args) => {

        try {
            const { _id } = args.Documento;
            console.log(args);
            const documento = new Documento({
                _id: _id,
            });
            const newDocumento = await documento.deleteOne(documento._id);
            return { ...newDocumento._doc, _id: newDocumento._id };
        } catch (error) {
            throw error;
        }
    },
};
