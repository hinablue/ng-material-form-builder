export function inputRadioDirective() {
  'ngInject';

  let directive = {
    restrict: 'E',
    templateUrl: 'app/form/inputRadio/inputRadio.html',
    transclude: true,
    link: function(scope, element, attrs, _, transclude) {
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
    scope: {
      disabled: '=?disabled',
      editable: '=?editable',
      targetId: '=?targetId',
      options: '=?options'
    },
    controller: inputRadioController,
    controllerAs: 'vm',
    bindToController: true
  };

  return directive;
}

class inputRadioController {
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

    let options = angular.copy(componentOptions.inputRadio);

    if (angular.isDefined(this.options)) {
      angular.extend(options, this.options);
    }
    options.default = angular.copy(options.options[0].value).toString();

    this.options = options;

  }

  modifyComponent () {
    this.$scope.$parent.form.modifyComponent(this.$scope.vm);
  }

  removeComponent () {
    this.$scope.$parent.form.removeComponent(this.$element, this.$scope, this.targetId);
  }
}
