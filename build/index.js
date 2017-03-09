module.exports = require(`./webpack.${process.env.NODE_ENV === 'prod' ? 'prod' : 'dev'}`)
