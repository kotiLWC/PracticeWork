@isTest
public with sharing class TestDataFactory{
    //Created by KoteswaraRao
    public static Account createAccount() { 
       Account acc = new Account();
        acc.Name = 'Koti';
        insert acc;
        return acc;
    }
     public static Contact createContact(String accId) { 
       Contact con = new Contact();
        con.AccountId = accId;
        con.LastName = 'Challa';
        insert con;
        return con;
    }
}