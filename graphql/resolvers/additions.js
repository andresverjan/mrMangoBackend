const Additions = require("../../models/additions");
const helpers = require("../../helpers");

module.exports = {
  additions: async (args) => {
    console.log("argumentos ");
    console.log(args);
    try {
      let where = {};
      if (args.filter != null && args.filter != undefined) {
        where = helpers.getFilterFormObject(args.filter);
      }

      let sort = { name: "1" };
      if (args.order != null && args.order != undefined) {
        sort = helpers.getOrderFromObject(args.order);
      }

      const list = await Additions.find(where).sort(sort);
      return list.map((item) => {
        return {
          ...item._doc,
          _id: item._id,
          active: item.active ? item.active : true,
        };
      });
    } catch (error) {
      throw error;
    }
  },
  createAddition: async (args) => {
    try {
      const { name, img, value, active, description } = args.addition;
      console.log(args);
      const item = new Additions({
        name,
        img,
        value,
        active,
        description,
      });
      const newItem = await item.save();
      return { ...newItem._doc, _id: newItem._id };
    } catch (error) {
      throw error;
    }
  },

  updateAddition: async (args) => {
    try {
      const { _id, name, img, value, active, description } = args.addition;

      const objToUpdate = {
        name,
        img,
        value,
        active,
        description,
      };

      for (let prop in objToUpdate) {
        if (!objToUpdate[prop]) {
          delete objToUpdate[prop];
        }
        if (prop == "_id") {
          delete objToUpdate[prop];
        }
      }
      const newUser = await Additions.findOneAndUpdate({ _id: _id }, { $set: objToUpdate }, { new: false });
    
      if (!newUser) {
        throw new Error("Not found");
      }
      return { ...newUser._doc, _id: newUser._id };
    } catch (error) {
      throw error;
    }
  },

  deleteAddition: async (args) => {
    try {
      const { _id } = args.addition;
      console.log(args);
      const item = new Additions({
        _id: _id,
      });
      const newUser = await item.deleteOne(item._id);
      return { ...newUser._doc, _id: newUser._id };
    } catch (error) {
      throw error;
    }
  },
};
