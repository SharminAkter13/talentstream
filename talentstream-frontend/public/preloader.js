window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  const bar = preloader?.querySelector(".bar");

  if (bar) bar.style.width = "100%";

  setTimeout(() => {
    if (!preloader) return;
    preloader.style.opacity = "0";
    preloader.style.transition = "opacity 0.5s ease";

    setTimeout(() => preloader.style.display = "none", 500);
  }, 500);
});
