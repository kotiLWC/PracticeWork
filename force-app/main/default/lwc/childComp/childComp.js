import { LightningElement, api } from 'lwc';

export default class ChildComp extends LightningElement {
    @api childMessage='Hi I am from child';

}