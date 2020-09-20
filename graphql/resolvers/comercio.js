const Comercio = require("../../models/comercios");
const User = require("../../models/user");
const helpers = require("../../helpers");

module.exports = {
  getComercioByLocation: async ({ location }, ctx) => {
    try {
      const list = await Comercio.find();
      const { lat, lng, id } = location;
      userCoord = {
        lat,
        lng,
        id,
      };

      const nearestShop = helpers.getNearestShop(list, userCoord);
      console.log(nearestShop);
      let userData = await helpers.getUserByJwt(ctx);

      //Comprobar si el ID del usuario y su JWT concuerdan
      if (!userData.id === id) {
        throw new Error("ID del request y del usuario no concuerdan");
      }

      userData.latlng = `${lat},${lng}`;
      userData.comercioId = nearestShop.id;

      await User.findOneAndUpdate(
        { _id: userData.id },
        { $set: userData },
        { new: true }
      );

      return nearestShop;
    } catch (error) {
      console.log(error);
    }
  },

  comercios: async (args) => {
    try {
      let where = {};
      if (args.filter != null && args.filter != undefined) {
        let filter = helpers.getFilterFormObject(args.filter);
        where = { $or: filter };
      }
      const list = await Comercio.find(where);
      return list.map((item) => {
        return {
          ...item._doc,
        };
      });
    } catch (error) {
      throw error;
    }
  },

  createComercio: async (args) => {
    try {
      const { id, name, location, description } = args.comercio;
      console.log(args);
      const item = new Comercio({
        id,
        name,
        location,
        description,
      });
      const newItem = await item.save();
      return { ...newItem._doc, _id: newItem.id };
    } catch (error) {
      throw error;
    }
  },

  updateComercio: async (args) => {
    try {
      const { _id, name, location, description } = args.comercio;

      const objToUpdate = new Comercio({
        name,
        location,
        description,
      });
      const newUser = await User.findOneAndUpdate(_id, objToUpdate);
      if (!newUser) {
        throw new Error("Not found");
      }
      return { ...newUser._doc, _id: newUser.id };
    } catch (error) {
      throw error;
    }
  },

  deleteComercio: async (args) => {
    try {
      const { _id } = args.comercio;
      console.log(args);
      const item = new Comercio({
        _id: _id,
      });
      const newUser = await item.deleteOne(item._id);
      return { ...newUser._doc, _id: newUser.id };
    } catch (error) {
      throw error;
    }
  },
};
