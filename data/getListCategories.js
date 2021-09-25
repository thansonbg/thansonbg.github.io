import fs from "fs";
import path from "path";

const getListCategories = () => {
    let data = fs.readFileSync('data/categories.json');
    return JSON.parse(data.toString());
}

export default getListCategories;


// const getListCategories = () => {
//     let data = require('./categories.json');
//     return JSON.parse(data.toString());
// }
//
// export default getListCategories;