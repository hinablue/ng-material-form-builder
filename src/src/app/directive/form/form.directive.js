export function formDirective() {
  'ngInject';

  let directive = {
    restrict: 'E',
    templateUrl: 'app/directive/form/form.html',
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
    scope: {
      form: '=ngModel'
    },
    controller: formController,
    controllerAs: 'form',
    bindToController: true
  };

  return directive;
}

class formController {
  constructor($log, _, swal, $rootScope, $scope, $compile, $mdDialog,
    $document, $timeout, componentOptions) {
    'ngInject';

    this.$log = $log;
    this.$scope = $scope;
    this.$timeout = $timeout;
    this._ = _;
    this.swal = swal;
    this.$mdDialog = $mdDialog;
    this.$document = $document;

    this.formName = 'formBuilderForm';

    this.components = [];
    this.swalOption = {
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      closeOnConfirm: true,
      closeOnCancel: true
    };

    this.handlerDrop = (component, direction) => {
      let template;
      if (component.substr(0, 5) === 'copy-') {
        template = angular.element('#'+component.substr(5));
      } else {
        let id = this.guid();
        let options = angular.copy(componentOptions[component]);
        options.name = angular.copy(id);

        if (angular.isDefined(direction.key)) {
          let index = _.findIndex(this.components, { id: direction.key });

          if (direction.direction === 'before') {
            this.components.splice(index, 0, {
              id: id,
              options: options
            });
          } else {
            if (index + 1 >= this.components.length) {
              this.components.push({
                id: id,
                options: options
              });
            } else {
              this.components.splice(index + 1, 0, {
                id: id,
                options: options
              });
            }
          }
        } else {
          this.components.push({
            id: id,
            options: options
          });
        }

        let key;
        switch (component) {
          case 'inputText':
            key = 'input-text';
          break;
          case 'inputCheckbox':
            key = 'checkbox';
          break;
          case 'inputRadio':
            key = 'radio';
          break;
          case 'fileUploader':
            key = 'file-uploader';
          break;
          default:
            key = component;
        }
        template = angular.element([
          '<div class="droppable-copy-drag-item" id="',
          id,
          '"><builder-',
          key,
          ' class="builder-components" disabled="true" editable="true" target-id="\'',
          id,
          '\'"></builder-',
          key,
          '></div>'
        ].join(''));

        if (angular.isUndefined(template)) {
          return false;
        }

        let el = template[0];
        el.draggable = true;
        el.addEventListener(
          'dragstart',
          (e) => {
            e.dataTransfer.effectAllowed = 'copyMove';
            e.dataTransfer.setData('text/plain', 'copy-'+id);
            e.target.classList.add('drag');
            e.target.style.opacity = 0.99;
            return false;
          },
          false
        );
        el.addEventListener(
          'dragend',
          (e) => {
            e.target.classList.remove('drag');
            e.target.style.opacity = 1;
            angular.element('.builder-components').removeClass('after before');
            angular.element('#__formBuilderForm').removeClass('over');

            return false;
          },
          false
        );
      }

      let form = angular.element('#__formBuilderForm');
      if (angular.isDefined(direction.key)) {
        let target = angular.element('.builder-components[target-id="\''+direction.key+'\'"]');
        if (direction.direction === 'before') {
          if (component.substr(0, 5) === 'copy-') {
            target.parent().before(template);
            this.swapComponent(direction.key, component.substr(5));
          } else {
            template.insertBefore(target.parent());
          }
        } else {
          if (component.substr(0, 5) === 'copy-') {
            target.parent().after(template);
            this.swapComponent(component.substr(5), direction.key);
          } else {
            template.insertAfter(target.parent());
          }
        }
      } else {
        form.append(template);
      }

      if (component.substr(0, 5) !== 'copy-') {
        $compile(template)($scope);
      }

      let components = this._.map(angular.copy(this.components), (component) => {
        if (angular.isDefined(component.options.mimeTypes)) {
          delete(component.options.mimeTypes);
        }
        if (angular.isDefined(component.options.validationOptions)) {
          delete(component.options.validationOptions);
        }
        return component;
      });
      this.form = angular.copy(components);

      $timeout(() => {
        $scope.$digest();
      });
    };
  }

