import { LightningElement, track } from 'lwc';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import RATING_FIELD from '@salesforce/schema/Account.Rating';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';
import createAccount from '@salesforce/apex/dataTableLWC.createAccount';
import { ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class CreateAccountData extends LightningElement {
    @track name = NAME_FIELD;
    @track industry = INDUSTRY_FIELD;
    @track rating = RATING_FIELD;
    @track phone = PHONE_FIELD;
    rec ={
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

    handleClick(){
        createAccount({ acc : this.rec })
        .then(result => {
            this.message = result;
            this.error = undefined;
            if(this.message !== undefined){
                this.rec.Name = '';
                this.rec.Rating = '';
                this.rec.Industry = '';
                this.rec.Phone = '';
                this.dispatchEvent(
                    new ShowToastEvent({
                        title : 'Success',
                        message : 'Account Created',
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
    }

}