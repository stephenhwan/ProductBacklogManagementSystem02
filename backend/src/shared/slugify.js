function slugify(text){
    return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // bỏ dấu tiếng Việt
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // bỏ ký tự đặc biệt
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}
module.exports = slugify