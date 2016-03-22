export function fileUploaderDirective() {
  'ngInject';

  let directive = {
    restrict: 'E',
    templateUrl: 'app/form/fileUploader/fileUploader.html',
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
      options: '=?options',
      uploaderFlow: '=?uploaderFlow'
    },
    controller: fileUploaderController,
    controllerAs: 'vm',
    bindToController: true
  };

  return directive;
}

class fileUploaderController {
  constructor($log, _, $rootScope, $scope, $timeout, $element, flow, swal, componentOptions) {
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

    let options = angular.copy(componentOptions.fileUploader);

    if (angular.isDefined(this.options)) {
      angular.extend(options, this.options);
    }

    this.options = options;

    let allowdMimeTypeMapping = [];
    if (options.allowedMimeTypes.indexOf('all') === -1) {
      let allowdMimeTypeMapping = _.reduce(options.mimeTypes, (mime, types, key) => {
        if (options.allowedMimeTypes.indexOf(key) > -1) {
          return mime.concat(types);
        } else {
          return mime;
        }
      }, []);
      allowdMimeTypeMapping = _.uniq(allowdMimeTypeMapping);
    }
  }

  modifyComponent () {
    this.$scope.$parent.form.modifyComponent(this.$scope.vm);
  }

  removeComponent () {
    this.$scope.$parent.form.removeComponent(this.$element, this.$scope, this.targetId);
  }
}
