trigger AccountTrigger on Account (after update) {
    if(trigger.isAfter && trigger.isUpdate){
        if(checkRecursive.isAccountUpdate == true){
        checkRecursive.isAccountUpdate = false;
        AccountTriggerHandler.contactUpdateFromAccount(trigger.new);
          }
    }

}