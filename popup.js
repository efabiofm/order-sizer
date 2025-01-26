// Evento de cálculo
document.getElementById("calcular").addEventListener("click", () => {
  const precioEntrada = parseFloat(document.getElementById("entrada").value);
  const precioStop = parseFloat(document.getElementById("stop").value);
  const balance = parseFloat(document.getElementById("balance").value);
  const riskPct = parseFloat(document.getElementById("risk").value);

  // Calcular el riesgo en USD y el tamaño de la posición
  const riesgoUSD = (balance * riskPct) / 100;
  const stopDiff = Math.abs(precioEntrada - precioStop);
  const tamanoOrden = riesgoUSD / stopDiff;
  const tamanoUSD = tamanoOrden * precioEntrada;

  // Mostrar el resultado
  document.getElementById("result").innerHTML =
`Risk: ${riesgoUSD.toFixed(2)} USD<br>
Size: ${tamanoUSD.toFixed(4)} USD`;
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    document.getElementById("calcular").click();
  }
});
