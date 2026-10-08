// El. pašto forma. Kol nėra laiškų rinkimo įrankio, adresas keliauja laišku į šį paštą.
// Kai bus pasirinktas įrankis (pvz. MailerLite), keisti tik šitą dalį.
const PASTAS = "loreta.cesnuliene@gmail.com";

const forma = document.querySelector(".forma");
const laukas = document.getElementById("pastas");
const klaida = document.getElementById("pastas-klaida");
const aciu = document.querySelector(".forma-aciu");

function rodykKlaida(tekstas) {
  klaida.textContent = tekstas;
  laukas.setAttribute("aria-invalid", tekstas ? "true" : "false");
}

laukas.addEventListener("input", () => {
  if (klaida.textContent) rodykKlaida("");
});

forma.addEventListener("submit", (e) => {
  e.preventDefault();
  const adresas = laukas.value.trim();

  if (!adresas) {
    rodykKlaida("Įrašyk el. pašto adresą.");
    laukas.focus();
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(adresas)) {
    rodykKlaida("Patikrink adresą: jame trūksta @ arba taško.");
    laukas.focus();
    return;
  }

  rodykKlaida("");
  const tema = encodeURIComponent("Pranešk man apie aukcionus");
  const tekstas = encodeURIComponent(
    "Sveiki,\n\nnoriu sužinoti apie pirmą „Stiliaus tako“ aukcioną ar renginį.\nMano el. paštas: " + adresas
  );
  window.location.href = `mailto:${PASTAS}?subject=${tema}&body=${tekstas}`;
  aciu.hidden = false;
});

// Žingsnių garsas: groja tik paspaudus
(function () {
  var mygtukas = document.querySelector('.garsas');
  var garsas = document.getElementById('zingsniai');
  if (!mygtukas || !garsas) return;
  var zenklas = mygtukas.querySelector('.garsas-zenklas');
  var tekstas = mygtukas.querySelector('.garsas-tekstas');
  function busena(groja) {
    mygtukas.setAttribute('aria-pressed', groja ? 'true' : 'false');
    zenklas.textContent = groja ? '❚❚' : '▶';
    tekstas.textContent = groja ? 'Sustabdyk' : 'Išgirsk savo žingsnius';
  }
  mygtukas.addEventListener('click', function () {
    if (garsas.paused) { garsas.currentTime = 0; garsas.play(); busena(true); }
    else { garsas.pause(); busena(false); }
  });
  garsas.addEventListener('ended', function () { busena(false); });
})();
