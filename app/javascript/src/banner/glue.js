
const bannerUI = document.getElementById("banner-ui");
const shareCancel = document.getElementById("share-cancel");
const bannerFormInput = document.getElementById("banner_data");

shareCancel.addEventListener("click", () => {
  bannerUI.galleryModal.hide();
})

bannerUI.layers.addEventListener("update", () => {
  if (!bannerFormInput) { return; }

  bannerFormInput.value = bannerUI.layers.encode();
})