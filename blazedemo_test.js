import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  scenarios: {
    load_test: {
      executor: 'constant-arrival-rate',
      rate: 250, // 250 requisições por segundo
      timeUnit: '1s',
      duration: '10s', // ajuste conforme necessário
      preAllocatedVUs: 300,
      maxVUs: 500,
    },
  },
  thresholds: {
    http_req_duration: ['p(90)<2000'], // p90 < 2s
    http_req_failed: ['rate<0.01'],    // <1% de erro
  },
};

export default function () {
  // 1. Home
  let res = http.get('https://www.blazedemo.com/');
  check(res, { 'home status 200': (r) => r.status === 200 });

  // 2. Buscar voos (simula seleção de cidades)
  let searchRes = http.post('https://www.blazedemo.com/reserve.php', {
    fromPort: 'Boston',
    toPort: 'London',
  });
  check(searchRes, { 'search status 200': (r) => r.status === 200 });

  // 3. Escolher voo (pega primeiro id de voo da resposta)
  let flightIdMatch = searchRes.body.match(/flight=(\d+)/);
  if (flightIdMatch && flightIdMatch[1]) {
    let chooseRes = http.get(`https://www.blazedemo.com/purchase.php?flight=${flightIdMatch[1]}`);
    check(chooseRes, { 'choose status 200': (r) => r.status === 200 });

    // 4. Finalizar compra
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