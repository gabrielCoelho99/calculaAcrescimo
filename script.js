const tableBody = document.querySelector("#priceTable tbody");
const addRowBtn = document.getElementById("addRowBtn");
const clearBtn = document.getElementById("clearBtn");
const increaseInput = document.getElementById("increase");
const totalOriginalSpan = document.getElementById("totalOriginal");
const totalWithIncreaseSpan = document.getElementById("totalWithIncrease");

// Adiciona uma nova linha à tabela
addRowBtn.addEventListener("click", () => {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td><input type="text" class="item-name" placeholder="Nome da peça" /></td>
    <td><input type="number" class="item-price" placeholder="Preço (R$)" /></td>
    <td><input type="number" class="item-quantity" placeholder="Quantidade" /></td>
    <td class="item-total">0.00</td>
    <td class="item-unit-increase">0.00</td>
    <td><button class="remove-btn">Remover</button></td>
  `;
  row.querySelector(".remove-btn").addEventListener("click", () => row.remove());
  row.querySelectorAll("input").forEach(input => input.addEventListener("input", calculateTotals));
  tableBody.appendChild(row);
});

// Limpa todas as linhas da tabela
clearBtn.addEventListener("click", () => {
  tableBody.innerHTML = "";
  updateSummary(0, 0);
});

// Calcula os totais para cada linha e os valores gerais
function calculateTotals() {
  const rows = tableBody.querySelectorAll("tr");
  let totalOriginal = 0;

  rows.forEach(row => {
    const price = parseFloat(row.querySelector(".item-price").value) || 0;
    const quantity = parseInt(row.querySelector(".item-quantity").value, 10) || 0;
    const totalItem = price * quantity;

    const increasePercent = parseFloat(increaseInput.value) || 0;
    const totalWithIncrease = totalItem * (1 + increasePercent / 100);
    const unitPriceWithIncrease = totalWithIncrease / (quantity || 1);

    row.querySelector(".item-total").textContent = totalItem.toFixed(2);
    row.querySelector(".item-unit-increase").textContent = unitPriceWithIncrease.toFixed(2);

    totalOriginal += totalItem;
  });

  const totalWithIncrease = totalOriginal * (1 + (parseFloat(increaseInput.value) || 0) / 100);
  updateSummary(totalOriginal, totalWithIncrease);
}

// Atualiza o resumo geral
function updateSummary(totalOriginal, totalWithIncrease) {
  totalOriginalSpan.textContent = totalOriginal.toFixed(2);
  totalWithIncreaseSpan.textContent = totalWithIncrease.toFixed(2);
}
