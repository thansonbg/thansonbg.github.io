import fs from "fs";
import path from "path";

const getListPosts = () => {
    const filePath = path.join('data/posts.json');
    let data = fs.readFileSync(filePath);
    return JSON.parse(data.toString()).filter(item => !item.hide);
}

export default getListPosts;