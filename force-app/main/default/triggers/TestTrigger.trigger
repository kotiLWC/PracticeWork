trigger TestTrigger on Account (before insert) {
Account newAccount = trigger.new[0];
system.System.debug(newAccount);
system.System.debug(newAccount.Name);
system.System.debug(newAccount.Rating);
system.System.debug(newAccount.Description);

}