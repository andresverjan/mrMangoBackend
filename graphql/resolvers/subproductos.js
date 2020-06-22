const Subproducto = require('../../models/subproducts')

module.exports = {
    subproductos: async args => {
        console.log("argumentos ");
        console.log(args);
    try {
       const list = await Subproducto.find();
       console.log(list);
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

 getSubproductosByProductoId: async args => {
    try {
      console.log("argumentos ");
      console.log(args);
      const  productoId = args.productoId;
      const  comercioId = args.comercioId? args.comercioId:1;
      console.log("el  valor es: " + productoId);
      console.log("el  valor es: " + comercioId);
    
      const list = await Subproducto.find( { 
          productoId: { $eq: productoId},
          //comercioId: { $eq: parseInt(comercioId)},
          //comercioId: "1", 
        });
        console.log(list);

      if (!list) {
        throw new Error('not found');
      }
      console.log(list);
      return list.map(item => {
        return {
            ...item._doc,
            _id: item.id}
    })
    }
    catch (error) {
        throw error
    }
   } 

}