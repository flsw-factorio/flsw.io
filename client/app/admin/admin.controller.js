'use strict';

(function() {

class AdminController {
  constructor(User) {
    // Use the User $resource to fetch all users
    this.users = User.query();
  }

  delete(user) {
    user.$remove();
    this.users.splice(this.users.indexOf(user), 1);
  }

  ban(user) {
    this.$http.put('/ban/' + user._id +'/' + true);
  }

  unban(user) {
    this.$http.put('/ban/' + user._id +'/' + false);
  }
}

angular.module('flswIoApp.admin')
  .controller('AdminController', AdminController);

})();
