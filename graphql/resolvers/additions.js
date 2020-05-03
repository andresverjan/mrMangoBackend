const Additions = require('../../models/additions')
module.exports = {
    additions: async args => {
        console.log("argumentos ");
        console.log(args);
    try {
       const list = await Additions.find()
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