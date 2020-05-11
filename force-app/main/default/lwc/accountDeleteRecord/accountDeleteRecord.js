import { LightningElement, wire, track } from 'lwc';
import fetchAccounts from '@salesforce/apex/dataTableLWC.fetchAccounts';
import delSelectedAccs from '@salesforce/apex/dataTableLWC.deleteAccounts';
// importing to show toast notifictions
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

// importing to refresh the apex after delete the records.
import {refreshApex} from '@salesforce/apex';

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
    @track isTrue = false;
    @track recordsCount = 0;


    error;
    selectedRecords = [];
    refreshTable;

    @wire(fetchAccounts)
    accounts(result){
        this.refreshTable = result;
        if (result.data) {
            this.data = result.data;
            this.error = undefined;

        } else if (result.error) {
            this.error = result.error;
            this.data = undefined;
        }
    }

    getSelectedName(event) {
        var accIdList =[];
        const selectedRows = event.detail.selectedRows;
        this.recordsCount = event.detail.selectedRows.length;

        console.log(selectedRows);
        // Display that fieldName of the selected rows
        for (let i = 0; i < selectedRows.length; i++){
            console.log("You selected: " + selectedRows[i].Id);
            accIdList.push(selectedRows[i].Id);
            this.selectedRecords = accIdList;
        }
    }
    //delete records process function
    deleteAccounts() {
        if(this.selectedRecords) {
            delSelectedAccs ({accIds : this.selectedRecords})
            .then(result => {
                console.log('result ====>'+result);
            // showing success message
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success!!', 
                    message: this.recordsCount + ' Contacts are deleted.', 
                    variant: 'success'
                }),
            );
            // Clearing selected row indexs 
            this.template.querySelector('lightning-datatable').selectedRows = [];

            this.recordsCount = 0;

            // refreshing table data using refresh apex
            return refreshApex(this.refreshTable);
            })
            .catch(error => {
                console.log('==Error==>');
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error while getting Contacts', 
                        message: error.message, 
                        variant: 'error'
                    }),
                );
            })  
        }
    }
}