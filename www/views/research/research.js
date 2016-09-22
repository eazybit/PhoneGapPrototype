angular.module('app.views.research', [])
    .controller('researchCtrl', ['$scope', function ($scope){
        var phoneContacts = [];
        $scope.phoneContacts = [];
        $scope.contacts = [];
        getAllContacts();
        $scope.addClick = function() {
            var myContact = navigator.contacts.create({"displayName": $scope.firstName});
            var name = new ContactName();
            name.givenName = $scope.firstName;
            name.familyName = $scope.lastName;
            myContact.name = name;

            var phoneNumbers = [];
            phoneNumbers[0] = new ContactField('work', $scope.phone, false);
            phoneNumbers[1] = new ContactField('mobile', $scope.phone, true);
            phoneNumbers[2] = new ContactField('home', $scope.phone, false);
            myContact.phoneNumbers = phoneNumbers;

            myContact.save(function (contact) {
                if (contact.name.formatted != null && contact.name.formatted != undefined) {
                    contact_name = contact.name.formatted;
                    contact_name = contact_name.replace(/'/g, "''");
                    if (contact.phoneNumbers != null && contact.phoneNumbers.length > 0 && contact.phoneNumbers[0].value != null && contact.phoneNumbers[0].value != undefined) {
                        console.log(contact.phoneNumbers[0].value);
                        contact_phone = contact.phoneNumbers[0].value;
                    } else {
                        console.log("--No Number-");
                        contact_phone = "";
                    }
                    var tmpContact = {
                        name: contact_name,
                        phone: contact_phone
                    };
                    $scope.phoneContacts.push(tmpContact);
                }
                $scope.$applyAsync();
            }, function (error) {
                alert(error);
            });
        };

        function getAllContacts() {
            phoneContacts = [];
            navigator.contacts.find(
                ['displayName', 'name', 'phoneNumbers'],
                function (contacts) {
                    var contact_name;
                    var contact_phone;
                    for (i = 0; i < contacts.length; i++) {
                        if (contacts[i].name.formatted != null && contacts[i].name.formatted != undefined) {
                            contact_name = contacts[i].name.formatted;
                            contact_name = contact_name.replace(/'/g, "''");
                            if (contacts[i].phoneNumbers != null && contacts[i].phoneNumbers.length > 0 && contacts[i].phoneNumbers[0].value != null && contacts[i].phoneNumbers[0].value != undefined) {
                                console.log(contacts[i].phoneNumbers[0].value);
                                contact_phone = contacts[i].phoneNumbers[0].value;
                            } else {
                                console.log("--No Number-");
                                contact_phone = "";
                            }
                            var contact = {
                                name: contact_name,
                                phone: contact_phone
                            };
                            $scope.phoneContacts.push(contact);
                        }
                    }
                    $scope.$applyAsync();
                }, function (error) {
                    alert(error);
                }, {filter: "", multiple: true}
            );
        }
    }
    ]);