trigger ContactTrigger on Contact (after update) {
    if(trigger.isAfter && trigger.isUpdate){
        ContactTriggerHandler.accountUpdate(trigger.new);
    }

}