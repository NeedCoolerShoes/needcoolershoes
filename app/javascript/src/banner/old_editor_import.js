const bannerUI = document.getElementById("banner-ui");

const oldBannerCode = localStorage.getItem("ncrs-banners-current");
const oldBannerSaved = localStorage.getItem("ncrs-banners-saved");

if (oldBannerSaved) {
  const banners = JSON.parse(oldBannerSaved);
  bannerUI.persistence.set("banners", banners || []);
  localStorage.removeItem("ncrs-banners-saved")
  location.reload();
}

if (oldBannerCode) {
  bannerUI.setBanner(oldBannerCode);
  localStorage.removeItem("ncrs-banners-current");
}