const modalPanel = document.querySelector(".modal-panel");
const cart = document.querySelector(".cart");
const deleteItem = document.querySelector(".delete");
const trigger = document.querySelector(".trigger");
const close = document.querySelector(".close");
const modalPanelEdit = document.querySelector(".modal-panel-edit");
const triggerEdit = document.querySelector(".trigger-edit");


const toggleModal = () => {
    modalPanel.classList.toggle("show-modal-panel");
}
const addToCart= (id) => {
    let addcart =  localStorage.getItem('cart');
    
    addcart += `${id},`;
    console.log(addcart)
    localStorage.setItem('cart', addcart);
    console.log(localStorage)
    cart.classList.toggle("show-modal-panel");
}
const toggleModalDelete= (id) => {
    sessionStorage.setItem('modifyId', id);
    deleteItem.classList.toggle("show-modal-panel");
}
 
const toggleModalEdit = (id) => {
    sessionStorage.setItem('modifyId', id);
    modalPanelEdit.classList.toggle("show-modal-panel");
}
