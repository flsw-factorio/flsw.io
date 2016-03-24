(function() {
  'use strict';

  angular
    .module('flswIo')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
