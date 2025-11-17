async function loadAssets() {
    const response = await fetch("data/assets.json");
    const assets = await response.json();

    const container = document.getElementById("asset-container");
    const searchInput = document.getElementById("search");

    function render() {
        const query = searchInput.value.toLowerCase();
        container.innerHTML = "";

        const filtered = assets.filter(a =>
            a.name.toLowerCase().includes(query) ||
            a.tags.join(" ").toLowerCase().includes(query)
        );

        filtered.forEach(asset => {
            const card = document.createElement("div");
            card.className = "asset-card";

            card.innerHTML = `
                <img src="${asset.preview}">
                <div class="asset-info">
                    <h3>${asset.name}</h3>
                    <p class="asset-tags">Tags: ${asset.tags.join(", ")}</p>
                </div>
            `;

            const formatsDiv = document.createElement("div");

            for (const [format, url] of Object.entries(asset.formats)) {
                const btn = document.createElement("a");
                btn.href = url;
                btn.className = "download-btn";
                btn.textContent = format.toUpperCase();
                btn.download = "";
                formatsDiv.appendChild(btn);
            }

            card.appendChild(formatsDiv);
            container.appendChild(card);
        });
    }

    searchInput.addEventListener("input", render);
    render();
}

loadAssets();
