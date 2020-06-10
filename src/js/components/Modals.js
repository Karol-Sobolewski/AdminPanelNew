
class Modal {
  constructor(data) {
    const thisModal = this;
    thisModal.initModal;
    thisModal.openModal(data);
    console.log(`modal`, data);
  }
  /*initModal() {
    //console.log(`modal`);
    function closeModal() {
      document.getElementById(`overlay`).classList.remove(`show`);
    }
    
    document
      .querySelectorAll(`#overlay .js--close-modal`)
      .forEach(function (btn) {
        btn.addEventListener(`click`, function (e) {
          e.preventDefault();
          closeModal();
        });
      });
    
    document.querySelector(`#overlay`).addEventListener(`click`, function (event) {
      if (event.target === this) {
        closeModal();
      }
    });
    
    document.addEventListener(`keyup`, function (event) {
      if (event.keyCode === 27) {
        closeModal();
      }
    });
  }*/
  
  openModal(modal) {
    document.querySelectorAll(`#overlay > *`).forEach(function (modal) {
      modal.classList.remove(`show`);
    });
    document.querySelector(`#overlay`).classList.add(`show`);
    document.querySelector(modal).classList.add(`show`);
  }
}

export default Modal;


  

