public with sharing class AccountTriggerHandler {
   
    public static void contactUpdateFromAccount(List < Account > accList) {
     List < Contact > conUpdateList = new List < Contact > ();
     map < id, Account > accMap = new map < id, Account > ();
     for (Account acc: accList) {
      accMap.put(acc.id, acc);
     }
     if (!accMap.isEmpty()) {
      List < Contact > conList = [SELECT id, Name, Phone, Accountid FROM Contact WHERE Accountid IN: accMap.keySet()];
      if (conList.size() > 0) {
       for (Contact con: conList) {
        Account a = accMap.get(con.Accountid);
        con.Phone = a.Phone;
        conUpdateList.add(con);
       }
      }
   
     }
     if (conUpdateList.size() > 0) {
      try {
       checkRecursive.isContactUpdate = false;
       Database.SaveResult[] srList = Database.update(conUpdateList, false);
       // Iterate through each returned result
       for (Database.SaveResult sr: srList) {
        if (sr.isSuccess()) {
         // Operation was successful, so get the ID of the record that was processed
         System.debug('Successfully updated Contact. Contact ID: ' + sr.getId());
        

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