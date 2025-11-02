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
│ └── report.html
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
O relatório HTML será gerado automaticamente em results/report.html ao final do teste.
Abra o relatório HTML em /results/report.html.

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



🚀 Execução e Relatório no GitHub Actions

O pipeline de CI/CD já está configurado no arquivo .github/workflows/k6-performance.yml.
Toda vez que você fizer um push ou abrir um pull request, os testes de performance serão executados automaticamente.

🔧 O que o pipeline faz

1. Instala o k6.
2. Executa o teste blazedemo_test.js.
3. Gera o resultado em formato JSON e HTML.
4. Faz o upload do relatório como artifact dentro da execução do workflow.

📊 Como visualizar o relatório no GitHub

1. Vá até a aba “Actions” no seu repositório.
2. Clique no workflow “k6 Performance Test” mais recente.
3. Role até o final da página e procure a seção Artifacts.
4. Clique em k6-results para baixar o arquivo ZIP.
5. Extraia o arquivo e abra results.html no navegador.

💡 Dica: o relatório mostra métricas como throughput, latência (p90), erros e duração total da execução.

Autor: Nathan G Gomes

Ferramenta: k6