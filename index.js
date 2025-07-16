const axios = require('axios');
const { writeFileSync, readFileSync, existsSync, mkdirSync } = require('fs');
const { ZonedDateTime, ZoneId } = require('@js-joda/core');
require('@js-joda/timezone');
const key = 'IixDo0rkv3xMZQTGgCpnzcGsW2kldjAe';
const outputDir = './output';
const outputFile = `${outputDir}/data.json`;
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

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
    const url = 'https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/10/json';
    const point = `${lat},${lng}`;

    console.log(`Fetching data for point: ${point}`);

    try {
        const { data } = await axios.get(url, {
            params: {
                key,
                point,
                unit: 'mph'
            }
        });

        data.flowSegmentData.point = { lat, lng };
        delete data.flowSegmentData.coordinates;
        delete data.flowSegmentData['@version'];

        return data.flowSegmentData;
    } catch (error) {
        console.error(`❌ Error for point ${point}:`);
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Response:', error.response.data);
        } else {
            console.error('Error:', error.message);
        }
        throw error;
    }
};

const getAllStreets = async (date) => {
    return {
        date,
        LomaAltaDr: [
            await getData(34.202035, -118.157053), 
            await getData(34.202994, -118.143964),
            await getData(34.0256252,-118.4778303),
            await getData(34.204035, -118.131142),
        ],
        ApelloSt: [
           await getData(34.202771, -118.142484),  
           await getData(34.199778, -118.135975), 
           await getData(34.198409, -118.132445), 
        ],
        LakeAve: [ 
            await getData(34.203904, -118.130668),
            await getData(34.196838, -118.131060),
            await getData(34.189973, -118.131318),
            await getData(34.181363, -118.131715),
	    await getData(34.171055, -118.132151),
            await getData(34.164749, -118.132457),
            await getData(34.155456, -118.132443),
        ],
        AltadenaDr: [
            await getData(34.199913, -118.164083),
            await getData(34.191551, -118.137963),
            await getData(34.182547, -118.100383),
	    await getData(34.177749, -118.099154),
            await getData(34.168722, -118.098299),
            await getData(34.160898, -118.098461),
            await getData(34.153143, -118.098742),
        ],
        FairOaksAve: [
            await getData(34.206195, -118.141877),
	    await getData(34.196745, -118.146383),
            await getData(34.181153, -118.150800),
            await getData(34.170161, -118.150691),
	    await getData(34.164980, -118.150635),
            await getData(34.152485, -118.150454),
        ],
        LincolnAve: [
            await getData(34.201603, -118.159143),
            await getData(34.191355, -118.158701),
            await getData(34.175308, -118.159695),
        ],
        HollistronAve: [
            await getData(34.193289, -118.123295),
            await getData(34.185521, -118.123242),
            await getData(34.173189, -118.123174),
            await getData(34.161072, -118.123086),
            await getData(34.155662, -118.122973),
        ],
        SinaloaAve: [
            await getData(34.194027, -118.117184),
            await getData(34.181686, -118.115545),
            await getData(34.174578, -118.115856),
            await getData(34.165282, -118.115631),
            await getData(34.154542, -118.115564),
        ],
	AllenAve: [
            await getData(34.190519, -118.112427),
            await getData(34.180286, -118.111877),
            await getData(34.173165, -118.112779),
            await getData(34.160195, -118.113118),
            await getData(34.155208, -118.113217),
        ],
	HillAve: [
            await getData(34.183788, -118.121668),
            await getData(34.175761, -118.121576),
            await getData(34.168454, -118.121513),
            await getData(34.152813, -118.121315),
        ],
	LosRoblesAve: [
            await getData(34.181199, -118.141755),
            await getData(34.174834, -118.141676),
            await getData(34.161375, -118.141555),
            await getData(34.153849, -118.141510),
        ],
	MentoneAve: [
            await getData(34.180762, -118.157419),
            await getData(34.171877, -118.157255),
            await getData(34.165942, -118.157484),
        ],
	WindsorAve: [
            await getData(34.193872, -118.168259),
            await getData(34.188976, -118.168631),
            await getData(34.181858, -118.168961),
        ],
	WoodburyRd: [
            await getData(34.177002, -118.132052),
            await getData(34.181513, -118.142028),
            await getData(34.183142, -118.153076),
            await getData(34.183166, -118.160464),
            await getData(34.185121, -118.175330),
            await getData(34.189221, -118.178381),
        ],
	FigueroaDr: [
            await getData(34.187444, -118.168473),
            await getData(34.187481, -118.160666),
            await getData(34.185164, -118.151112),
        ],
	MountainViewSt: [
            await getData(34.192674, -118.168296),
            await getData(34.191134, -118.163421),
            await getData(34.188090, -118.154039),
            await getData(34.187172, -118.151104),
        ],
	HowardSt: [
            await getData(34.173830, -118.161227),
            await getData(34.173065, -118.155545),
            await getData(34.172545, -118.149284),
            await getData(34.172590, -118.141871),
        ],
	WashingtonBlvd: [
            await getData(34.169521, -118.157429),
            await getData(34.168881, -118.148462),
            await getData(34.168948, -118.136669),
            await getData(34.169065, -118.122065),
            await getData(34.169145, -118.117107),
            await getData(34.169158, -118.105425),
            await getData(34.166424, -118.091656),
            await getData(34.157076, -118.089369),
            await getData(34.152398, -118.090416),
        ],
	MountainSt: [
            await getData(34.162153, -118.157209),
            await getData(34.161547, -118.141368),
            await getData(34.161608, -118.133753),
            await getData(34.161686, -118.121190),
            await getData(34.161565, -118.099852),	
        ],
	OrangeGroveBlvd: [
            await getData(34.154604, -118.156392),
            await getData(34.157872, -118.144529),
            await getData(34.157825, -118.136663),
            await getData(34.157863, -118.126706),
            await getData(34.157907, -118.115417),
            await getData(34.158266, -118.106132),
            await getData(34.158482, -118.091753),
            await getData(34.157656, -118.080973),
            await getData(34.151360, -118.073794),
        ],
	VillaSt: [
            await getData(34.152881, -118.154008),
            await getData(34.154146, -118.145817),
            await getData(34.154242, -118.136800),
            await getData(34.154313, -118.127657),
            await getData(34.154349, -118.119739),
            await getData(34.154382, -118.105957),
            await getData(34.154400, -118.093850),
            await getData(34.154430, -118.088692),
        ],
	NewYorkDr: [
            await getData(34.179922, -118.136365),
            await getData(34.178504, -118.122736),
            await getData(34.178264, -118.111520),
            await getData(34.174776, -118.101448),
            await getData(34.172245, -118.091787),
            await getData(34.161164, -118.081102),
            await getData(34.148405, -118.082354),
        ],
	MapleSt: [
            await getData(34.150251, -118.088146),
            await getData(34.152846, -118.122305),
            await getData(34.152376, -118.133096),
            await getData(34.152512, -118.143151),
            await getData(34.152052, -118.153604),
        ],
	HammondSt: [
            await getData(34.165898, -118.157675),
            await getData(34.165162, -118.145903),
        ],
        MarengoAve: [
            await getData(34.203724, -118.133396),
            await getData(34.192362, -118.141413),
            await getData(34.173254, -118.146169),
            await getData(34.163153, -118.146099),        
            await getData(34.152664, -118.146102)
        ]
    };
};

