import { initMenuListener } from './common.js'
import PhotoSwipeLightbox from '../../photoswipe/dist/photoswipe-lightbox.esm.js';
import PhotoSwipe from '../../photoswipe/dist/photoswipe.esm.js';
// import PhotoSwipeLightbox from 'photoswipe/lightbox';
// import 'photoswipe/style.css';

async function initGallery() {
    const galleryDiv = document.getElementById('my-gallery');
    const urls: Array<any> = await fetch('http://localhost:3000/getUrls').then(res => res.json())
    console.log('urls', urls)
    const children: Node[] = urls.map(url => {
        const img = document.createElement('img')
        img.src = url

        const anchor = document.createElement('a');
        img.onload = function() { 
            anchor.setAttribute('data-pswp-width', `${img.width}`)
            anchor.setAttribute('data-pswp-height', `${img.height}`)
            img.height = img.height / 2
            img.width = img.width / 2
        }
        anchor.href = url
        anchor.append(img)
        return anchor
    });
    galleryDiv.append(...children)
    const lightbox = new PhotoSwipeLightbox({
        gallery: '#my-gallery',
        children: 'a',
        pswpModule: PhotoSwipe
    });
    lightbox.init();
}

function main() {
    initMenuListener();
    initGallery();
}

main();