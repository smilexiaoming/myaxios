import axios from './axios/index';

// axios({ url: '1.txt', method: 'post' });
// axios.get('1.txt', { headers: { aaa: 123 } });
// axios.post(
//   '1.txt',
//   { data: 123 },
//   {
//     headers: {
//       bbb: 123,
//     },
//   },
// );

// let axios1 = axios.create({
//   headers:{
//     common:{
//       aaa:333
//     }
//   }
// });
// axios1.default.baseUrl = '1';
// console.log(axios1.default)
// let axios2 = axios.create();
// axios2.default.baseUrl = '2';

// axios({url:'a.php',param:{a:1}})

// axios('a/d/../1.php',{
//   // baseUrl:'http://baidu.com/',
//   headers:{
//     a:1
//   },
//   param:{
//     b:2,
//     c:3
//   }
// })

async function getData() {
  const res = await axios('/5.json',{
    headers:{
      a:1
    },
    params:{b:3},
    transformRequest:function (config) {
      console.log({config})
      config.params.v = 111
      return config
    },
    transformResponse:function (res) {
      res = JSON.parse(res.data)
      return res
    },
  })

  console.log({res})
}

getData(0)