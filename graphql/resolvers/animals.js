const Animals = require("../../models/animals");

module.exports ={

    createAnimal: async (args)=> {
        try{
            const {name, raza, age, gender}= args.animal;
            const animal = new Animals({
                name,
                raza,
                age,
                gender
            });
            const animalGuardado= await animal.save();
            return {...animalGuardado._doc}
        }catch (error) {
            throw error;
          }
    },
    updateAnimal: async (args) => {
        try {
          const {_id,name, age, gender, raza } = args.animal;
          const objToUpdate = {
           name,
           age,
           gender,
           raza
          };
    
          for (let prop in objToUpdate) {
            if (!objToUpdate[prop]) {
              delete objToUpdate[prop];
            }
            if (prop == "_id") {
              console.log(prop);
              delete objToUpdate[prop];
            }
          }
    
          const newUser = await Animals.findOneAndUpdate({ _id: _id }, { $set: objToUpdate }, { new: false });
          if (!newUser) {
            throw new Error("Not found");
          }
          return { ...newUser._doc, _id: newUser.id };
        } catch (error) {
          throw error;
        }
      },
      deleteAnimal: async (args) => {
        try {
          const { _id } = args.animal;
          console.log(args);
          const item = new Animals({
            _id: _id,
          });
          const newUser = await item.deleteOne(item._id);
          return { ...newUser._doc, _id: newUser.id };
        } catch (error) {
          throw error;
        }
      },


    AnimalsList: async (args)=> {
        try{
            const list = await Animals.find();
            return list.map((item) => {
                return {
                  ...item._doc,
                };
              });   
        }catch (error) {
            throw error;
          }
    }
}