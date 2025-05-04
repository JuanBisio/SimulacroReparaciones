const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './data/base.db' // Archivo de base de datos
});

const Reparacion = sequelize.define(
    "Reparacion",
  {
    IdArticulo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fechaReparacion: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    nombreCliente: {
        type: DataTypes.STRING(50),
        allowNull: false,
        len: {
          args: [0, 50],
          msg: "Nombre debe ser tipo caracteres, entre 0 y 50 de longitud",
        },
    },
    tipoEquipo: {
        type: DataTypes.STRING(30),
        allowNull: false,
        len: {
          args: [0, 30],
          msg: "Tipo de equipo debe ser tipo caracteres, entre 0 y 30 de longitud",
        },
    },
    descripcionProblema: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    estado: {
        type: DataTypes.STRING(25),
        allowNull: false,
        validate: {
          len: {
            args: [0, 25],
            msg: "Estado debe ser tipo caracteres, con un máximo de 25 de longitud",
          },
        },
    },
    costoEstimado: {
        type: DataTypes.DECIMAL,
        allowNull: true,
    },
    Pagado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}
);

module.exports = {
  sequelize,
  Reparacion,
};
