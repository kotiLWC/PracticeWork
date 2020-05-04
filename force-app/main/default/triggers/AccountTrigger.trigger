trigger AccountTrigger on Account (after update) {
    if(trigger.isAfter && trigger.isUpdate){
        AccountTriggerHandler.contactUpdateFromAccount(trigger.new);
    }

}