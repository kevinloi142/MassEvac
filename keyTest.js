const axios = require('axios');

const key = 'IixDo0rkv3xMZQTGgCpnzcGsW2kldjAe';
const url = 'https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/15/json';
const point = '34.202035,-118.157053';

axios.get(url, {
    params: {
        key,
        point,
        unit: 'mph'
    }
}).then(res => {
    console.log('✅ Key works:', res.data);
}).catch(err => {
    if (err.response) {
        console.error('❌ Error status:', err.response.status);
        console.error('❌ Message:', err.response.data);
    } else {
        console.error('❌ Request failed:', err.message);
    }
});
