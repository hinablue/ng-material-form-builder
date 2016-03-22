export function droppableItemDirective() {
  'ngInject';

  let directive = {
    restrict: 'A',
    scope: {
      drop: '=?droppableItem'
    },
    controller: droppableController,
    controllerAs: 'droppable',
    bindToController: true
  };

  return directive;
}

class droppableController {
  constructor(_, $rootScope, $scope, $compile, $element, $log) {
    'ngInject';

    this.$log = $log;
    this.$scope = $scope;
    this.$rootScope = $rootScope;
    this.$compile = $compile;
    this.position = {};

    let zoneOffsetTop = angular.element('#__droppableZone')[0].offsetTop;
    let form = angular.element('#__formBuilderForm');

    this.dragEnd = $rootScope.$on('ngMaterialFormBuilder::dragEnd', () => {
      $log.info('dragEnd');
      form.removeClass('over');
    });

    let el = $element[0];
    let elOffsetTop = el.offsetTop;

    el.droppable = true;
    el.addEventListener(
      'dragover',
      (e) => {
        e.dataTransfer.dropEffect = 'copyMove';

        let item = _.find(e.path, (item) => {
          return /^(BUILDER\-)/gi.test(item.tagName) && item.id !== '__droppableZone';
        });
        if (angular.isDefined(item)) {
          let target = angular.element(item), components = angular.element('.builder-components');

          components.removeClass('after before');
          if (e.clientY >= zoneOffsetTop + elOffsetTop + item.offsetTop) {
            if (false === target.hasClass('after')) {
              target.addClass('after');
            }
            target.removeClass('before');
            components.removeClass('before');
            this.position = {
              direction: 'after',
              key: item.attributes.getNamedItem('target-id').value.replace(/[']+/gi, '')
            };
          } else {
            if (false === target.hasClass('before')) {
              target.addClass('before');
            }
            target.removeClass('after');
            components.removeClass('after');
            this.position = {
              direction: 'before',
              key: item.attributes.getNamedItem('target-id').value.replace(/[']+/gi, '')
            };
          }
        }
        if (angular.isDefined(e.preventDefault)) {
          e.preventDefault();
        }
      },
      false
    );
    el.addEventListener(
      'dragenter',
      (e) => {
        form.addClass('over');
        if (angular.isDefined(e.preventDefault)) {
          e.preventDefault();
        }
      },
      false
    );
    el.addEventListener(
      'drop',
      (e) => {
        form.removeClass('over');
        angular.element('.builder-components').removeClass('after before');
        angular.element('.droppable-copy-drag-item').removeClass('drag');

        $scope.$apply(() => {
          if (angular.isFunction(this.drop)) {
            this.drop(e.dataTransfer.getData('text/plain'), this.position);
          }
        });
        if (angular.isDefined(e.stopPropagation)) {
          e.stopPropagation();
        }
      },
      false
    );
  }
}
