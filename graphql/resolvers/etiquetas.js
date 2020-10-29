const db = require("../../models");
const Etiquetas = db.etiquetas;
const Op = db.Sequelize.Op;

module.exports = {
    etiquetas: async (args) => {
        console.log("INGRESO A TUT¿ORIALES");
        try {
            let where = {};
            if (args.filter != null && args.filter != undefined) {
                where = helpers.getFilterFormObject(args.filter);
            }
            let sort = { name: "1" };
            if (args.order != null && args.order != undefined) {
                sort = helpers.getOrderFromObject(args.order);
            }
            return list = await Etiquetas.findAll();
        } catch (error) {
            throw error;
        }
    },
    delete: async (args) => {
        console.log("INGRESO A deleteEtiquetas");
        const { id  } = args.etiqueta;
        try {
            Etiquetas.destroy({
                where: { id: id }
            })
                .then(num => {
                    if (num == 1) {
                        console.log("Etiquetas was deleted successfully!");
                    } else {
                        console.log(`Cannot delete Etiquetas with id=${id}. Maybe Tutorial was not found!`);
                    }
                })
                .catch(err => {
                    console.log("Could not delete Tutorial with id=" + id);
                });
            return list = await Etiquetas.findAll();
        } catch (error) {
            throw error;
        }
    },
    create: async (args) => {
        console.log("INGRESO A CREATE Etiquetas");
        //const { id, img, value, active, description } = args.tutorial;
        try {
            return await Etiquetas.create(args.etiqueta).then(data => {
                console.log(data);
            })

        } catch (error) {
            throw error;
        }
    },
    update: async (args) => {
        console.log("INGRESO A updateTutorial");
        try {
            return await Etiquetas.update(args.etiqueta, {
                where: { id: args.tutorial.id }
            }).then(data => {
                console.log(data);
            });
        } catch (error) {
            throw error;
        }
    },


};

