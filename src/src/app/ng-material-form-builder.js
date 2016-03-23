/* global _: false, moment: false, swal: false, Flow: false */

import { config } from './config';
import { runBlock } from './runBlock';

import { componentOptionsFactory } from './factory/componentOptions.factory';
import { draggableItemDirective } from './directive/draggable/draggable.directive';
import { droppableItemDirective } from './directive/droppable/droppable.directive';
import { componentsDirective } from './directive/components/components.directive';
import { formDirective } from './directive/form/form.directive';
import { renderDirective } from './directive/render/render.directive';

import { inputTextDirective } from './form/inputText/inputText.directive';
import { inputRadioDirective } from './form/inputRadio/inputRadio.directive';
import { inputCheckboxDirective } from './form/inputCheckbox/inputCheckbox.directive';
import { selectDirective } from './form/select/select.directive';
import { textareaDirective } from './form/textarea/textarea.directive';
import { switchDirective } from './form/switch/switch.directive';
import { datepickerDirective } from './form/datepicker/datepicker.directive';
import { fileUploaderDirective } from './form/fileUploader/fileUploader.directive';

angular.module('ngMaterialFormBuilder', [
    'ngSanitize', 'ngMessages', 'ngAria', 'ngMaterial', 'flow'
  ])
  .constant('_', _)
  .constant('moment', moment)
  .constant('swal', swal)
  .constant('flow', Flow)
  .config(config)
  .run(runBlock)
  .factory('componentOptions', componentOptionsFactory)
  .directive('builderInputText', inputTextDirective)
  .directive('builderRadio', inputRadioDirective)
  .directive('builderCheckbox', inputCheckboxDirective)
  .directive('builderSelect', selectDirective)
  .directive('builderTextarea', textareaDirective)
  .directive('builderSwitch', switchDirective)
  .directive('builderDatepicker', datepickerDirective)
  .directive('builderFileUploader', fileUploaderDirective)
  .directive('draggableItem', draggableItemDirective)
  .directive('droppableItem', droppableItemDirective)
  .directive('ngFormBuilderComponents', componentsDirective)
  .directive('ngFormBuilderForm', formDirective)
  .directive('ngFormBuilderRender', renderDirective);
