module.exports = function(sequelize, dataTypes){
    let alias = "User";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true, 
        },
        name: {
            type: dataTypes.STRING,
            
        },
        last_name: {
            type: dataTypes.DECIMAL,
            
        },
        email: {
            type: dataTypes.INTEGER,
            unique: true,
            validate:{
                isEmail:{
                    msg:"No es una dirección de correo valida",
                }
            }  
        },
        pasword: {
            type: dataTypes.STRING,
            
        }
    } 
    let config = {
        tableName: "users",
        timestamps: false 
    }
    let User = sequelize.define(alias, cols, config);

    User.associate = function(models){
        User.hasMany(models.Product,{
            as: "products",
            foreignKey: "user_id"
        })
    }
    return User;
}