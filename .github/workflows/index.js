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
        FairOaksAve: [
            await getData(34.206195, -118.141877),
            await getData(34.202681, -118.143626),
            await getData(34.0173022,-118.4889126),
	    await getData(34.196745, -118.146383),
            await getData(34.193781, -118.147707),
	    await getData(34.188483, -118.150239),
            await getData(34.181153, -118.150800),
	    await getData(34.176570, -118.150764),
            await getData(34.170161, -118.150691),
	    await getData(34.164980, -118.150635),
            await getData(34.0173022,-118.4889126),
	    await getData(34.157262, -118.150612),
            await getData(34.0173022,-118.4889126),
	    await getData(34.153725, -118.150535),
            await getData(34.152485, -118.150454),
        ],
        WoodburyRd: [
            await getData(34.183149, -118.167973),
            await getData(34.182901, -118.159250),
            await getData(34.183252, -118.150292),
            await getData(34.181974, -118.143168),
            await getData(34.179293, -118.137149),
            await getData(34.177004, -118.132053),
        ],
        LincolnAve: [
            await getData(34.201603, -118.159143),
            await getData(34.197335, -118.158947),
            await getData(34.191355, -118.158701),
            await getData(34.187290, -118.159731),
            await getData(34.175308, -118.159695),
        ],
        HollistronAve: [
            await getData(34.193289, -118.123295),
            await getData(34.189629, -118.123272),
            await getData(34.185521, -118.123242),
            await getData(34.181130, -118.123224),
            await getData(34.177402, -118.123194),
            await getData(34.173189, -118.123174),
            await getData(34.168574, -118.123137),
            await getData(34.161072, -118.123086),
            await getData(34.155662, -118.122973),
            await getData(34.152918, -118.122996),
        ],
        SinaloaAve: [
            await getData(34.194027, -118.117184),
            await getData(34.189533, -118.117315),
            await getData(34.185658, -118.117159),
            await getData(34.181686, -118.115545),
            await getData(34.177895, -118.115870),
            await getData(34.174578, -118.115856),
            await getData(34.171122, -118.115287),
            await getData(34.166613, -118.115459),
            await getData(34.165282, -118.115631),
            await getData(34.162805, -118.115641),
            await getData(34.158668, -118.115545),
            await getData(34.154542, -118.115564),
        ],
	AllenAve: [
            await getData(34.190519, -118.112427),
            await getData(34.185771, -118.111227),
            await getData(34.182905, -118.111516),
            await getData(34.180286, -118.111877),
            await getData(34.177278, -118.112256),
            await getData(34.173165, -118.112779),
            await getData(34.168810, -118.113009),
            await getData(34.164449, -118.113104),
            await getData(34.160195, -118.113118),
            await getData(34.157314, -118.113190),
            await getData(34.155208, -118.113217),
            await getData(34.153133, -118.113136),
        ],
	bundyDr: [
            await getData(34.0430893,-118.463707),
            await getData(34.0430893,-118.463707),
            await getData(34.0353517,-118.4558876),
        ],
	bundyDr: [
            await getData(34.0430893,-118.463707),
            await getData(34.0430893,-118.463707),
            await getData(34.0353517,-118.4558876),
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
