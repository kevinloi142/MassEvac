const axios = require('axios');
const { writeFileSync } = require('fs');
const { ZonedDateTime, ZoneId } = require('@js-joda/core');
require('@js-joda/timezone');
const key = 'IixDo0rkv3xMZQTGgCpnzcGsW2kldjAe';

const getDate = () => {
    const zdt = ZonedDateTime.now(ZoneId.of('America/Los_Angeles'));
    const year = zdt.year().toString().padStart(2, '0');
    const month = zdt.monthValue().toString().padStart(2, '0');
    const day = zdt.dayOfMonth().toString().padStart(2, '0');
    const hour = zdt.hour().toString().padStart(2, '0');
    const minute = zdt.minute().toString().padStart(2, '0');

    return `${year}-${month}-${day}T${hour}:${minute}`;
};

const getData = async (lat, lng) => {
    const url = 'https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute';
    const zoom = 20;

    const { data } = await axios({
        method: 'get',
        url: `${url}/${zoom}/json`,
        params: {
            key,
            point: `${lat},${lng}`,
            unit: 'mph'
        }
    });

    data.flowSegmentData.point = { lat, lng };

    delete data.flowSegmentData.coordinates;
    delete data.flowSegmentData['@version'];

    return data.flowSegmentData;
};

const getAllStreets = async (date) => {
    return {
        date,
        LomaAltaDr: [
            await getData(34.202035, -118.157053), 
            await getData(34.202583, -118.149205),
            await getData(34.202994, -118.143964),
            await getData(34.203342, -118.140448),
            await getData(34.0256252,-118.4778303),
            await getData(34.203741, -118.135098),
            await getData(34.204035, -118.131142),
        ],
        ApelloSt: [
           await getData(34.202771, -118.142484), 
           await getData(34.201581, -118.139738), 
           await getData(34.199778, -118.135975), 
           await getData(34.198882, -118.133409), 
           await getData(34.198409, -118.132445), 
        ],
        LakeAve: [ 
            await getData(34.203904, -118.130668),
            await getData(34.202058, -118.130799),
            await getData(34.200339, -118.130853),
            await getData(34.198766, -118.130925),
            await getData(34.196838, -118.131060),
	    await getData(34.193722, -118.131171),
            await getData(34.189973, -118.131318),
            await getData(34.185617, -118.131489),
            await getData(34.181363, -118.131715),
            await getData(34.176728, -118.131904),
	    await getData(34.171055, -118.132151),
            await getData(34.167678, -118.132298),
            await getData(34.164749, -118.132457),
            await getData(34.160554, -118.132512),
            await getData(34.155456, -118.132443),
	    await getData(34.152393, -118.132523),
        ],
        AltadenaDr: [
            await getData(34.199913, -118.164083),
            await getData(34.198149, -118.158545),
            await getData(34.195420, -118.150036),
            await getData(34.193697, -118.144700),
            await getData(34.191551, -118.137963),
            await getData(34.190381, -118.123171),
            await getData(34.190683, -118.119284),
	    await getData(34.190703, -118.115237),
            await getData(34.190629, -118.112283),
            await getData(34.188952, -118.106019),
            await getData(34.185030, -118.102616),
            await getData(34.182547, -118.100383),
	    await getData(34.177749, -118.099154),
            await getData(34.174097, -118.098251),
            await getData(34.168722, -118.098299),
            await getData(34.165337, -118.098350),
            await getData(34.160898, -118.098461),
            await getData(34.156562, -118.098523),
            await getData(34.153143, -118.098742),
        ],
        lincolnBlvd: [
            await getData(34.021716,-118.4911839),
            await getData(34.020946,-118.4917534),
            await getData(34.0173022,-118.4889126),
        ],
        fourteenthSt: [
            await getData(34.0254804,-118.4863837),
            await getData(34.0254804,-118.486383),
            await getData(34.0261248,-118.4870393),
        ],
        twentiethSt: [
            await getData(34.0313657,-118.4814129),
            await getData(34.0313657,-118.4814129),
            await getData(34.0282196,-118.4786983),
        ],
        twentieSixthSt: [
            await getData(34.035359,-118.4775441),
            await getData(34.035359,-118.4775441),
            await getData(34.0315788,-118.4726944),
        ],
        bundyDr: [
            await getData(34.0430893,-118.463707),
            await getData(34.0430893,-118.463707),
            await getData(34.0353517,-118.4558876),
        ],
        barringtonAve: [
            await getData(34.0498258,-118.4608534),
            await getData(34.0456968,-118.4572626),
            await getData(34.0414742,-118.4543709)
        ]
    };
};


(async () => {
    const date = getDate();
    const path = '/root/TomTomScript/output';

    writeFileSync(
	`${path}/${date}.json`,
	JSON.stringify(await getAllStreets(date))
    );
})();
