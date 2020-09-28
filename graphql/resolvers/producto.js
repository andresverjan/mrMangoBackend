const Producto = require("../../models/producto");
const helpers = require("../../helpers");

module.exports = {
    productos: async (args, ctx) => {
        let user, comercioId;
        try {
            user = await helpers.getUserByJwt(ctx);
            comercioId = user.comercioId ? user.comercioId : 1;
        } catch (error) {
            comercioId = 1;
        }

        try {
            const list = await Producto.find({ comercioId });
            console.log(list);
            return list.map((item) => {
                return {
                    ...item._doc,
                    _id: item._id,
                };
            });
        } catch (error) {
            throw error;
        }
    },

    listarProductos: async (args) => {
        let where = {};
        if (args.filter != null && args.filter != undefined) {
            where = helpers.getFilterFormObject(args.filter);
        }
        console.log("LISTADO... ");        
        try {
            return  await Producto.find(where);            
        } catch (error) {
            throw error;
        }
    },


    createProducto: async (args) => {
        try {
            const { id,  name, lastName, img, description, comercioId } = args.producto;
            console.log(args);
            const item = new Producto({
                id,  name, lastName, img, description, comercioId
            });
            const newItem = await item.save();
            return { ...newItem._doc, _id: newItem._id };
            //return { ...newUser}
        } catch (error) {
            throw error;
        }
    },

    updateProducto: async (args) => {
        try {
            const { _id, id, name, img, description, comercioId } = args.producto;

            const objToUpdate = {
                _id, id, name, img, description, comercioId
            };

            for (let prop in objToUpdate) {
                if (!objToUpdate[prop]) {
                  delete objToUpdate[prop];
                }
                if (prop == "_id") {
                  delete objToUpdate[prop];
                }
              }
              const newUser = await Producto.findOneAndUpdate({ _id: _id }, { $set: objToUpdate }, { new: false });
            if (!newUser) {
                throw new Error("User not found");
            }
            return { ...newUser._doc, _id: newUser.id };
            //return { ...newUser}
        } catch (error) {
            throw error;
        }
    },

    deleteProducto: async (args) => {
        try {
            const { _id } = args.producto;
            console.log(args);
            const item = new Producto({
                _id: _id,
            });
            const newUser = await item.deleteOne(item._id);
            return { ...newUser._doc, _id: newUser.id };
        } catch (error) {
            throw error;
        }
    },
};
