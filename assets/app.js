function copyFrom(id, statusId) {
  const el = document.getElementById(id);
  if (!el) return;

  const raw = (el.getAttribute("data-copy") ?? el.innerText ?? "").trim();
  if (!raw) return;

  navigator.clipboard.writeText(raw).then(() => {
    if (statusId) {
      const s = document.getElementById(statusId);
      if (s) {
        s.innerText = "Kopyalandı ✅";
        setTimeout(() => (s.innerText = ""), 1400);
      }
    }
  }).catch(() => {
    alert("Kopyalama başarısız. Metni manuel seçip kopyalayın.");
  });
}
