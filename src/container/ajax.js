import { 
    AsyncStorage,
} from 'react-native';
import URL from './url'
import common from './common'
import netInfo from './netInfo'
import { fomatUrl } from './m'
let base_url = URL.baseUrl

async function ajax(tar_url, method, params){
    common.showLoading()
    const noNetwork = await netInfo().then(res => {
      return res
    })
    if (noNetwork) {
      return {}
    }

    let url = base_url + tar_url
    if (method == 'get' && params) {
      url = fomatUrl(url, params)
    }
    let header = {
      "Content-Type": "application/json;charset=UTF-8",
    }
    await AsyncStorage.getItem('user').then(value => {
      const values = JSON.parse(value)
      if (value != null) {
        header.Authorization = values.AccessToken
        header.isMobile = true
      }
    }).catch(err => {})

    let data = {
      method: method, 
      headers: header
    }

    if (params) {
      data.body =  JSON.stringify(params)
    }

    return new Promise(function(resolve, reject) {
      fetch(url, data)
        .then((response) => response.json())
          .then((responseData) => {
            // if (responseData.status == '3') {
            //     readux._toRouter('login')
            // }
            console.log('res:')
            console.log(responseData)
            resolve(responseData)
            common.hidLoading()
          })
          .catch( (err) => {
            console.log('err:');    
            console.log(err)
            reject(err);
            common.hidLoading()
          })
    })
}
export default ajax