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

let axios1 = axios.create();
axios1.default.baseUrl = '1';
let axios2 = axios.create();
axios2.default.baseUrl = '2';