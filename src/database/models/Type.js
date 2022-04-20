module.exports = function(sequelize, dataTypes){
    let alias = "Type";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true, 
        },
        type: {
            type: dataTypes.STRING,
            
        }
    } 
    let config = {
        tableName: "type",
        timestamps: false 
    }
    let Type = sequelize.define(alias, cols, config);

    Type.associate = function(models){
        Type.hasMany(models.Product,{
            as: "products",
            foreignKey: "type_id"
        })
    }
    return Type;
}