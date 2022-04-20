module.exports = function(sequelize, dataTypes){
    let alias = "Product";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true, 
        },
        product_name: {
            type: dataTypes.STRING,
            
        },
        price: {
            type: dataTypes.DECIMAL,
            
        },
        duration: {
            type: dataTypes.INTEGER,
            
        },
        image: {
            type: dataTypes.STRING,
            
        },
        category_id: {
            type: dataTypes.INTEGER,
            
        },
        type_id: {
            type: dataTypes.INTEGER,
            
        },
        user_id: {
            type: dataTypes.INTEGER,
            
        }
    } 
    let config = {
        tableName: "products",
        timestamps: false 
    }
    let Product = sequelize.define(alias, cols, config);

    Product.associate = function(models){
        Product.belongsTo(models.User,{
            as: "user",
            foreignKey: "user_id"
        });
        Product.belongsTo(models.Category,{
            as: "category",
            foreignKey: "category_id"
        });
        Product.belongsTo(models.Type,{
            as: "type",
            foreignKey: "type_id"
        });
    }
    return Product;
}