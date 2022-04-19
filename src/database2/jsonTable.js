const fs = require('fs');
const path = require('path');

let model = function(tableName) {
    return {
        filePath: path.join(__dirname, '../database2/' + tableName + '.json'), //se crea la ruta donde se va a guardar la table .JSON con el nombre que le de al argumento de la funcion JsonTable en el controlador que lo requiera
                                                                              
        readFile() {
            let fileContents = fs.readFileSync(this.filePath, 'utf8'); //recupera los datos del archivo .json que se creo arriba
        
            if(fileContents) {
                return JSON.parse(fileContents); //si existe lo pasa de un archivo .JSON a un objeto literal
            }
        
            return []; //si no existe nos crea un array vacio
        },
        writeFile(contents) {    //este metodo debe recibir un argumento (contents) desde donde lo llamemos
            let fileContents = JSON.stringify(contents, null, " "); //convertimos el objeto literal que viene del formulario en un formato json 
            fs.writeFileSync(this.filePath, fileContents); //agrega el nuevo formulario en formato .JSON al archivo general .JSON
        },
        nextId() {
            let rows = this.readFile(); //trae el archivo .JSON pasado a objeto literal
            let lastRow = rows.pop();   //toma el ultimo elemento del objeto literal

            if (lastRow) {              //si tiene algun elemento
                return ++lastRow.id;    //al valor del elemento designado id le agrega 1
            }

            return 1;                    //si no hay ningun elemento nos devuelve el 1 que es el primer valor de Id
        },
        all() {
            return this.readFile();  //muestra todos los elementos del objeto literal
        },
        find(id) {                        //requiere que le demos un argumento
            let rows = this.readFile();  //trae el archivo .JSON pasado a objeto literal completo
            return rows.find(row => row.id == id) //nos muestra el elemento del objeto literal que coincida con el id que dimos de argumento
        },
        findByField(field , text) {                        //requiere que le demos dos argumentos por un lado el parametro que se va a buscar y por otro el valor que se debe comparar 
            let rows = this.readFile();  //trae el archivo .JSON pasado a objeto literal completo
            return rows.find(row => row[field] === text) //nos muestra el elemento del objeto literal que coincida con la busquesa 
        },
        create(row) {                   //requiere que le demos un argumento (objeto literal que venga del formulario)
            let rows = this.readFile(); //trae el archivo .JSON pasado a objeto literal completo
            row.id = this.nextId();     //al elemento id del objeto literal que llego como argumento que le dimos desde el formulario le pone el valor siguiente
            rows.push(row);             //agrega el objeto literal con id modificado, al array de objetos literales existente
 
            this.writeFile(rows);       //agrega el nuevo formulario en formato .JSON al archivo general .JSON

            return row.id;              //nos devuelve el numero de id del nuevo elemento
        },
        update(row) {
            let rows = this.readFile();     //trae el archivo .JSON pasado a objeto literal completo
            let updatedRows = rows.map(oneRow => {
                if (oneRow.id == row.id) { //si el id del objeto modificado es igual que el de ese elemento del array 
                    return row;            //se reemoplaza ese elemento por el nuevo que estamos enviando
                }

                return oneRow;             //si no coincide el id entonces se deja el elemento que estaba en esa posicion sin modificar
            }); 

            this.writeFile(updatedRows);  //la nueva matriz se escribe en el archivo .JSON

            return row.id;               //nos devuelve el valor del id de dicho elemento
        },
        delete(id) {
            let rows = this.readFile();  //trae el archivo .JSON pasado a objeto literal completo
            let updatedRows = rows.filter(oneRow => oneRow.id != id); //con el metodo .filter creamos un nuevo array (oneRow) que esta compuesto por todos los objetos cuyo id no coinciden con el del objeto que queremos eliminar

            this.writeFile(updatedRows); //la nueva matriz se escribe en el archivo .JSON
        }
    }
}

module.exports = model;