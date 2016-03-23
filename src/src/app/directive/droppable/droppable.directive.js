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
  constructor(_, $rootScope, $scope, $document, $compile, $element, $log) {
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

    let el = $element[0], dragOverItem;
    let elOffsetTop = el.offsetTop;

    el.droppable = true;
    el.addEventListener(
      'dragover',
      (e) => {
        e.dataTransfer.dropEffect = 'copyMove';

        // patch: Some browsers event does not have `event.path`, so use e.target.
        let node = e.target;
        while (node !== form[0] && angular.isDefined(node)) {
          if (/^(BUILDER\-)/gi.test(node.tagName) && node.id !== '__droppableZone') {
            dragOverItem = node;
            break;
          } else {
            node = node.parentNode;
          }
        }

        if (angular.isDefined(dragOverItem) && dragOverItem !== e.target) {
          let target = angular.element(dragOverItem), components = angular.element('.builder-components');
          components.removeClass('after before');
          if (e.clientY >= zoneOffsetTop + elOffsetTop + dragOverItem.offsetTop) {
            if (false === target.hasClass('after')) {
              target.addClass('after');
            }
            target.removeClass('before');
            components.removeClass('before');
            this.position = {
              direction: 'after',
              key: dragOverItem.attributes.getNamedItem('target-id').value.replace(/[']+/gi, '')
            };
          } else {
            if (false === target.hasClass('before')) {
              target.addClass('before');
            }
            target.removeClass('after');
            components.removeClass('after');
            this.position = {
              direction: 'before',
              key: dragOverItem.attributes.getNamedItem('target-id').value.replace(/[']+/gi, '')
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
