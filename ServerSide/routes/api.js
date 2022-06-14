const express = require('express')
const { Query } = require('mongoose')
const router = express.Router()
const Transaction = require('../model')

router.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

    next()
})

router.post('/transaction', function (req, res) {
    let Trans = new Transaction({
        amount: req.body.amount,
        category: req.body.category,
        vendor: req.body.vendor
    })
    Trans.save()
    res.status(200).send("insert successed!!")
})

router.get('/breakdown' , function ( req , res ){
    let filterData = {}

        Transaction.find({}, function (err, transactions) {
            transactions.forEach(element => {

                filterData[element.category] ?
                    filterData[element.category] += element.amount :
                    filterData[element.category] = element.amount

            })

            res.send(filterData)

        })
})

router.get('/transaction', function (req, res) {

        Transaction.find({}, function (error, transactions) {
            if (error) { res.status(404).send('Not Found!!') }
            res.send(transactions)
        })

})

router.delete('/transaction/:id', function (req, res) {
    let _ID = req.params.id
    Transaction.findById(_ID, function (err, transaction) {
        if (err) { res.status(404).send('Not Found Transaction!!') }
        transaction.remove(function (err) {
            res.status(200).send('Operation deleted has been success!!')
        })
    })
})

module.exports = router;


