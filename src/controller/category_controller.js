
const getCategory = (req,res) => {
    try {
        res.send('Get a Category')
    } catch (error) {
        console.log(error);
    }
}

const addCategory = (req,res) => {
    try {
        res.send('Post a Category')
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getCategory,
    addCategory
}