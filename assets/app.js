const toastEl = document.getElementById("toast");
const themeBtn = document.getElementById("themeBtn");

function showToast(text) {
  if (!toastEl) return;
  toastEl.textContent = text;
  toastEl.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toastEl.classList.remove("show"), 1400);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast("Kopyalandı ✅");
  } catch (e) {
    // iOS eski sürümler fallback: seçip kopyalama
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
      showToast("Kopyalandı ✅");
    } catch {
      alert("Kopyalama başarısız. Metni manuel seçip kopyalayın.");
    }
  }
}

function getCopyValue(el) {
  const raw = (el.getAttribute("data-copy") ?? el.innerText ?? "").trim();
  return raw;
}

// Delegation: tüm kopyala butonları
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-copy-from]");
  if (!btn) return;

  const id = btn.getAttribute("data-copy-from");
  const el = document.getElementById(id);
  if (!el) return;

  const value = getCopyValue(el);
  if (!value) return;

  copyText(value);
});

// Tema (dark/light)
function setTheme(t) {
  document.documentElement.setAttribute("data-theme", t);
  localStorage.setItem("theme", t);
  if (themeBtn) themeBtn.querySelector(".icon").textContent = (t === "light" ? "☼" : "☾");
}

const saved = localStorage.getItem("theme");
if (saved === "light" || saved === "dark") setTheme(saved);

themeBtn?.addEventListener("click", () => {
  const cur = document.documentElement.getAttribute("data-theme") || "dark";
  setTheme(cur === "dark" ? "light" : "dark");
  showToast(cur === "dark" ? "Açık tema ☼" : "Koyu tema ☾");
});
