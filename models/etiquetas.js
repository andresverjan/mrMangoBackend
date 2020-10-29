module.exports = (sequelize, Sequelize) => {
  const Etiquetas = sequelize.define("etiquetas", {
    nombre: {
      type: Sequelize.STRING
    },
    descripcion: {
      type: Sequelize.STRING
    },
    label: {
      type: Sequelize.BOOLEAN
    },
    idioma_id: {
      type: Sequelize.BOOLEAN
    }
  });
  return Etiquetas;
};