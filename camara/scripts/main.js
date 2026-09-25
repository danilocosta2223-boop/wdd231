// Script global para atualização das datas do rodapé
const yearSpan = document.querySelector("#year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

const lastModifiedSpan = document.querySelector("#lastModified");
if (lastModifiedSpan) {
  lastModifiedSpan.textContent = document.lastModified;
}