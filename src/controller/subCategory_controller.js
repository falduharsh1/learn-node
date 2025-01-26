
const getSubCategory = (req,res) => {
    try {
        res.send('Get a SubCategory')
    } catch (error) {
        console.log(error);
    }

}

const addSubCategory = (req,res) => {
    try {
        res.send('Add a SubCategory')
    } catch (error) {
        console.log(error);
    }

}

const putSubCategory = (req,res) => {
    try {
        res.send('Put a SubCategory')
    } catch (error) {
        console.log(error);
    }

}

const deleteSubCategory = (req,res) => {
    try {
        res.send('Delete a SubCategory')
    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    getSubCategory,
    addSubCategory,
    putSubCategory,
    deleteSubCategory
}