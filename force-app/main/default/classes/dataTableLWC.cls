public with sharing class dataTableLWC {
    @AuraEnabled(cacheable = true)
    public static List<Account> fetchAccounts(){
        return [SELECT Id,Name,Phone,Type,Industry,Rating,Website FROM Account LIMIT 100];
    }
    @AuraEnabled(cacheable = false)
    public static void deleteAccounts(List<id> accIds){
        list<Account> lstAccsToDelete = [SELECT Id FROM Account WHERE Id IN:accIds];
        //delete lstAccsToDelete;   
        Database.DeleteResult[] DR_Dels = Database.delete(lstAccsToDelete, false);
        for (Database.DeleteResult dr: DR_Dels) {
            if (dr.isSuccess()) {
                system.debug('successful delete Account');
            }else{
                for (Database.Error err: dr.getErrors()) {
                    system.debug('getStatusCode===>'+err.getStatusCode());
                    system.debug('getMessage===>'+err.getMessage());
                }  
            }
        }             
    }
    @AuraEnabled
    public static Account createAccount(Account acc){
     system.debug('====account===='+acc);  
     insert acc;
     return acc; 
    }
}