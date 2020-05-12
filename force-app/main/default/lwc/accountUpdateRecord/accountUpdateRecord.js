import { LightningElement, wire, track } from 'lwc';
import fetchAccounts from '@salesforce/apex/dataTableLWC.fetchAccounts';
import updtSelectedAccs from '@salesforce/apex/dataTableLWC.updateAccount';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import RATING_FIELD from '@salesforce/schema/Account.Rating';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';
import upsertAccount from '@salesforce/apex/dataTableLWC.upsertAccount';
import { ShowToastEvent} from 'lightning/platformShowToastEvent';

import {refreshApex} from '@salesforce/apex';

const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    { label: 'Rating', fieldName: 'Rating' },
    { label: 'Industry', fieldName: 'Industry' },
];
export default class AccountUpdateRecord extends LightningElement {
    error;
    @track columns = columns;
    @track data;
    @track selectedAccount;
    @track openmodel = false;
    @track accountId;
    @track name = NAME_FIELD;
    @track industry = INDUSTRY_FIELD;
    @track rating = RATING_FIELD;
    @track phone = PHONE_FIELD;
    rec ={
        Id : this.accountId,
        Name : this.name,
        Rating : this.rating,
        Phone : this.phone,
        Industry : this.industry
    }
    handleNameChange(event){
        this.rec.Name = event.target.value;
        console.log("Name====>"+this.rec.Name);
    }
    handleRatingChange(event){
        this.rec.Rating = event.target.value;
        console.log("Rating====>"+this.rec.Rating);
    }handlePhoneChange(event){
        this.rec.Phone = event.target.value;
        console.log("Phone====>"+this.rec.Phone);
    }handleIndustryChange(event){
        this.rec.Industry = event.target.value;
        console.log("Industry====>"+this.rec.Industry);
    }

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
   
    closeModal() {
        this.openmodel = false
    } 
    /*saveMethod() {
        alert('save method invoked');
        this.closeModal();
    }*/
    getSelectedName(event) {
        var accIdList =[];
        const selectedRows = event.detail.selectedRows;

        console.log(selectedRows);
        // Display that fieldName of the selected rows
    for (let i = 0; i < selectedRows.length; i++){
            console.log("You selected: " + selectedRows[i].Id);
            accIdList.push(selectedRows[i].Id);
            this.selectedRecords = accIdList;
            this.rec.Id = this.selectedRecords[0];
            console.log("Id====>"+this.rec.Id);
        }
    }
    updateAccount(){
        //  
        if(this.selectedRecords) {
        updtSelectedAccs ({accIds : this.selectedRecords})
            .then(result =>{
                console.log("Result====>",result);
                this.rec.Name = result[0].Name;
                this.rec.Rating = result[0].Rating;
                this.rec.Industry = result[0].Industry;
                this.rec.Phone = result[0].Phone;
                this.rec.Id =result[0].Id;
                this.selectedAccount = result;
                console.log("Selected Account====>", this.selectedAccount);
                this.openmodel = true;
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

    saveMethod(event){
        console.log("===Account Id===>",this.rec.Id );
        console.log("===rec===>",this.rec );

        upsertAccount({ acc : this.rec })
        .then(result => {
            this.message = result;
            this.error = undefined;
            if(this.message !== undefined){
              
                this.dispatchEvent(
                    new ShowToastEvent({
                        title : 'Success',
                        message : 'Account Updated',
                        variant : 'success',
                    }),
                );
            }
            console.log(JSON.stringify(result));
            console.log("result ====>",this.message);

        })
        .catch(error => {
            this.message = undefined;
            this.error = error;
            this.dispatchEvent(
                new ShowToastEvent({
                    title : 'Error Creating Record',
                    message : error.body.message,
                    variant : 'error',
                }),
            );
            console.log("Error====>", JSON.stringify(this.error));
        }); 
        this.closeModal();

    }
}