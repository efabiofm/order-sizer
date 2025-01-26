chrome.action.onClicked.addListener(() => {
  chrome.windows.create({
    url: "popup.html", // Tu archivo HTML con la calculadora
    type: "popup",
    width: 320, // Ancho deseado
    height: 480 // Alto deseado
  });
});
