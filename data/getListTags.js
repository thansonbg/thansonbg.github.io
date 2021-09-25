import fs from "fs";
import path from "path";

const getListTags = () => {
    const filePath = path.join('data/tags.json');
    let data = fs.readFileSync(filePath);
    return JSON.parse(data.toString());
}

export default getListTags;