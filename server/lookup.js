
const path =  require("path");

const mimeTypes = {
    "css": "text/css",
    "gif": "image/gif",
    "html": "text/html",
    "ico": "image/x-icon",
    "jpeg": "image/jpeg",
    "png": "image/png",
    'txt': "text/txt"
};

const lookup = (pathName) => {
    let ext = path.extname(pathName);
    ext = ext.split(".").pop();
    console.log("")
    return mimeTypes[ext] || mimeTypes['txt'];
}

module.exports = {
    lookup
}