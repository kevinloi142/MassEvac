const axios = require('axios');
const { writeFileSync, readFileSync, existsSync, mkdirSync } = require('fs');
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
	HillAve: [
            await getData(34.183788, -118.121668),
            await getData(34.179680, -118.121549),
            await getData(34.175761, -118.121576),
            await getData(34.172992, -118.121585),
            await getData(34.168454, -118.121513),
            await getData(34.163097, -118.121491),
            await getData(34.157441, -118.121442),
            await getData(34.154112, -118.121387),
            await getData(34.152813, -118.121315),
        ],
	LosRoblesAve: [
            await getData(34.181199, -118.141755),
            await getData(34.177933, -118.141708),
            await getData(34.174834, -118.141676),
            await getData(34.172009, -118.141653),
            await getData(34.168366, -118.141625),
            await getData(34.165473, -118.141612),
            await getData(34.161375, -118.141555),
            await getData(34.157472, -118.141507),
            await getData(34.153849, -118.141510),
            await getData(34.152453, -118.141565),
        ],
	MentoneAve: [
            await getData(34.180762, -118.157419),
            await getData(34.176797, -118.157392),
            await getData(34.171877, -118.157255),
            await getData(34.167504, -118.157353),
            await getData(34.165942, -118.157484),
        ],
	WindsorAve: [
            await getData(34.193872, -118.168259),
            await getData(34.191746, -118.168610),
            await getData(34.188976, -118.168631),
	    await getData(34.186143, -118.168632),
            await getData(34.183495, -118.168596),
            await getData(34.181858, -118.168961),
        ],
	WoodburyRd: [
            await getData(34.177002, -118.132052),
            await getData(34.179256, -118.137046),
            await getData(34.181513, -118.142028),
            await getData(34.183369, -118.146974),
            await getData(34.183142, -118.153076),
            await getData(34.183166, -118.160464),
            await getData(34.183200, -118.168283),
            await getData(34.185121, -118.175330),
            await getData(34.189221, -118.178381),
        ],
	FigueroaDr: [
            await getData(34.187444, -118.168473),
            await getData(34.187481, -118.160666),
            await getData(34.186998, -118.155117),
            await getData(34.185164, -118.151112),
        ],
	MountainViewSt: [
            await getData(34.192674, -118.168296),
            await getData(34.191134, -118.163421),
            await getData(34.189645, -118.158843),
            await getData(34.188090, -118.154039),
            await getData(34.187172, -118.151104),
        ],
	HowardSt: [
            await getData(34.173830, -118.161227),
            await getData(34.173065, -118.155545),
            await getData(34.172689, -118.152031),
            await getData(34.172545, -118.149284),
            await getData(34.172554, -118.146005),
            await getData(34.172590, -118.141871),
        ],
	WashingtonBlvd: [
            await getData(34.169521, -118.157429),
            await getData(34.168845, -118.152884),
            await getData(34.168881, -118.148462),
            await getData(34.168918, -118.142691),
            await getData(34.168948, -118.136669),
            await getData(34.169022, -118.127232),
            await getData(34.169065, -118.122065),
            await getData(34.169145, -118.117107),
            await getData(34.169176, -118.112353),
            await getData(34.169158, -118.105425),
            await getData(34.169162, -118.097940),
            await getData(34.166424, -118.091656),
            await getData(34.163076, -118.089915),
            await getData(34.159624, -118.089502),
            await getData(34.157076, -118.089369),
	    await getData(34.154295, -118.089561),
            await getData(34.152398, -118.090416),
            await getData(34.151834, -118.090537),
        ],
	MountainSt: [
            await getData(34.162153, -118.157209),
            await getData(34.161441, -118.153300),
            await getData(34.161517, -118.148575),
            await getData(34.161517, -118.144766),
            await getData(34.161547, -118.141368),
            await getData(34.161549, -118.136848),
            await getData(34.161608, -118.133753),
            await getData(34.161615, -118.129261),
            await getData(34.161661, -118.125362),
            await getData(34.161686, -118.121190),
            await getData(34.161833, -118.112854),
            await getData(34.161518, -118.106192),
            await getData(34.161565, -118.099852),	
        ],
	OrangeGroveBlvd: [
            await getData(34.154604, -118.156392),
            await getData(34.157830, -118.150194),
            await getData(34.157872, -118.144529),
            await getData(34.157825, -118.136663),
            await getData(34.157762, -118.131743),
            await getData(34.157863, -118.126706),
            await getData(34.157886, -118.121142),
            await getData(34.157907, -118.115417),
            await getData(34.158266, -118.106132),
            await getData(34.158287, -118.097878),
            await getData(34.158482, -118.091753),
            await getData(34.157656, -118.080973),
            await getData(34.151360, -118.073794),
            await getData(34.149002, -118.073509),
        ],
	VillaSt: [
            await getData(34.152881, -118.154008),
            await getData(34.154115, -118.150392),
            await getData(34.154146, -118.145817),
            await getData(34.154225, -118.142339),
            await getData(34.154242, -118.136800),
            await getData(34.154299, -118.132033),
            await getData(34.154313, -118.127657),
            await getData(34.154367, -118.123494),
            await getData(34.154349, -118.119739),
            await getData(34.154410, -118.112842),
            await getData(34.154382, -118.105957),
            await getData(34.154413, -118.098221),
            await getData(34.154400, -118.093850),
            await getData(34.154430, -118.088692),
        ],
	NewYorkDr: [
            await getData(34.179922, -118.136365),
            await getData(34.178410, -118.131525),
            await getData(34.178446, -118.126980),
            await getData(34.178504, -118.122736),
            await getData(34.178521, -118.116259),
            await getData(34.178264, -118.111520),
            await getData(34.175084, -118.106398),
            await getData(34.174776, -118.101448),
            await getData(34.174548, -118.096730),
            await getData(34.172245, -118.091787),
            await getData(34.166044, -118.085223),
            await getData(34.161164, -118.081102),
            await getData(34.156437, -118.081813),
            await getData(34.149815, -118.082467),
            await getData(34.148405, -118.082354),
        ],
	MapleSt: [
            await getData(34.150251, -118.088146),
            await getData(34.152268, -118.090943),
            await getData(34.153109, -118.094910),
            await getData(34.153145, -118.099043),
            await getData(34.153096, -118.104102),
            await getData(34.153043, -118.108072),
            await getData(34.152927, -118.113785),
            await getData(34.152882, -118.117799),
            await getData(34.152846, -118.122305),
            await getData(34.152392, -118.128632),
            await getData(34.152376, -118.133096),
            await getData(34.152353, -118.137228),
            await getData(34.152512, -118.143151),
            await getData(34.152516, -118.149311),
            await getData(34.152052, -118.153604),
            await getData(34.149838, -118.156394),
        ],
	HammondSt: [
            await getData(34.165898, -118.157675),
            await getData(34.165223, -118.150360),
            await getData(34.165162, -118.145903),
            await getData(34.165198, -118.143969),
        ],
        MarengoAve: [
            await getData(34.203724, -118.133396),
            await getData(34.199126, -118.136660),
            await getData(34.196018, -118.138913),
            await getData(34.192362, -118.141413),
            await getData(34.187306, -118.143746),
            await getData(34.182844, -118.145962),
            await getData(34.177733, -118.146249),
            await getData(34.173254, -118.146169),
            await getData(34.168582, -118.146140),
            await getData(34.163153, -118.146099),        
            await getData(34.157167, -118.146071),
            await getData(34.152664, -118.146102)
        ]
    };
};


(async () => {
    if (!existsSync(outputDir)) mkdirSync(outputDir, { recursive: true });

    const date = getDate();
    const newEntry = await getAllStreets(date);
    const updatedArray = [];

    if (existsSync(outputFile)) {
        try {
            const existing = JSON.parse(readFileSync(outputFile, 'utf-8'));
            if (Array.isArray(existing)) updatedArray.push(...existing);
        } catch (e) {
            console.warn('Warning: Failed to read existing file, starting fresh.');
        }
    }

    updatedArray.push(newEntry);

    writeFileSync(outputFile, JSON.stringify(updatedArray, null, 2));
})();
