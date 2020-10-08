const Rol = require("../../models/rol");

module.exports = {
    roles: async (args) => {
        try {
        const list = await Rol.find();
        return list.map((item) => {
            return {
            ...item._doc,
            };
        });
        } catch (error) {
        throw error;
        }
    },

    createRol: async (args) => {
        try {
          const { id, name } = args.rol;
          const item = new Rol({
            id,
            name            
          });
          const newItem = await item.save();
          return { ...newItem._doc, _id: newItem.id };
        } catch (error) {
          throw error;
        }
      },

    deleteRol: async (args) => {
        try {
            const { _id } = args.rol;
            console.log(args);
            const item = new Rol({
            _id: _id,
        });
        const newUser = await item.deleteOne(item._id);
        return { ...newUser._doc, _id: newUser.id };
        } catch (error) {
        throw error;
        }
    },
};
