import { LightningElement, wire, track } from 'lwc';
import fetchAccounts from '@salesforce/apex/dataTableLWC.fetchAccounts';
import updtSelectedAccs from '@salesforce/apex/dataTableLWC.updateAccount';

import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import {refreshApex} from '@salesforce/apex';

const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    { label: 'Rating', fieldName: 'Rating' },
];
export default class AccountUpdateRecord extends LightningElement {
    error;
    @track columns = columns;
    @track data;
    @track selectedAccount;
    selectedRecords = [];

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

        console.log(selectedRows);
        // Display that fieldName of the selected rows
        for (let i = 0; i < selectedRows.length; i++){
            console.log("You selected: " + selectedRows[i].Id);
            accIdList.push(selectedRows[i].Id);
            this.selectedRecords = accIdList;
        }
    }

    updateAccount(){
        if(this.selectedRecords) {
        updtSelectedAccs ({accIds : this.selectedRecords})
            .then(result =>{
                console.log("Selected Account====>",result);
                this.selectedAccount = result.data;  
                 // Clearing selected row indexs 
            this.template.querySelector('lightning-datatable').selectedRows = [];
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