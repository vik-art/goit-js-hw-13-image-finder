import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

function openModal(e) {
    if(e.target.nodeName != 'IMG') {
        return
    }
    e.preventDefault();
    const largeImage = `<img src="${e.target.dataset.source}">`;
    const instance = basicLightbox.create(largeImage);
    instance.show()
}
export {openModal}