const files = require.context('.', false, /\.js$/)
const apis = {}

files.keys().forEach((key) => {
  if (key === './index.js') return
  apis[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

export default apis
// import products from './products'
// import bills from './bills'

// export default {
//   products,
//   bills
// }
