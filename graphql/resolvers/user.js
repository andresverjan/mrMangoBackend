const User = require('../../models/user')

module.exports = {
    users: async () => {
    try {
       const list = await User.find()
        return list.map(user => {
            return {
                ...user._doc, 
                _id: user.id,
                createdAt: new Date(user._doc.createdAt).toISOString() }
        })
    }
    catch (error) {
        throw error
    }
 },

  createUser: async args => {
  try {
    const { name, lastName } = args.user
    console.log(args);
    const user = new User({
        name,
        lastName
    })
    const newUser = await user.save();
    return { ...newUser._doc, _id: newUser.id }
    //return { ...newUser}
  }
  catch (error) {
      throw error
  }
 }, 

 updateUser: async args => {
    try {
      const { _id , name, lastName } = args.user
      console.log(args);
     const userUpdate = new User({
         _id,
          name,
          lastName
      })
      const newUser = await User.findOneAndUpdate(userUpdate._id,  userUpdate );
      if (!newUser) {
        throw new Error('User not found');
      }
      return { ...newUser._doc, _id: newUser.id }
      //return { ...newUser}
    }
    catch (error) {
        throw error
    }
   } , 

   deleteUser: async args => {
    try {
      const { _id} = args.user
      console.log(args);
      const user = new User({ 
          _id: _id
      })
      const newUser = await user.deleteOne(user._id);
      return { ...newUser._doc, _id: newUser.id }
    }
    catch (error) {
        throw error
    }
   }
}