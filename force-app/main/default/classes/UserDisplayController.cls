public with sharing class UserDisplayController {
    
    @AuraEnabled(cacheable=true)
    public static User getCurrentUserDetails() {
        try {
            return [
                SELECT Id, Name, Username
                FROM User
                WHERE Id = :UserInfo.getUserId()
                LIMIT 1
            ];
        } catch (Exception e) {
            throw new AuraHandledException('Error retrieving user details: ' + e.getMessage());
        }
    }
}