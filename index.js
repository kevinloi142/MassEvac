const axios = require('axios');
const { writeFileSync } = require('fs');
const fs = require('fs');
const path = require('path');
const { ZonedDateTime, ZoneId } = require('@js-joda/core');
require('@js-joda/timezone');
const key = 'IixDo0rkv3xMZQTGgCpnzcGsW2kldjAe';

const outputDir = './output';

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
        highwayTwo: [
            await getData(34.0261335,-118.476072), 
            await getData(34.0261335,-118.476072),
            await getData(34.0261335,-118.476072),
            await getData(34.0256252,-118.4778303),
            await getData(34.0256252,-118.4778303),
            await getData(34.0278022,-118.4741866),
            await getData(34.0349299,-118.463976),
            await getData(34.0405474,-118.4474101),
        ],
        willshireBlvd: [
           await getData(34.0175624,-118.4964529), 
           await getData(34.0198166,-118.4942322), 
           await getData(34.0198166,-118.4942322), 
           await getData(34.0234562,-118.4886807), 
           await getData(34.0284915,-118.4833412), 
           await getData(34.0337953,-118.4777273), 
           await getData(34.0472342,-118.4643287), 
           await getData(34.0513275,-118.4589269), 
        ],
        highwayTen: [ 
            await getData(34.0176184,-118.481321),
            await getData(34.0176184,-118.481321),
            await getData(34.0192055,-118.476708),
            await getData(34.0260031,-118.4646028),
            await getData(34.0296384,-118.4455725),
        ],
        fourthSt: [
            await getData(34.0196919,-118.4907066),
            await getData(34.0174191,-118.4949884),
            await getData(34.0151769,-118.4928233),
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

function jsonToCsv(jsonData) {
  const rows = [];
  const date = jsonData.date;
  const headers = ['date', 'street', 'lat', 'lng', 'currentSpeed', 'freeFlowSpeed', 'confidence', 'roadClosure'];
  rows.push(headers.join(','));

  for (const street in jsonData) {
    if (street === 'date') continue;
    jsonData[street].forEach(point => {
      const lat = point.point.lat;
      const lng = point.point.lng;
      const currentSpeed = point.currentSpeed || '';
      const freeFlowSpeed = point.freeFlowSpeed || '';
      const confidence = point.confidence || '';
      const roadClosure = point.roadClosure || false;
      const row = [date, street, lat, lng, currentSpeed, freeFlowSpeed, confidence, roadClosure];
      rows.push(row.join(','));
    });
  }
  return rows.join('\n');
}

(async () => {
  const date = getDate();
  const jsonPath = path.join(outputDir, `${date}.json`);
  const csvPath = path.join(outputDir, `${date}.csv`);

  if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
  }

  const data = await getAllStreets(date);
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
  console.log('Saved JSON:', jsonPath);

  const csvData = jsonToCsv(data);
  fs.writeFileSync(csvPath, csvData);
  console.log('Saved CSV:', csvPath);
})();
