import { LightningElement, wire } from 'lwc';
import getContactList from '@salesforce/apex/ContactController.getContactList';

export default class EventWithData extends LightningElement {
    selectedContact;
    @wire(getContactList) contacts;

    handleSelect(event) {
        console.log("Event handle");
        const contactId = event.detail;
        console.log("Contact Id:::",contactId);
        const selectCon = this.contacts.data.find(
            (contact) => contact.Id === contactId
        );
        console.log("selectCon:::",selectCon);

        this.selectedContact = this.contacts.data.find(
            (contact) => contact.Id === contactId
        );
    }
}