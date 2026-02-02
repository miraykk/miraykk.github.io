const toastEl = document.getElementById("toast");

function toast(msg){
  if(!toastEl) return;
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(()=>toastEl.classList.remove("show"), 1200);
}

async function copyText(text){
  try{
    await navigator.clipboard.writeText(text);
    toast("Kopyalandı ✅");
  }catch{
    alert("Kopyalama başarısız. Metni manuel seçip kopyalayın.");
  }
}

document.addEventListener("click", (e)=>{
  const btn = e.target.closest("[data-copy-from]");
  if(!btn) return;
  const id = btn.getAttribute("data-copy-from");
  const el = document.getElementById(id);
  if(!el) return;

  const raw = (el.getAttribute("data-copy") ?? el.innerText ?? "").trim();
  if(!raw) return;

  copyText(raw);
});
