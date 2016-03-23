export function draggableItemDirective() {
  'ngInject';

  let directive = {
    restrict: 'A',
    scope: {
      target: '=?draggableItem'
    },
    controller: draggableController,
    controllerAs: 'draggable',
    bindToController: true
  };

  return directive;
}

class draggableController {
  constructor($scope, $log, $element) {
    'ngInject';

    let el = $element[0];
    el.draggable = true;
    el.addEventListener(
      'dragstart',
      (e) => {
        e.dataTransfer.effectAllowed = 'copyMove';
        e.dataTransfer.setData('text/plain', this.target);
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

        return false;
      },
      false
    );
    el.addEventListener(
      'dragleave',
      (e) => {
        angular.element('.builder-components').removeClass('after before');

        return false;
      },
      false
    );
  }
}
