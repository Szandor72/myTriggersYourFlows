Trigger Accounts on Account (
    before insert, 
    before update, 
    before delete, 
    after insert, 
    after update, 
    after delete, 
    after undelete) {
        
        private class AccountsException extends Exception{}
        
        String stackTraceString = 'Class.AccountsTrigger.Trigger: line 11, column 1';
        Logger.logTrigger(Trigger.operationType, stackTraceString);
        
        try  {
            MyTriggers.run();
            Logger.logTrigger(Trigger.operationType, stackTraceString);
        } catch (AccountsService.AccountsServiceException ex) {
            Logger.logTrigger(Trigger.operationType, stackTraceString);
            throw new AccountsException(ex.getMessage());
        }
        
        
    }