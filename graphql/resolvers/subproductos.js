const Subproducto = require("../../models/subproducts");
const helpers = require("../../helpers");

module.exports = {
    subproductos: async (args, ctx) => {
        let user, comercioId;
        try {
            user = await helpers.getUserByJwt(ctx);
            comercioId = user.comercioId;
            comercioId = user.comercioId ? user.comercioId : 1;
        } catch (error) {
            comercioId = 1;
        }

        try {
            const list = await Subproducto.find({ comercioId });
            console.log(list);
            return list.map((item) => {
                return {
                    ...item._doc,
                    _id: item.id,
                };
            });
        } catch (error) {
            throw error;
        }
    },

    getSubproductosByProductoId: async (args) => {
        try {
            console.log("argumentos ");
            console.log(args);
            const productoId = args.productoId;
            const comercioId = args.comercioId ? args.comercioId : 1;
            console.log("el  valor es: " + productoId);
            console.log("el  valor es: " + comercioId);

            const list = await Subproducto.find({
                productoId: { $eq: productoId },
                //comercioId: { $eq: parseInt(comercioId)},
                //comercioId: "1",
            });
            console.log(list);

            if (!list) {
                throw new Error("not found");
            }
            console.log(list);
            return list.map((item) => {
                return {
                    ...item._doc,
                    _id: item.id,
                };
            });
        } catch (error) {
            throw error;
        }
    },

    listarSubproductos: async (args) => {
        let where = {};
        if (args.filter != null && args.filter != undefined) {
//            console.log("LISTADO... args.filter ", args.filter); 
          let filter = helpers.getFilterFormObject(args.filter);
          where = { $and: filter };
//          console.log("LISTADO... WHERE", where); 
        }
               
        try {
            return  await Subproducto.find(where);            
        } catch (error) {
            throw error;
        }
    },

    createSubproducto: async (args) => {
        try {
            const { name, img, activo, description, value, productoId, comercioId } = args.subproducto;
            console.log("a ver que llegó",args);
            const item = new Subproducto({
                name, productoId, activo, value, img, description, comercioId
            });
            const newItem = await item.save();
            console.log("a ver que SALIó",newItem);
            return { ...newItem._doc, _id: newItem._id };
            //return { ...newUser}
        } catch (error) {
            throw error;
        }
    },

    updateSubproducto: async (args) => {
        try {
            const { _id, name, img, activo, description, value, productoId, comercioId } = args.subproducto;

            const objToUpdate = {
                _id, name, img, activo, description, value, productoId, comercioId
            };

            for (let prop in objToUpdate) {
                if (!objToUpdate[prop]) {
                  delete objToUpdate[prop];
                }
                if (prop == "_id") {
                  delete objToUpdate[prop];
                }
              }
              const newUser = await Subproducto.findOneAndUpdate({ _id: _id }, { $set: objToUpdate }, { new: false });
            if (!newUser) {
                throw new Error("User not found");
            }
            return { ...newUser._doc, _id: newUser.id };
            //return { ...newUser}
        } catch (error) {
            throw error;
        }
    },

    deleteSubproducto: async (args) => {
        try {
            const { _id } = args.subproducto;
            console.log(args);
            const item = new Subproducto({
                _id: _id,
            });
            const newUser = await item.deleteOne(item._id);
            return { ...newUser._doc, _id: newUser.id };
        } catch (error) {
            throw error;
        }
    }
};
