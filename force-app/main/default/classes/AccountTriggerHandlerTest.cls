@isTest
public with sharing class AccountTriggerHandlerTest {
    @isTest   
    public static void contactUpdateTest(){
        
        //Test Data Factory
        TestDataFactory ut = new TestDataFactory();
       
        //Create Account
        Account acc = TestDataFactory.createAccount();
        acc.Name ='Koti';
        acc.Rating ='Hot';
        acc.Phone ='9620329488';
      
        String accId = acc.Id;
        //Create Contact
        contact con = TestDataFactory.createContact(accId);
        con.LastName ='Test1';
        con.Phone ='7654545261';
        
        //Create Contact
        contact con1 = TestDataFactory.createContact(accId);
        con1.LastName ='Test2';
        con1.Phone ='7654545262';
        
        //Create Contact
        contact con2 = TestDataFactory.createContact(accId);
        con2.LastName ='Test3';
        con2.Phone ='7654545263';
        
        Test.startTest();
        acc.Phone = '7702467702';
        update acc;
        Test.stopTest();
        List<Contact> conList =[SELECT id,Name,Phone FROM Contact where Accountid=: acc.id];
        system.assertEquals(conList[0].Phone, '7702467702');

    }
    
}