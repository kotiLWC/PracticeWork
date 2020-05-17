import { LightningElement } from 'lwc';

export default class C2PEventChild extends LightningElement {
handlePrev(){
    this.dispatchEvent(new CustomEvent('previous'));
}
handleNext(){
    this.dispatchEvent(new CustomEvent('next'));
}
}