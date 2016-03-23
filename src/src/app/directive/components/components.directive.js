export function componentsDirective() {
  'ngInject';

  let directive = {
    restrict: 'E',
    templateUrl: 'app/directive/components/components.html',
    transclude: true,
    link: function(scope, element, attrs, ctrl, transclude) {
      let cloneElement, cloneScope;
      scope.$watch(attrs, () => {
        if (angular.isDefined(cloneElement)) {
          cloneElement.remove();
          cloneElement = undefined;
          cloneScope.$destroy();
          cloneScope = undefined;
        }
        cloneScope = scope.$new();
        cloneElement = transclude(
            cloneScope,
            function injectClonedElement( clone ) {
                element.after( clone );
            }
        );
      });
    },
    scope: true,
    controller: componentsController,
    controllerAs: 'components',
    bindToController: true
  };

  return directive;
}

class componentsController {
  constructor($log, _, $scope) {
    'ngInject';

    this.$log = $log;
    this._ = _;
    this.$scope = $scope;
  }
}
