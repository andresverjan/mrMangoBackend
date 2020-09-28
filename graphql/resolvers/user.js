const User = require("../../models/user");
const helpers = require("../../helpers");

module.exports = {
  users: async (args) => {
    try {
      let where = {};
      if (args.filter != null && args.filter != undefined) {
        where = helpers.getFilterFormObject(args.filter);
      }

      let sort = { name: "1" };
      if (args.order != null && args.order != undefined) {
        sort = helpers.getOrderFromObject(args.order);
      }

      const list = await User.find(where).sort(sort);
      return list.map((user) => {
        return {
          ...user._doc,
          _id: user.id,
          createdAt: new Date(user._doc.createdAt).toISOString(),
        };
      });
    } catch (error) {
      throw error;
    }
  },

  createUser: async (args) => {
    try {
      const {
        name,
        lastName,
        phoneNumber,
        email,
        latlng,
        jwt,
        urlPhoto,
        rol_id,
        username,
        password,
      } = args.user;
      const user = {
        name,
        lastName,
        phoneNumber,
        email,
        latlng,
        jwt,
        urlPhoto,
        rol_id,
        username,
        password,
        createdAt: new Date(),
      };

      const newUser = await User.findOneAndUpdate(
        { email: { $eq: user.email } },
        { $set: user },
        { new: true, upsert: true }
      );
      return { ...newUser._doc, _id: newUser.id };
    } catch (error) {
      throw error;
    }
  },

  updateUser: async (args) => {
    try {
      const {
        _id,
        name,
        lastName,
        phoneNumber,
        email,
        latlng,
        jwt,
        urlPhoto,
        comercioId,
        rol_id,
        username,
        password,
      } = args.user;
      const userUpdate = {
        _id,
        name,
        lastName,
        phoneNumber,
        email,
        latlng,
        jwt,
        urlPhoto,
        comercioId,
        rol_id,
        username,
        password,
      };
      for (let prop in userUpdate) {
        if (!userUpdate[prop]) {
          delete userUpdate[prop];
        }
      }
      console.log(userUpdate);
      const newUser = await User.findOneAndUpdate(
        { _id: userUpdate._id },
        { $set: userUpdate },
        { new: true }
      );
      if (!newUser) {
        throw new Error("User not found");
      }
      return { ...newUser._doc, _id: newUser.id };
    } catch (error) {
      throw error;
    }
  },

  login: async (args) => {
    try {
      const { username, password } = args.login;
      const user = await User.findOne({ username });

      if (!user) {
        throw new Error("Invalid User");
      } else if (user.password === password) {
        console.log("Entro...", user.password == password);
        user.online = true;
        await User.findOneAndUpdate(
          { _id: user._id },
          { $set: user },
          { new: true }
        );
      } else {
        console.log("No Entro...");
        throw new Error("Invalid password");
      }

      return true;
    } catch (error) {
      throw error;
    }
  },

  logout: async (args, ctx) => {
    let user;
    try {
      user = await helpers.getUserByJwt(ctx);
      user.jwt = "";
      user.online = false;

      console.log(user);
      const newUser = await User.updateOne({ _id: user._id }, { $set: user });
      console.log(newUser);
      if (!newUser) {
        throw new Error("User not found");
      }
      return "hasta luego";
    } catch (error) {
      throw error;
    }
  },

  deleteUser: async (args) => {
    try {
      const { _id } = args.user;
      console.log(args);
      const user = new User({
        _id: _id,
      });
      const newUser = await user.deleteOne(user._id);
      return { ...newUser._doc, _id: newUser.id };
    } catch (error) {
      throw error;
    }
  },
};
