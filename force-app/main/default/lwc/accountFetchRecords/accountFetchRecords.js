import { LightningElement, wire } from 'lwc';
import fetchAccounts from '@salesforce/apex/dataTableLWC.fetchAccounts';
const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Rating', fieldName: 'Rating' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' }
];
export default class AccountFetchRecords extends LightningElement {
    error;
    columns = columns;
     @wire(fetchAccounts)
    accounts;
}