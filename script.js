async function loadAssets() {
  const res = await fetch("assets.json");
  const assets = await res.json();

  const grid = document.getElementById("asset-grid");
  const search = document.getElementById("search");

  function render() {
    const query = search.value.toLowerCase();

    grid.innerHTML = "";

    assets
      .filter(a =>
        a.name.toLowerCase().includes(query) ||
        a.tags.some(t => t.toLowerCase().includes(query))
      )
      .forEach(asset => {
        const card = document.createElement("div");
        card.className = "asset-card";

        card.innerHTML = `
          <img src="${asset.path}" alt="${asset.name}">
          <h3>${asset.name}</h3>
          <p>${asset.tags.join(", ")}</p>
          <a href="${asset.path}" download>Download</a>
        `;

        grid.appendChild(card);
      });
  }

  search.addEventListener("input", render);
  render();
}

loadAssets();
