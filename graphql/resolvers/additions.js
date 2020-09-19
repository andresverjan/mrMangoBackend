const Additions = require("../../models/additions");
const helpers = require("../../helpers");

module.exports = {
  additions: async (args) => {
    console.log("argumentos ");
    console.log(args);
    try {
      let where = {};
      if (args.filter != null && args.filter != undefined) {
        let filter = helpers.getFilterFormObject(args.filter);
        where = { $or: filter };
      }

      const list = await Additions.find(where);
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
};
