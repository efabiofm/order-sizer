chrome.action.onClicked.addListener(() => {
  chrome.windows.create({
    url: "popup.html", // Tu archivo HTML con la calculadora
    type: "popup",
    width: 350, // Ancho deseado
    height: 500 // Alto deseado
  });
});
