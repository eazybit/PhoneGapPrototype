/** 
 * Format datatime
 */

define(['angular'], function(angular){
    
    return angular.module('app.resources.messages', [])
        .service('messages',  function () {
        return {
            //control names start//
            controls: {
                showasName: 'Show as Names',
                showasShortName: 'Show as Short Names'
            },
            //control names end//

            //confirm messages start//
            confirmMessages: {
                delete: 'Do you want to delete it?',
                deleteNote: 'Delete this note? Any attachments or sidenotes will also be deleted.',
                deleteSidenote: 'Delete this sidenote? Any attachments will also be deleted.'
            },
            //confirm messages end//
            
            // information start//
            info: {
                noResult: 'No results found'
            },
            //information end//
            
            // entity related start//
            entity: {
                contact: 'Contact'
            },
            //entity related end//
        };

    });
});