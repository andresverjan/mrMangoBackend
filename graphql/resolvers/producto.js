const Producto = require('../../models/producto')

module.exports = {
    productos: async () => {
    try {
       const list = await Producto.find()
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

  createProducto: async args => {
  try {
    const { name, lastName } = args.user
    console.log(args);
    const item = new Producto({
        name,
        lastName
    })
    const newItem = await item.save();
    return { ...newItem._doc, _id: newItem.id }
    //return { ...newUser}
  }
  catch (error) {
      throw error
  }
 }, 

 updateProducto: async args => {
    try {
      const { _id , name, lastName } = args.user
      
     const userUpdate = new Producto({
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

   deleteProducto: async args => {
    try {
      const { _id} = args.producto
      console.log(args);
      const item = new Producto({ 
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