async function fetchAllAndWriteCSV(allData) {
  const allPoints = [];

  const date = allData.date; // ✅ Grab the timestamp

  for (const street in allData) {
    if (street === 'date') continue; // Skip the date field itself

    for (const pointData of allData[street]) {
      if (!pointData.point || typeof pointData.point.lat !== 'number' || typeof pointData.point.lng !== 'number') {
        console.warn(`Skipping invalid pointData for street "${street}":`, pointData);
        continue;
      }

      allPoints.push({
        date, // ✅ Add timestamp
        street,
        lat: pointData.point.lat,
        lng: pointData.point.lng,
        currentSpeed: pointData.currentSpeed,
        freeFlowSpeed: pointData.freeFlowSpeed,
        confidence: pointData.confidence,
	frc: pointData.frc,
	jamFactor: pointData.jamFactor,
	roadClosure: pointData.roadClosure,
	travelTime: pointData.travelTime,
	freeFlowTravelTime: pointData.freeFlowTravelTime,
	length: pointData.length,
	speedLimit: pointData.speedLimit
      });
    }
  }

const csvWriter = createCsvWriter({
  path: './output/data.csv',
  header: [
    { id: 'date', title: 'date' },
    { id: 'street', title: 'street' },
    { id: 'lat', title: 'lat' },
    { id: 'lng', title: 'lng' },
    { id: 'currentSpeed', title: 'currentSpeed' },
    { id: 'freeFlowSpeed', title: 'freeFlowSpeed' },
    { id: 'confidence', title: 'confidence' },
    { id: 'jamFactor', title: 'jamFactor' },
    { id: 'frc', title: 'frc' },
    { id: 'roadClosure', title: 'roadClosure' },
    { id: 'travelTime', title: 'travelTime' },
    { id: 'freeFlowTravelTime', title: 'freeFlowTravelTime' },
    { id: 'length', title: 'length' },
    { id: 'speedLimit', title: 'speedLimit' }
  ],
  append: true  
});

  await csvWriter.writeRecords(allPoints);
  console.log('CSV file written with street names and timestamp!');
}


(async () => {
   if (!existsSync(outputDir)) mkdirSync(outputDir, { recursive: true });

   const date = getDate();
   const allData = await getAllStreets(date);

   const updatedArray = [];

   if (existsSync(outputFile)) {
       try {
           const existing = JSON.parse(readFileSync(outputFile, 'utf-8'));
           if (Array.isArray(existing)) updatedArray.push(...existing);
       } catch (e) {
           console.warn('Warning: Failed to read existing file, starting fresh.');
       }
   }

   updatedArray.push(allData);
   writeFileSync(outputFile, JSON.stringify(updatedArray, null, 2));

   await fetchAllAndWriteCSV(allData);
})();
