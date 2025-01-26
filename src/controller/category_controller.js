
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

const putCategory = (req,res) => {
    try {
        res.send('Put a Category')
    } catch (error) {
        console.log(error);
        
    }
}

const deleteCategory = (req,res) => {
    try {
        res.send('Delete a Category')
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getCategory,
    addCategory,
    putCategory,
    deleteCategory
}