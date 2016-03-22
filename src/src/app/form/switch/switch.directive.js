export function switchDirective() {
  'ngInject';

  let directive = {
    restrict: 'E',
    templateUrl: 'app/form/switch/switch.html',
    transclude: true,
    link: function(scope, element, attrs, _, transclude) {
      let cloneElement, cloneScope;
      scope.$watch(attrs, (newAttrs) => {
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
    scope: {
      disabled: '=?disabled',
      editable: '=?editable',
      targetId: '=?targetId',
      options: '=?options'
    },
    controller: switchController,
    controllerAs: 'vm',
    bindToController: true
  };

  return directive;
}

class switchController {
  constructor($log, _, $rootScope, $scope, $element, componentOptions) {
    'ngInject';

    if (angular.isUndefined(this.disabled)) {
      this.disabled = true;
    }
    if (angular.isUndefined(this.editable)) {
      this.editable = false;
    }

    this.$scope = $scope;
    this.$log = $log;
    this.$element = $element;

    let options = angular.copy(componentOptions.switch);

    if (angular.isDefined(this.options)) {
      angular.extend(options, this.options);
    }

    this.options = options;
  }

  modifyComponent () {
    this.$scope.$parent.form.modifyComponent(this.$scope.vm);
  }

  removeComponent () {
    this.$scope.$parent.form.removeComponent(this.$element, this.$scope, this.targetId);
  }
}
