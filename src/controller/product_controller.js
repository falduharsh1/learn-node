
const getProduct= (req,res) => {
    try {
        res.send('Get a Product')
    } catch (error) {
        console.log(error);
    }

}

const addProduct= (req,res) => {
    try {
        res.send('Add a Product')
    } catch (error) {
        console.log(error);
    }

}

const putProduct= (req,res) => {
    try {
        res.send('Put a Product')
    } catch (error) {
        console.log(error);
    }

}

const deleteProduct= (req,res) => {
    try {
        res.send('Delete a Product')
    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    getProduct,
    addProduct,
    putProduct,
    deleteProduct
}