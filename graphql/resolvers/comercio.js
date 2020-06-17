const Comercio = require('../../models/comercios')

module.exports = {
    comercios: async () => {
    try {
       const list = await Comercio.find()
        return list.map(item => {
            return {
                ...item._doc,
                _id: item.id}
        })
    }
    catch (error) {
        throw error
    }
 },

  createComercio: async args => {
  try {
    const { name, location,  description  } = args.user
    console.log(args);
    const item = new Comercio({
        name,
        location,
        description
    })
    const newItem = await item.save();
    return { ...newItem._doc, _id: newItem.id }
  }
  catch (error) {
      throw error
  }
 }, 

 updateComercio: async args => {
    try {
      const { _id , name, location, description } = args.comercio
      
     const objToUpdate = new Comercio({
         _id,
          name,
          location, 
          description
      })
      const newUser = await User.findOneAndUpdate(objToUpdate._id,  objToUpdate );
      if (!newUser) {
        throw new Error('Not found');
      }
      return { ...newUser._doc, _id: newUser.id }
    }
    catch (error) {
        throw error
    }
   } , 

   deleteComercio: async args => {
    try {
      const { _id} = args.comercio
      console.log(args);
      const item = new Comercio({ 
          _id: _id
      })
      const newUser = await item.deleteOne(item._id);
      return { ...newUser._doc, _id: newUser.id }
    }
    catch (error) {
        throw error
    }
   } 

}