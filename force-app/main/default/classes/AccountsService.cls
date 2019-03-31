public with sharing class AccountsService {
    private class AccountsServiceException extends Exception {}
		
    public static void validateType(List<Account> accountsToValidate) {
        Logger.push();
        Boolean throwException = false; 
        String exceptionMessage = 'Validation failed: ';
        for (Account accountToValidate : accountsToValidate) {
            //Logger.log('validating '+ accountToValidate.Name);
            if (String.isBlank(accountToValidate.Type)) {
                exceptionMessage += 'Type is empty';
                throwException = true;
			}
        }
        if (throwException) {
            Exception ex = new AccountsServiceException(exceptionMessage);
            Logger.logException(ex);
			Logger.popAll();
            throw ex;
        }
        Logger.pop();
    }
}