const itemList = document.getElementById("itemList");
const addItemBtn = document.getElementById("addItemBtn");
const calculateBtn = document.getElementById("calculateBtn");
const output = document.getElementById("output");

// Adiciona uma nova linha para inserir itens
addItemBtn.addEventListener("click", () => {
  const newItemRow = document.createElement("div");
  newItemRow.classList.add("item-row");
  newItemRow.innerHTML = `
    <input type="text" class="item-name" placeholder="Nome da peça" />
    <input type="number" class="item-price" placeholder="Preço (R$)" />
    <input type="number" class="item-quantity" placeholder="Quantidade" />
    <button type="button" class="remove-item-btn">Remover</button>
  `;
  newItemRow.querySelector(".remove-item-btn").addEventListener("click", () => {
    newItemRow.remove();
  });
  itemList.appendChild(newItemRow);
});

// Calcula os resultados
calculateBtn.addEventListener("click", () => {
  const rows = document.querySelectorAll(".item-row");
  const increasePercent = parseFloat(document.getElementById("increase").value) || 0;

  if (rows.length === 0) {
    alert("Adicione pelo menos uma peça para calcular.");
    return;
  }

  let totalOriginal = 0;
  const results = [];

  rows.forEach((row) => {
    const name = row.querySelector(".item-name").value.trim();
    const price = parseFloat(row.querySelector(".item-price").value) || 0;
    const quantity = parseInt(row.querySelector(".item-quantity").value, 10) || 0;

    if (!name || price <= 0 || quantity <= 0) {
      alert("Preencha corretamente todos os campos.");
      return;
    }

    const totalItem = price * quantity;
    const totalWithIncrease = totalItem * (1 + increasePercent / 100);
    const unitPriceWithIncrease = totalWithIncrease / quantity;

    totalOriginal += totalItem;

    results.push(`
      <p>
        <strong>${name}:</strong> 
        Original: R$ ${price.toFixed(2)}, 
        Quantidade: ${quantity}, 
        Total: R$ ${totalItem.toFixed(2)}, 
        Preço Unitário com Acréscimo: R$ ${unitPriceWithIncrease.toFixed(2)}
      </p>
    `);
  });

  const totalWithIncrease = totalOriginal * (1 + increasePercent / 100);
  output.innerHTML = `
    <p><strong>Valor Total Original:</strong> R$ ${totalOriginal.toFixed(2)}</p>
    <p><strong>Valor Total com Acréscimo:</strong> R$ ${totalWithIncrease.toFixed(2)}</p>
    ${results.join("")}
  `;
});
