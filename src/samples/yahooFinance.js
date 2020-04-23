const yahooFinanceConfig = {
  api: {
    url: "https://finance.yahoo.com/gainers",
  },
  selector: {
    container: `table[class="W(100%)"] tr`,
    text: {
      symbol: `a[class="Fw(600)"]`,
      company: `td[class="Va(m) Ta(start) Px(10px) Fz(s)"]`,
      change: `span[class="Trsdu(0.3s) Fw(600) C($dataGreen)"]`,
    },
  },
};
