trigger ContactTrigger on Contact (after update) {
    if(trigger.isAfter && trigger.isUpdate){
        if(checkRecursive.isContactUpdate == true){
        checkRecursive.isContactUpdate = false;
        ContactTriggerHandler.accountUpdate(trigger.new);
        }
    }

}