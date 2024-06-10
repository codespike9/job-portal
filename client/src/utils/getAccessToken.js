import Cookies from 'js-cookie';

const getAccessToken=()=>{
    const accessToken=Cookies.get('access_token')
    return accessToken;
}

exports.default=getAccessToken