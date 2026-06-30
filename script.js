const osmize = [
  {
    name: "Osmiza Gabrovec Ivan",
    place: "Prepotto",
    area: "carso",
    period: "20/05/2026 - 30/06/2026",
    phone: "351 7137706",
    note: "Ultimo giorno di apertura",
    route: "https://www.google.com/maps/search/?api=1&query=Prepotto%20Trieste"
  },
  {
    name: "Osmiza Parovel vigneti oliveti 1898",
    place: "Bagnoli della Rosandra",
    area: "valle",
    period: "fino al 30/06/2026",
    phone: "346 7590953",
    note: "Vini e olio del territorio",
    route: "https://www.google.com/maps/search/?api=1&query=Bagnoli%20della%20Rosandra%20Trieste"
  },
  {
    name: "Osmiza Lisjak",
    place: "Contovello",
    area: "costa",
    period: "25/06/2026 - 05/07/2026",
    phone: "346 0116711",
    note: "Aperta anche nei prossimi giorni",
    route: "https://www.google.com/maps/search/?api=1&query=Contovello%20Trieste"
  },
  {
    name: "Osmiza Pertot Gabriel",
    place: "Aurisina",
    area: "carso",
    period: "26/06/2026 - 05/07/2026",
    phone: "349 5221395",
    note: "Comoda per chi arriva dalla Costiera",
    route: "https://www.google.com/maps/search/?api=1&query=Aurisina%20Trieste"
  }
];

const list = document.querySelector("#osmize-list");
const search = document.querySelector("#search");
const area = document.querySelector("#area");

function renderCards(items) {
  if (!items.length) {
    list.innerHTML = '<p class="empty-state">Nessuna osmiza trovata con questi filtri. Prova a cambiare località o zona.</p>';
    return;
  }

  list.innerHTML = items.map((item) => `
    <article class="osmiza-card">
      <div class="card-top">
        <div>
          <span class="badge">Aperta oggi</span>
          <h3>${item.name}</h3>
        </div>
      </div>
      <dl>
        <div>
          <dt>Località</dt>
          <dd>${item.place}</dd>
        </div>
        <div>
          <dt>Periodo</dt>
          <dd>${item.period}</dd>
        </div>
        <div>
          <dt>Telefono</dt>
          <dd>${item.phone}</dd>
        </div>
        <div>
          <dt>Nota</dt>
          <dd>${item.note}</dd>
        </div>
      </dl>
      <div class="card-actions">
        <button class="mini-button call" type="button" data-phone="${item.phone}">Chiama</button>
        <a class="mini-button button" href="${item.route}" target="_blank" rel="noreferrer">Percorso</a>
      </div>
    </article>
  `).join("");
}

function applyFilters() {
  const query = search.value.trim().toLowerCase();
  const selectedArea = area.value;

  const filtered = osmize.filter((item) => {
    const matchesQuery = `${item.name} ${item.place}`.toLowerCase().includes(query);
    const matchesArea = selectedArea === "all" || item.area === selectedArea;
    return matchesQuery && matchesArea;
  });

  renderCards(filtered);
}

search.addEventListener("input", applyFilters);
area.addEventListener("change", applyFilters);

list.addEventListener("click", (event) => {
  const button = event.target.closest("[data-phone]");
  if (!button) return;
  window.location.href = `tel:${button.dataset.phone.replaceAll(" ", "")}`;
});

renderCards(osmize);
