import { LightningElement } from 'lwc';
import getContactList from '@salesforce/apex/ContactController.getContactList';

export default class ApexImperativeMethod extends LightningElement {
    contacts;
    error;
    handleLoad() { 
        getContactList()
        .then((res) => {
            this.contacts = res;
            this.error = undefined;
        })
        .catch((error) =>{
            this.contacts = undefined;
            this.error = undefined;
        })
    }
}