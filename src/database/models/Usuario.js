module.exports = (sequelize , dataTypes)=> {
    let alias = "Users";

    let cols = {
        id: {
            type : dataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
        },
        name: {
            type : dataTypes.STRING,
            null : false,

        },
    };
    let config = {
        tableName : "Users",
        timestamps : false,               //en caso de que nuestra trabla no tenga fechas como puede ser de creacion de la fila, etc, este atributo debe aparecer y decir false

    }
    const User = sequelize.define(alias , cols , config);
    return User
}
