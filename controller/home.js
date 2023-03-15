function getHome(req,res) {
    return res.json({
        errorMsg: null,
        data: 'HomePage'
    })
}
module.exports = {
    getHome
}