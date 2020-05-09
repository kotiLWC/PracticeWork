public with sharing class dataTableLWC {
@AuraEnabled(cacheable = true)
public static List<Account> fetchAccounts(){
    return [SELECT Id,Name,Phone,Type,Industry,Rating,Website FROM Account where rating != null LIMIT 10];
}
@AuraEnabled(cacheable = true)
public static void deleteAccounts(List<id> accIds){
    try {
        list<Account> lstAccsToDelete = new list<Account>();
        System.debug('lstConIds ====> '+accIds);
        for(Id idAcc : accIds) {
            lstAccsToDelete.add(new Account(Id = idAcc));
        }
        if(!lstAccsToDelete.isEmpty()) {
            delete lstAccsToDelete;
        }
    }
    catch(Exception ex) {
        throw new AuraHandledException(ex.getMessage());
    }
}
}