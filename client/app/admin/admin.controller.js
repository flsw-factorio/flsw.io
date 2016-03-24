'use strict';

(function() {

class AdminController {
  constructor(User) {
    // Use the User $resource to fetch all users
    this.users = User.query();
    this.User = User;
  }

  delete(user) {
    user.$remove();
    this.users.splice(this.users.indexOf(user), 1);
  }

  ban(user) {
    user.banned = true;
    console.log('banning %o', user);
    user.$save();
    }

  unban(user) {
   user.banned = false;
    console.log('unbanning %o', user);
    user.$save();
    }
}

angular.module('flswIoApp.admin')
  .controller('AdminController', AdminController);

})();
