'use strict'
//global variables to be reused;
const storeBtn = document.querySelector('#dropdown');
const formInput = document.getElementById('form-input')
const modal = document.querySelector('.notification-modal');
const notificationIcon = document.querySelector('#notification-alert');
const notificationInner = document.querySelector('.notification-inner')
const logo = document.querySelector('.logo');
const trialCallout = document.querySelector('.trial-callout');
const btnClose = document.querySelector('.close');
const AdminList = document.querySelector('.inner-wrapper');
const AdminDropdown = document.querySelector('.admin-dropdown');
const dropDown = document.querySelector('.dropdown-container');
const buttonStoreWrapper = document.querySelector('.button-store_wrapper');
const dashboardToggler= document.querySelector('.btn-toggler');
const imgToggler= document.querySelector('.img-toggle');
const accordion = document.getElementById('collapsible');
const altAttribute = document.querySelectorAll('[alt]');
const lists = document.querySelectorAll('admin-list');
const dashCheckbox = document.querySelectorAll(".checked");
const radioDashedSvg = document.querySelectorAll(".radio-dash_checked");
const checkedImg = document.querySelectorAll(".checked-img");
const checkboxContainer = document.querySelectorAll('.dashed-checkbox_wrapper')
const contentWrapper = document.querySelectorAll('.content-wrapper');
const contentHidden = document.querySelectorAll('.content--hidden');
const dashProcessBtnHeader = document.querySelectorAll('.dashboard-process_header');
// const circle = document.querySelector('.circle');

//REUSABLE FUNCTIONS
function handleKeyClose(e, el, key){
    if(e.key === key && !el.classList.contains('hide')) 
    el.classList.add('hide')
}

function showAlertAndCloseDropdown(el){
    if(el.classList.contains('hide'))return
    else el.classList.add('hide')
}
//Alert Modal
notificationIcon.addEventListener('click', function(){
    const isCollapsed = notificationIcon.getAttribute('aria-expanded')
     modal.classList.toggle('hide')
     if(isCollapsed === 'false'){
        notificationIcon.setAttribute('aria-expanded', 'true');
     }else{
        notificationIcon.setAttribute('aria-expanded', 'false');
     }
     showAlertAndCloseDropdown(AdminDropdown);

});

document.addEventListener('keydown', function(e){
     handleKeyClose(e, modal, 'Escape');
});

//resizing browser window
  function windowResize(){
    const width = window.innerWidth
    if(width >= 800){
        logo.setAttribute('src', 'https://crushingit.tech/hackathon-assets/shopify-icon-desktop.svg')
        storeBtn.classList.remove('hide')
    }else{
        storeBtn.classList.add('hide')
        logo.setAttribute('src','https://crushingit.tech/hackathon-assets/shopify-icon.svg') 
    }
}

const eventArr  = ['load', 'resize'];
eventArr.forEach(evt => window.addEventListener(evt, windowResize));

AdminList.addEventListener('click', function(e){
    const allMenu = AdminDropdown.querySelectorAll('[role="menulist"]');
    const expandBtn = storeBtn.getAttribute('aria-expanded');
    function handleArrowKeys(evt, menuIndex){
        const isFirstList = menuIndex === 0;
        const isLastList = menuIndex === allMenu.length - 1;
        const nextItemList = allMenu.item(menuIndex + 1);
        const previousItemList = allMenu.item(menuIndex - 1);
        if(evt.key === 'ArrowDown' || evt.key === 'ArrowRight'){
            if(isLastList){
             allMenu.item(0).focus()
             return;
            }
            nextItemList.focus();
        }
        if(isFirstList){
            if(e.key === 'ArrowUp' || e.key === 'ArrowLeft'){
                allMenu.item(allMenu.length - 1).focus()
                return;
            }
            previousItemList.focus();
        }

    }
    if(e.target.classList.contains('store-btn') || e.target.classList.contains('dc') ){
        AdminDropdown.classList.toggle('hide')
        if(expandBtn !== 'false'){
            storeBtn.setAttribute('aria-expanded', 'false');
            storeBtn.focus();
         }else{
            storeBtn.setAttribute('aria-expanded', 'true');
            allMenu.item(0).focus();
            allMenu.forEach(function(menuItem, menuIndex){
                menuItem.addEventListener('keydown', function(e){
                    handleArrowKeys(e, menuIndex);
                })
            })
        }
     showAlertAndCloseDropdown(modal);
    }
});

// STORE DROPDOWN
document.addEventListener('keydown', function(e){
     handleKeyClose(e, AdminDropdown, 'Escape');
});
  
 btnClose.addEventListener('click', function(e){
        e.target.closest('.trial-callout').remove();
 })

// DASHBOARD TOGGLING
  function handleDashboardToggle(){
    const img = imgToggler.getAttribute('src');
    if(img === 'https://crushingit.tech/hackathon-assets/icon-arrow-down.svg'){
        dashboardToggler.setAttribute('aria-expanded', 'true')
        imgToggler.setAttribute('src', 'https://crushingit.tech/hackathon-assets/icon-arrow-up.svg')
        accordion.classList.remove('hide');
    }else{
        dashboardToggler.setAttribute('aria-expanded', 'false');
        imgToggler.setAttribute('src', 'https://crushingit.tech/hackathon-assets/icon-arrow-down.svg')
        accordion.classList.add('hide');
    }
    dashboardToggler.focus()
}

dashboardToggler.addEventListener('click', handleDashboardToggle)
document.addEventListener('keydown', function(e){
    if(e.key === '.' || e.key === ',' && !accordion.classList.contains('hide')){
        handleDashboardToggle();
    }
});

// adding the appropriate classes to active element in the dash board
 accordion.addEventListener('click', function(e){
    const clicked = e.target.closest('.dashboard-process_header', '.dashed-checkbox_wrapper');
    const isOpened =  clicked.getAttribute('aria-expanded');
    if(!clicked && isOpened !== 'false') return;
      clicked.setAttribute('aria-expanded', 'true');
     dashProcessBtnHeader.forEach(btnHeader => btnHeader.classList.remove('active-button')
     );
    contentWrapper.forEach(content => content.classList.remove('active'));
    contentHidden.forEach(hidden => hidden.classList.add('hide'));
    clicked.classList.add('active-button');
    document.querySelector(`.content--${clicked.dataset.tab}`).classList.remove('hide');
    document.querySelector(`.content--${clicked.dataset.tab}`).parentElement.classList.add('active');
 })

 //UPDATING THE PROGRESS BAR AS USER CLICKS.
 function updateProgressBar(){
    const progressCount= document.querySelector('.progress-count');
    const progressBar = document.querySelector('.progress-bar');
    const progressInterval = 100/dashCheckbox.length;
    let count = 0;
    let width = 0;
    for(let i = 0; i < dashCheckbox.length; i++){
        if(dashCheckbox[i].checked){
            checkedImg[i].classList.remove('hide');
             count++;
            width += progressInterval;
        }else{
            checkedImg[i].classList.add('hide');
        }
}
   progressBar.style.width =`${width}px`;
   progressCount.textContent = `${count} / 5 completed`;
 }

 checkboxContainer.forEach(check => {
    check.addEventListener('click',updateProgressBar)
 });

 

altAttribute.forEach(alt=> alt.style.color = '#005bd3');
 