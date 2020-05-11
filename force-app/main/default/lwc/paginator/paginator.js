import { LightningElement } from 'lwc';

export default class Paginator extends LightningElement {
    previousHandler() {
        console.log("Previous");
            this.dispatchEvent(new CustomEvent('previous'));
    }

    nextHandler() {
        console.log("Next");
        this.dispatchEvent(new CustomEvent('next'));
    }
}