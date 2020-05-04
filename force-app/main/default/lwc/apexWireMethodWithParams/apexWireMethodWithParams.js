import { LightningElement, wire } from 'lwc';
import findContacts from '@salesforce/apex/ContactController.findContacts';

export default class ApexWireMethodWithParams extends LightningElement {
    searchKey ='';
   
    handleKeyChange(event) {
        const searchKey = event.target.value;
        this.searchKey = searchKey;

    }
    @wire(findContacts, { searchKey: '$searchKey' })
    contacts;       
}