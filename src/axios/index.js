function request() {}

const _default = {
  method: 'get',
  headers: {
    common: {
      'X-Request-By': 'XMLHttpRequest',
    },
    get: {},
    post: {},
    delete: {},
  },
};

class Axios {
  constructor() {
    const _this = this;

    return new Proxy(request, {
      get(target,name){
        console.log('-->get',{target,name})
        return _this[name]
      },
      set(target, name, val) {
        console.log('-->set',{target,name, val})
        _this[name] = val;
    
        return true;
      },
      apply(fn, thisArg, args) {
        console.log('-->apply',{fn, thisArg, args})
      }
    })
  }

  get(){
    console.log('--get--')
  }

  post(){
    console.log('--post--')
  }

  delete(){
    console.log('--delete--')
  }
}

Axios.create = Axios.prototype.create = function() {
  let axios = new Axios();

  axios.default = JSON.parse(JSON.stringify(_default));

  return axios;
};


export default Axios.create();