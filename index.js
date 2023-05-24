let colorScheme = {};

document.getElementById("input-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const schemeSelect = document.getElementById("scheme-select");
  const colorSelect = document.getElementById("color-select");

  getColorScheme(schemeSelect.value, colorSelect.value);
});

function getColorScheme(mode, hex) {
  const newVal = hex.substring(1);
  fetch(`
  https://www.thecolorapi.com/scheme?hex=${newVal}&mode=${mode}&count=5&format=json
  `)
    .then((res) => res.json())
    .then((res) => setColorSchemeHtml(res));
}

function setColorSchemeHtml(res) {
  let html = ``;

  res.colors.map((color) => {
    html += `
      <div class="color-container">
        <div class="color" style="background-color:${color.hex.value}" ><div class="color-name">${color.hex.value}</div></div>
        
      </div>
      `;
  });

  document.getElementById("main").innerHTML = html;
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("color")) {
    navigator.clipboard.writeText(e.target.firstChild.textContent);
    document.getElementById("toast-header-color").style.backgroundColor =
      e.target.firstChild.textContent;
    triggerToast();
  }
});

const liveToast = document.getElementById("liveToast");

function triggerToast() {
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(liveToast);
  toastBootstrap.show();
}
