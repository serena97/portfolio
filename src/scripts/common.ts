export function initMenuListener() {
    const target: Element = document.querySelector(".mob-icon");
    const background: HTMLElement = document.querySelector(".background");
    let closing = false;
    background.onanimationend = () => {
        if(closing) {
            // remove .checked after adding .closing so that we don't immediately jump to display: none for background
            target.classList.remove('checked');
            background.classList.remove('closing');
        }
    };
    target.addEventListener('click', () => {
        if(target.classList.contains('checked')) {
            closing = true;
            background.classList.add('closing'); // this triggers onanimationend
        } else {
            closing = false;
            target.classList.add('checked');
        }
    })

    // listener for background blocks
    background.childNodes.forEach(item => {
        item.addEventListener('click', () => {
            closing = true;
            background.classList.add('closing'); // this triggers onanimationend
        })
    })
}