const mongoose = require('mongoose'),
  glob = require('glob'),
  path = require('path');

const db = 'mongodb://localhost/dongye'
mongoose.Promise = global.Promise
exports.initSchema = () => {
  glob.sync(path.resolve(__dirname, './schema', '**/*.js')).forEach(require)
}
exports.connect = () => {
  let maxConnectTimes = 0;
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV !== 'production') {
      mongoose.set('debug', true)
    }
    mongoose.connect(db)
    mongoose.connection.on('disconnected', () => {
      maxConnectTimes++;
      if (maxConnectTimes < 5) {
        mongoose.connect(db)
      } else {
        throw new Error('数据库又挂了，快去修')
      }
    })
    mongoose.connection.on('error', error => {
      maxConnectTimes++;
      if (maxConnectTimes < 5) {
        mongoose.connect(db)
      } else {
        throw new Error('数据库又挂了，快去修')
      }
    })

    mongoose.connection.on('open', () => {
      resolve()
      console.log('MongoDB Connected  successfully!')
    })
  })
}
