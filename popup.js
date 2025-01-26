// Configuraciones por defecto
const DEFAULT_BALANCE = 100; // Balance total en USD
const DEFAULT_RISK_PERCENTAGE = 2; // Riesgo por trade (%)
let riesgoUSD;

document.addEventListener("DOMContentLoaded", () => {
  const balanceInput = document.getElementById("balance");
  const riskPctInput = document.getElementById("risk");
  const resultRiskInput = document.getElementById("result-risk");
  const resultSizeInput = document.getElementById("result-size");
  const calculateButton = document.getElementById("calculate");

  function updateRisk() {
    const balanceVal = parseFloat(balanceInput.value);
    const riskPctVal = parseFloat(riskPctInput.value);
    riesgoUSD = (balanceVal * riskPctVal) / 100;
    resultRiskInput.textContent = `${riesgoUSD.toFixed(2)} USD`;
    calculateButton.click();
  }

  // Setea los valores previamente almacenados
  chrome.storage.sync.get(["userBalance", "userRisk"], (data) => {
    balanceInput.value = data.userBalance || DEFAULT_BALANCE;
    riskPctInput.value = data.userRisk || DEFAULT_RISK_PERCENTAGE;
    updateRisk();
  });

  // Guardar valores al modificarlos
  balanceInput.addEventListener("change", () => {
    chrome.storage.sync.set({ userBalance: balanceInput.value });
    updateRisk();
  });
  riskPctInput.addEventListener("change", () => {
    chrome.storage.sync.set({ userRisk: riskPctInput.value });
    updateRisk();
  });

  // Evento de cálculo
  calculateButton.addEventListener("click", () => {
    const precioEntrada = parseFloat(document.getElementById("entrada").value);
    const precioStop = parseFloat(document.getElementById("stop").value);

    if (precioEntrada && precioStop) {
      // Calcular el riesgo en USD y el tamaño de la posición
      const stopDiff = Math.abs(precioEntrada - precioStop);
      const tamanoOrden = riesgoUSD / stopDiff;
      const tamanoUSD = tamanoOrden * precioEntrada;
    
      // Mostrar el resultado
      resultSizeInput.textContent = `${tamanoUSD.toFixed(4)} USD`;
    }
  });
  
  // Realiza el cálculo al presionar ENTER
  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      calculateButton.click();
    }
  });
})
