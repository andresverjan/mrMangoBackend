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
    const { name, lastName, phoneNumber, email, latlng, jwt, urlPhoto } = args.user    
    const user  = {
        name,
        lastName,
        phoneNumber,
        email,
        latlng,
        jwt,
        urlPhoto,
        createdAt: new Date()
    };

    const newUser = await User.findOneAndUpdate({email: { $eq: user.email}}, { $set: user }, { new: true,  upsert: true} );
    return { ...newUser._doc, _id: newUser.id };
  }
  catch (error) {
      throw error
  }
 }, 

 updateUser: async args => {
    try {
      const { _id , name, lastName, phoneNumber, email, latlng, jwt, urlPhoto, comercioId} = args.user;
     const userUpdate = {
          _id,
          name,
          lastName,
          phoneNumber,
          email,
          latlng,
          jwt,
          urlPhoto,
          comercioId
      };
      for(let prop in userUpdate) {
        if(!userUpdate[prop]){
          delete userUpdate[prop];
        }
      }
      console.log(userUpdate);
      const newUser = await User.findOneAndUpdate({_id:userUpdate._id}, { $set: userUpdate },  {new: true} );
      if (!newUser) {
        throw new Error('User not found');
      }
      return { ...newUser._doc, _id: newUser.id }
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