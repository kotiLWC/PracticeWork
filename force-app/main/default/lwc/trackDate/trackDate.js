import { LightningElement, track } from 'lwc';

export default class TrackDate extends LightningElement {
    @track x;
    initDate() {
        this.x = new Date();
    }
    updateDate() {
        this.x.setHours(7);
    }

}