'use strict';

const VIDEO_SELECTOR = 'a#video-title';


document
    .querySelectorAll(VIDEO_SELECTOR)
    .forEach(a => {
        const hideBtn = document.createElement('button');
        hideBtn.classList = 'ext-hide-vid-btn'; // defined in inject.css

        hideBtn.onclick = (ev => {

            const btn = ev.target;
            const dropdownMenu = btn.parentElement.parentElement.nextSibling.nextSibling;

            // Click the three dots to open the menu
            dropdownMenu.querySelector('button').click();

            // Click the 'Hide' dropdown menu choice
            setTimeout(() => {
                // Wait a tick so the popup menu has time to show itself
                document.querySelectorAll('ytd-popup-container ytd-menu-service-item-renderer')[2].click()
            });


        });


        a.parentElement.insertBefore(hideBtn, null)
    });




