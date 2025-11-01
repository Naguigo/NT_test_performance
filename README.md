# BlazeDemo Performance Test 🚀

## Descrição
Projeto de teste de performance da aplicação [
BlazeDemo
](https://www.blazedemo.com) usando **
k6
**.

---

## 🎯 Cenário de Teste
**
Fluxo:
** Compra de passagem aérea com sucesso  
**
Critério de aceitação:
**
- 250 requisições/segundo
- p90 < 2s

---

## ⚙️ Estrutura do Projeto
blazedemo-performance-test/
├── blazedemo_test.js
├── results/
│ ├── results.json
│ └── results.html
└── README.md


---

## 🧪 Como executar

1. Instale o [k6](https://k6.io/docs/getting-started/installation/)
2. Clone este repositório:
   ```bash
   git clone https://github.com/Naguigo/NT_test_performance.git
   cd NT_test_performance
Execute o teste de performance:



k6 run blazedemo_test.js --out json=results/results.json
(Opcional) Gere um relatório HTML:
Instale o k6-reporter:



npm install -g k6-reporter
Gere o relatório:



k6-reporter results/results.json -o results/results.html
Abra o relatório HTML em /results/results.html.
📊 Resultados (exemplo)
Teste	Throughput	P90 (ms)	Erros	Status
Carga	247 req/s	1820	0.4%	✅
Pico	261 req/s	1970	0.9%	✅
✅ Critério de aceitação atingido.

O sistema manteve boa performance até 250 req/s, com tempos de resposta estáveis.

🧠 Considerações
O BlazeDemo é estático, logo os tempos variam conforme o ambiente.
O cenário simula o fluxo completo de compra, incluindo busca e finalização.
O critério de aceitação é validado via thresholds no script k6.
