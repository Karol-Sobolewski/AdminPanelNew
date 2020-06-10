import Modal from './Modals.js';

class Banner {
  constructor(data) {
    const thisBanners = this;

    thisBanners.data = data;
    //thisLinks.renderLinkTable();
    thisBanners.toggleAddBannerModal();
  }

  toggleAddBannerModal() {
    //const thisBanners = this;
    
    const addBanner = document.querySelectorAll(`.btn__add--banner`);
    //console.log(addBanner);
    
    addBanner.forEach((element) =>
      element.addEventListener(`click`, function () {
        //thisLinks.openModal(`#linkModal`);
        console.log(`click link`);
        
        new Modal(`#bannerModal`);
      })
    );
  }
}
export default Banner;
//btn__add--banners