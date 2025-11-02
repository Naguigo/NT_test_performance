import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

export let options = {
  scenarios: {
    load_test: {
      executor: 'constant-arrival-rate',
      rate: 250, // 250 requisições por segundo
      timeUnit: '1s',
      duration: '5s',
      preAllocatedVUs: 300,
      maxVUs: 500,
    },
  },
  thresholds: {
    http_req_duration: ['p(90)<2000'], // 90% das requisições < 2s
    http_req_failed: ['rate<0.01'],    // <1% de erro
  },
};

export default function () {
  // 1️⃣ Home
  let res = http.get('https://www.blazedemo.com/');
  check(res, { 'home status 200': (r) => r.status === 200 });

  // 2️⃣ Buscar voos
  let searchRes = http.post('https://www.blazedemo.com/reserve.php', {
    fromPort: 'Boston',
    toPort: 'London',
  });
  check(searchRes, { 'search status 200': (r) => r.status === 200 });

  // 3️⃣ Escolher voo
  let flightIdMatch = searchRes.body.match(/flight=(\d+)/);
  if (flightIdMatch && flightIdMatch[1]) {
    let chooseRes = http.get(`https://www.blazedemo.com/purchase.php?flight=${flightIdMatch[1]}`);
    check(chooseRes, { 'choose status 200': (r) => r.status === 200 });

    // 4️⃣ Finalizar compra
    let purchaseRes = http.post('https://www.blazedemo.com/purchase.php', {
      inputName: 'Test User',
      address: 'Rua Teste',
      city: 'Sao Paulo',
      state: 'SP',
      zipCode: '12345',
      cardType: 'Visa',
      creditCardNumber: '4111111111111111',
      creditCardMonth: '12',
      creditCardYear: '2025',
      nameOnCard: 'Test User',
      rememberMe: 'on'
    });
    check(purchaseRes, { 'purchase status 200': (r) => r.status === 200 });
  }

  sleep(1);
}

// 🧾 Gera relatório HTML automático após o teste
export function handleSummary(data) {
  return {
    'stdout': textSummary(data, { indent: ' ', enableColors: true }),
    'results.html': htmlReport(data),
  };
}
