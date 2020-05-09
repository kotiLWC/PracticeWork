import { LightningElement, wire, track } from 'lwc';
import fetchAccounts from '@salesforce/apex/dataTableLWC.fetchAccounts';
const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    { label: 'Rating', fieldName: 'Rating' }
];
export default class AccountDeleteRecord extends LightningElement {
    error;
    @track columns = columns;
    @track data;
    @track buttonLabel = 'Delete';

    error;

    @wire(fetchAccounts)
    accounts(result){
        if (result.data) {
            this.data = result.data;
            this.error = undefined;

        } else if (result.error) {
            this.error = result.error;
            this.data = undefined;
        }
    }

    getSelectedName(event) {
        const selectedRows = event.detail.selectedRows;
        // Display that fieldName of the selected rows
        for (let i = 0; i < selectedRows.length; i++){
            alert("You selected: " + selectedRows[i].Id);
        }
    }
}