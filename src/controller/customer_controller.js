// const mysqlpool = require("../../config/db")
const mysqlpool = require("../Db/mysqlDB")


const getCustomer = async (req, res) => {
    try {
        const Data = await mysqlpool.query(' SELECT * FROM customer')

        if (!Data) {
            return res.status(404).json({
                success: false,
                data: [],
                message: 'error in get customers'
            })
        }

        return res.status(200).json({
            success: true,
            data: Data[0],
            message: 'Successfully customer data get'
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            data: [],
            message: 'error in server' + error.message
        })
    }
}

const getOneCustomer = async (req,res) => {
    try {

        const cnum = req.params.id
        const Data = await mysqlpool.query(' SELECT * FROM customer WHERE cnum=?', [cnum])

        if (!Data) {
            return res.status(404).json({
                success: false,
                data: [],
                message: 'error in get customers'
            })
        }

        return res.status(200).json({
            success: true,
            data: Data[0],
            message: 'Successfully customer data get'
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            data: [],
            message: 'error in server' + error.message
        })
    }
}

const addCustomer = async (req, res) => {
    try {
        const { cname, city, rating, snum } = req.body

        const [Data] = await mysqlpool.query('INSERT INTO customer (cname,city,rating,snum) VALUES (?,?,?,?)', [cname, city, rating, snum])

        if (!Data) {
            return res.status(404).json({
                success: false,
                data: [],
                message: 'error in add customer'
            })
        }

        console.log('InsertId :', Data.insertId);

        return res.status(200).json({
            success: true,
            data: Data[0],
            message: 'Successfully customer data add'
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            data: [],
            message: 'error in server' + error.message
        })
    }
}

const putCustomer = async (req,res) => {
    try {
        const cnum = req.params.id
        const { cname, city, rating, snum } = req.body

        const [Data] = await mysqlpool.query('UPDATE customer SET cname = ? ,city = ?, rating = ? ,snum = ?  WHERE cnum = ? ', [cname, city, rating, snum, cnum])

        if (!Data) {
            return res.status(404).json({
                success: false,
                data: [],
                message: 'error in update customer'
            })
        }

        return res.status(200).json({
            success: true,
            data: Data[0],
            message: 'Successfully customer data update'
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            data: [],
            message: 'error in server' + error.message
        })
    }
}

const deleteCustomer = async (req,res) => {
    try {
        const cnum = req.params.id

        const [Data] = await mysqlpool.query('DELETE FROM customer WHERE cnum = ?',[cnum])

        if (!Data) {
            return res.status(404).json({
                success: false,
                data: [],
                message: 'error in delete customer'
            })
        }

        return res.status(200).json({
            success: true,
            data: Data[0],
            message: 'Successfully customer data delete'
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: [],
            message: 'error in server' + error.message
        })
    }
}

module.exports = {
    getCustomer,
    getOneCustomer,
    addCustomer,
    putCustomer,
    deleteCustomer
}