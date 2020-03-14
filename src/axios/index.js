import request from '../request'
import _default from '../default'
import {merge,assert,clone} from '../common'
import { createResponse } from '../response'
import {createReject} from '../reject'
const urlLib = require('url')

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
        let options = _this._preprocessArgs(undefined,args)

        if (!options) {
          if (args.length == 2) {
            assert(typeof args[0] == 'string', 'args[0] must is string');
            assert(
              typeof args[1] == 'object' &&
                args[1] &&
                args[1].constructor == Object,
              'args[1] must is JSON',
            );

            options = {
              ...args[1],
              url: args[0],
            };

            return _this.request(options);
          } else {
            assert(false, 'invaild args');
          }
        }
      }
    })
  }

  get(...args){
    console.log('--get--')

    let options = this._preprocessArgs('get',args)

    if (!options) {
      if (args.length == 2) {
        assert(typeof args[0] == 'string', 'args[0] must is string');
        assert(
          typeof args[1] == 'object' && args[1] && args[1].constructor == Object,
          'args[1] must is JSON',
        );

        options = {
          ...args[1],
          url: args[0],
          method: 'get',
        };
        return this.request(options);
      }else{
        assert(false, 'invaild args');
      }
    }
  }

  post(...args){
    console.log('--post--')

    let options = this._preprocessArgs('post',args)

    if (!options) {
      if (args.length == 2) {
        assert(typeof args[0] == 'string', 'args[0] must is string');
        options = {
          url: args[0],
          data: args[1],
          method: 'post',
        };

        return this.request(options);
      } else if (args.length == 3) {
        assert(typeof args[0] == 'string', 'args[0] must is string');
        assert(
          typeof args[1] == 'object' &&
            args[1] &&
            args[1].constructor == Object,
          'args[1] must is JSON',
        );

        options = {
          ...args[2],
          url: args[0],
          data: args[1],
          method: 'post',
        };
        return this.request(options);
      } else {
        assert(false, 'invaild argments');
      }
    }
  }

  delete(...args){
    console.log('--delete--')

    let options = this._preprocessArgs('delete',args)

    if (!options) {
      assert(typeof args[0] == 'string', 'args[0] must is string');
      assert(
        typeof args[1] == 'object' && args[1] && args[1].constructor == Object,
        'args[1] must is JSON',
      );

      options = {
        ...args[1],
        url: args[0],
        method: 'get',
      };

      return this.request(options);
    }
  }

  request(options){
    // 1. 跟this.default进行合并头
    let oldHeaders = this.default.headers;
    delete this.default.headers;
    let result = clone(this.default)
    
    merge(result,options)
    this.default.headers = oldHeaders;

    options = result

    // this.default.headers.common -> this.default.headers.get -> options
    let headers = {};
    merge(headers, this.default.headers.common);
    merge(headers, this.default.headers[options.method.toLowerCase()]);
    merge(headers, options.headers);

    options.headers = headers;

    console.log(options,'merge')

    // 2. 检测参数是否正确
    assert(options.method, 'no method');
    assert(typeof options.method == 'string', 'method must be string');
    assert(options.url, 'no url');
    assert(typeof options.url == 'string', 'url must be string');

    options.baseUrl = options.baseUrl ? options.baseUrl : '';

    // 3. baseUrl 合并请求
    options.url = urlLib.resolve(options.baseUrl, options.url);
    delete options.baseUrl;

    //处理transformRequest,transformResponse
    const { transformRequest, transformResponse } = options;
    delete options.transformRequest;
    delete options.transformResponse;

    if(transformRequest){
      transformRequest(options)
    }

    console.log(options,'result')
    
    // 4. 正式调用request(options)
    return new Promise((resolve,reject) => {
      request(options).then(res => {
        let result = createResponse(res)
        if(transformResponse){
          result = transformResponse(result)
        }
        resolve(result)
      },res => {
        reject(createReject(res))
      })
    })
  }

  _preprocessArgs(method,args){
    let options;
    if(args.length === 1 && typeof args[0] === 'string'){
      options = {method,url:args[0]}
    }else if(args.length === 1 && typeof args[0] === 'object'){
      options = {...args[0],method}
    }else{
      return undefined;
    }

    return options
  }
}

Axios.create = Axios.prototype.create = function(options={}) {
  let axios = new Axios();

  let res = JSON.parse(JSON.stringify(_default));

  merge(res,options)

  axios.default = res

  return axios;
};


export default Axios.create();