  modifyComponent (targetScopeVM) {
    let modifiedComponent = this.findComponent(targetScopeVM.targetId);
    modifiedComponent.options = targetScopeVM.options;

    let modifyController = (scope, $mdDialog) => {
      scope.component = modifiedComponent;
      scope.componentBackup = angular.copy(modifiedComponent);

      scope.withValidation = false;
      scope.modifyComponentOptions = false;
      if (['inputText', 'textarea', 'datepicker'].indexOf(scope.component.options.type) > -1) {
        scope.withValidation = true;
      }
      if (['select', 'inputCheckbox', 'inputRadio'].indexOf(scope.component.options.type) > -1) {
        scope.modifyComponentOptions = true;
        if (['select', 'inputRadio'].indexOf(scope.component.options.type) > -1) {
          scope.singleDefaultOption = true;
        } else {
          scope.singleDefaultOption = false;
        }
      }

      scope.checkFileUploaderEnable = (type) => {
        return (this._.indexOf(scope.component.options.allowedMimeTypes, type) > -1);
      };
      scope.enableFileUploaderMimeType = (type) => {
        if (type !== 'all') {
          if (this._.indexOf(scope.component.options.allowedMimeTypes, 'all') > -1) {
            scope.component.options.allowedMimeTypes = this._.reject(
              scope.component.options.allowedMimeTypes, (t) => {
              return t === 'all';
            });
          }
          if (this._.indexOf(scope.component.options.allowedMimeTypes, type) > -1) {
            scope.component.options.allowedMimeTypes = this._.reject(
              scope.component.options.allowedMimeTypes, (t) => {
              return t === type;
            });
          } else {
            scope.component.options.allowedMimeTypes.push(type);
          }
        } else {
          scope.component.options.allowedMimeTypes = ['all'];
        }
      };

      scope.removeComponentOptions = (index) => {
        if (scope.component.options.options.length <= 1) {
          return false;
        }
        this.swal(this.swalOption,
        (isConfirm) => {
          if (isConfirm) {
            scope.component.options.options.splice(index, 1);

            this.$timeout(() => {
              scope.$digest();
            });
          }
        })
      };

      scope.addComponentOptions = () => {
        let option = angular.copy(scope.component.options.options[0]);
        this._.each(Object.keys(option), (key) => {
          option[key] = key + (scope.component.options.options.length + 1);
        });
        scope.component.options.options.push(option);
      };

      scope.answer = () => {
        let components = this._.map(angular.copy(this.components), (component) => {
          if (angular.isDefined(component.options.mimeTypes)) {
            delete(component.options.mimeTypes);
          }
          if (angular.isDefined(component.options.validationOptions)) {
            delete(component.options.validationOptions);
          }
          return component;
        });
        this.form = angular.copy(components);
        $mdDialog.hide();
      };
      scope.hide = () => {
        $mdDialog.hide();
      };
      scope.cancel = () => {
        targetScopeVM.options = angular.copy(scope.componentBackup.options);
        $mdDialog.cancel();
      };
    };
    modifyController.$inject = ['scope', '$mdDialog'];

    this.$mdDialog.show({
      controller: modifyController,
      preserveScope: true,
      templateUrl: 'app/views/modifyComponent.html',
      parent: angular.element(this.$document.body),
      fullscreen: true,
      clickOutsideToClose: false,
      escapeToClose: false
    });
  }

  removeComponent (element, targetScope, targetId) {
    this.swal(this.swalOption,
    (isConfirm) => {
      if (isConfirm) {
        this.components = this._.reject(this.components, (component) => {
          return component.id === targetId;
        });

        let components = this._.map(angular.copy(this.components), (component) => {
          if (angular.isDefined(component.options.mimeTypes)) {
            delete(component.options.mimeTypes);
          }
          if (angular.isDefined(component.options.validationOptions)) {
            delete(component.options.validationOptions);
          }
          return component;
        });
        this.form = angular.copy(components);

        targetScope.$destroy();
        element.parent().remove();
        this.$timeout(() => {
          this.$scope.$digest();
        });
      }
    })
  }

  findComponent (id) {
    return this._.find(this.components, (component) => {
      return component.id === id;
    });
  }
  findComponentIndex (id) {
    return this._.findIndex(this.components, { id: id });
  }
  swapComponent (keyA, keyB) {
    this.$log.info(keyA, keyB);
    let indexA = this.findComponentIndex(keyA), indexB = this.findComponentIndex(keyB);
    let temp = angular.copy(this.components[indexA]);
    this.components[indexA] = angular.copy(this.components[indexB]);
    this.components[indexB] = temp;
    this.$timeout(() => {
      this.$scope.$digest();
    });
  }
  guid () {
    let s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    };
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }
}
