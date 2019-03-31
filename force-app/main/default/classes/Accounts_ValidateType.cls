public class Accounts_ValidateType extends MyTriggers {
	
    private List<Account> accountsBeforeInsert; 
    private List<Account> accountsBeforeUpdate;
	
	public override void onBeforeInsert() {
        Logger.push();
		this.accountsBeforeInsert = (List<Account>)records;
        validate(accountsBeforeInsert);
        Logger.pop();
    }
    
    public override void onBeforeUpdate(Map<Id,sObject> initialAccountValueMap) {
        Logger.push();
		this.accountsBeforeUpdate = (List<Account>)records;
        validate(accountsBeforeUpdate);
        Logger.pop();
    }
    
    private void validate(List<Account> accounts) {
        Logger.push();
		AccountsService.validateType(accounts);
        Logger.pop();
    }
	
}