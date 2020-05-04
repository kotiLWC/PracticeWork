public with sharing class ContactTriggerHandler {
   Public static void accountUpdate(List<Contact> conList){
    List<Account> upDateAccount = new List<Account>();  
    map<id, List<Contact>> mapAccidWithCon = new map<id, List<Contact>>();
       for(Contact con: conList){
        if(mapAccidWithCon.containsKey(con.Accountid)){
            mapAccidWithCon.get(con.Accountid).add(con);
        }else{
            mapAccidWithCon.put(con.Accountid, new List<Contact>{con});  
        }
       }
       List<Account> accList = [SELECT Id,Name,Phone FROM Account WHERE Id IN:mapAccidWithCon.keySet()];
       for(Account acc : accList){
        List<Contact> lstContacts = mapAccidWithCon.get(acc.Id);
        Contact con = lstContacts[0];
        acc.Phone = con.Phone;
        upDateAccount.add(acc);
       }
       if(upDateAccount.size()>0){
        try {
            checkRecursive.isAccountUpdate = false;
            Database.SaveResult[] srList = Database.update(upDateAccount, false);
            // Iterate through each returned result
            for (Database.SaveResult sr: srList) {
             if (sr.isSuccess()) {
              // Operation was successful, so get the ID of the record that was processed
              System.debug('Successfully updated Account. Account ID: ' + sr.getId());
     
             } else {
              // Operation failed, so get all errors                
              for (Database.Error err: sr.getErrors()) {
               System.debug('The following error has occurred.');
               System.debug(err.getStatusCode() + ': ' + err.getMessage());
               System.debug('Contact fields that affected this error: ' + err.getFields());
              }
             }
            }
           } catch (exception e) {
            System.debug('Exception type caught: ' + e.getTypeName());
            System.debug('Message: ' + e.getMessage());
            System.debug('Cause: ' + e.getCause()); // returns null
            System.debug('Line number: ' + e.getLineNumber());
            System.debug('Stack trace: ' + e.getStackTraceString());
           }
       }

   }
}