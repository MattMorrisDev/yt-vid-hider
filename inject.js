'use strict';

const PROCESSED_VIDEO_ATTRIBUTE = 'has-yt-hider-btn'; 
const VIDEO_SELECTOR = `a#video-title:not([${PROCESSED_VIDEO_ATTRIBUTE}="1"])`;


function addButtonToVideosThatDontHaveOneYet() {

    document
    .querySelectorAll(VIDEO_SELECTOR)
    .forEach(a => {
        const hideBtn = document.createElement('button');
        hideBtn.innerHTML = '<span>Hide</span>';
        hideBtn.classList = 'yt-vid-hider-btn'; // defined in inject.css

        hideBtn.onclick = (ev => {

            let btn = ev.target;
            if (ev.target.tagName === 'SPAN')
                btn = ev.target.parentElement;

            const dropdownMenu = btn.parentElement.parentElement.nextSibling.nextSibling;

            // Click the three dots to open the menu
            dropdownMenu.querySelector('button').click();

            // Click the 'Hide' dropdown menu choice
            setTimeout(() => {
                // Wait a tick so the popup menu has time to show itself
                document.querySelectorAll('ytd-popup-container ytd-menu-service-item-renderer')[2].click()
            });


        });

        // Mark this video as processed so our selector doesn't target this video again
        a.setAttribute(PROCESSED_VIDEO_ATTRIBUTE, '1');
        a.parentElement.insertBefore(hideBtn, null)
    });
}


const debounce = (fn, time) => {
    let timerId;

    return function () {
        const functionCall = () => fn.apply(this, arguments);
        clearTimeout(timerId);
        timerId = setTimeout(functionCall, time);
    }
};

const debouncedFn = debounce(addButtonToVideosThatDontHaveOneYet, 1000);

// When we scroll down and fetch a new set of videos, we need to add
// the hide button to those videos also
const searchResultsContainer = document.querySelector('ytd-section-list-renderer');
searchResultsContainer.addEventListener('DOMNodeInserted', debouncedFn, false);
searchResultsContainer.addEventListener('DOMNodeRemoved', debouncedFn, false);