import { LightningElement } from 'lwc';

export default class EventSimple extends LightningElement {
    page = 1;
    handlePrevious() {
        console.log("Previous");
        if (this.page > 1) {
            this.page = this.page - 1;
        }
    }

    handleNext() {
        console.log("Next");
        this.page = this.page + 1;
    }  
}