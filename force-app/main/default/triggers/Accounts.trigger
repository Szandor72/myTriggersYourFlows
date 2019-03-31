Trigger Accounts on Account (
	before insert, 
	before update, 
	before delete, 
	after insert, 
	after update, 
	after delete, 
	after undelete) {
	
    String stackTraceString = 'Class.AccountsTrigger.Trigger: line 11, column 1';
    Logger.logTrigger(Trigger.operationType, stackTraceString);
	MyTriggers.run();
    Logger.logTrigger(Trigger.operationType, stackTraceString);
}