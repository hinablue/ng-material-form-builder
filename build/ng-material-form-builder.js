angular.module("ngMaterialFormBuilder").run(["$templateCache", function($templateCache) {$templateCache.put("app/views/modifyComponent.html","<md-dialog aria-label=\"Modify component dialog\"><md-toolbar><div class=\"md-toolbar-tools\"><h2>Modify component</h2><span flex=\"\"></span><md-button class=\"md-icon-button\" ng-click=\"cancel()\"><md-icon aria-label=\"Close dialog\">close</md-icon></md-button></div></md-toolbar><md-dialog-content><md-content layout-padding=\"\"><md-content><md-input-container class=\"md-block\"><label>Label</label> <input type=\"text\" ng-model=\"component.options.label\"></md-input-container><md-input-container class=\"md-block\"><label>Placeholder</label> <input type=\"text\" ng-model=\"component.options.placeholder\"></md-input-container><md-input-container class=\"md-block\"><label>Description</label> <input type=\"text\" ng-model=\"component.options.description\"></md-input-container><md-checkbox ng-model=\"component.options.required\" aria-label=\"Required\"><span class=\"md-subhead\">Required</span></md-checkbox><md-checkbox ng-model=\"component.options.enableValidation\" aria-label=\"Enable Validatoin\" ng-if=\"withValidation\"><span class=\"md-subhead\">Enable Validation</span></md-checkbox></md-content><md-content ng-if=\"component.options.type === \'fileUploader\'\"><md-content><p class=\"md-subhead\">Allow File MimeType</p><section layout=\"row\" layout-wrap=\"\" layout-fill=\"\" layout-align=\"start center\"><md-content flex=\"10\" ng-repeat=\"(key, type) in component.options.mimeTypes track by $index\"><md-checkbox ng-checked=\"checkFileUploaderEnable(key)\" ng-click=\"enableFileUploaderMimeType(key)\" aria-label=\"{{ key }}\"><span ng-bind=\"key\"></span></md-checkbox></md-content></section></md-content><br><md-switch ng-model=\"component.options.flow.singleFile\" ng-true-value=\"false\" ng-false-value=\"true\"><span class=\"md-subhead\">Multiple Files Upload.</span></md-switch><br><md-input-container class=\"md-block\"><label>File Size Limit (MB)</label> <input type=\"number\" ng-model=\"component.options.fileSizeLimit\"></md-input-container><md-checkbox ng-model=\"component.options.enableImagePreview\" aria-label=\"Enable Image Preview\"><span class=\"md-subhead\">Enable Image Preview (Only for jpg, gif, png)</span></md-checkbox><md-content ng-if=\"!!component.options.enableImagePreview\"><md-input-container class=\"md-block\"><label>Image Preview width</label> <input type=\"text\" ng-model=\"component.options.preview.width\"></md-input-container><md-input-container class=\"md-block\"><label>Image Preview width</label> <input type=\"text\" ng-model=\"component.options.preview.height\"></md-input-container></md-content></md-content><md-content ng-if=\"component.options.type === \'switch\'\"><md-input-container class=\"md-block\"><label>Switch On Value</label> <input type=\"text\" ng-model=\"component.options.on\"></md-input-container><md-input-container class=\"md-block\"><label>Switch Off Value</label> <input type=\"text\" ng-model=\"component.options.off\"></md-input-container></md-content><md-content ng-if=\"modifyComponentOptions\"><md-content ng-repeat=\"option in component.options.options track by $index\"><md-content layout=\"row\" layout-fill=\"\" layout-align=\"start center\"><div flex=\"70\"><p class=\"md-subhead\">{{ \'Option \' + ($index + 1) }}</p></div><div flex=\"30\" layout=\"row\"><div flex=\"30\"><md-button class=\"md-icon-button md-accent md-primary\" ng-disabled=\"$first\" ng-click=\"moveComponentOptionsToPrevious($index)\" aria-label=\"Move option to previos\"><md-icon>expand_less</md-icon></md-button></div><div flex=\"30\"><md-button class=\"md-icon-button md-accent md-primary\" ng-disabled=\"$last\" ng-click=\"moveComponentOptionsToNext($index)\" aria-label=\"Move option to next\"><md-icon>expand_more</md-icon></md-button></div><div flex=\"30\"><md-button class=\"md-icon-button md-accent md-hue-2\" ng-disabled=\"component.options.options.length <= 1\" ng-click=\"removeComponentOptions($index)\" aria-label=\"Remove radio options\"><md-icon>delete</md-icon></md-button></div></div></md-content><md-content layout=\"row\" layout-fill=\"\" layout-align=\"start center\"><md-input-container flex=\"40\" class=\"md-block\"><label>Name</label> <input type=\"text\" ng-model=\"option.name\"></md-input-container><md-input-container flex=\"30\" class=\"md-block\"><label>Value</label> <input type=\"text\" ng-model=\"option.value\"></md-input-container><md-radio-group flex=\"20\" ng-model=\"component.options.default\" ng-if=\"singleDefaultOption === true\"><md-radio-button value=\"{{ option.value }}\">Default</md-radio-button></md-radio-group><md-content flex=\"20\" ng-if=\"singleDefaultOption === false\"><md-checkbox ng-model=\"option.checked\" aria-label=\"{{ option.name }}\">Default</md-checkbox></md-content></md-content></md-content><md-button class=\"md-raised md-primary md-hue-1\" ng-click=\"addComponentOptions()\" aria-label=\"Add new radio options\"><span>Add option</span></md-button></md-content><md-content ng-if=\"!!component.options.enableValidation && withValidation && component.options.type === \'datepicker\'\"><p>Min Date</p><md-datepicker ng-model=\"component.options.minDate\" aria-label=\"Enter Date\" md-placeholder=\"Enter Date\"></md-datepicker><p>Max Date</p><md-datepicker ng-model=\"component.options.maxDate\" md-min-date=\"component.options.minDate\" aria-label=\"Enter Date\" md-placeholder=\"Enter Date\"></md-datepicker></md-content><md-content ng-if=\"!!component.options.enableValidation && withValidation && component.options.type !== \'datepicker\'\"><md-input-container class=\"md-block\"><label>Max Length</label> <input type=\"text\" ng-model=\"component.options.maxLength\"></md-input-container><md-input-container class=\"md-block\"><label>Min Length</label> <input type=\"text\" ng-model=\"component.options.minLength\"></md-input-container><md-input-container class=\"md-block\" ng-if=\"component.options.type === \'inputText\'\"><label>Value Type</label><md-select ng-model=\"component.options.pattern\"><md-option ng-repeat=\"opt in component.options.validationOptions\" value=\"{{ opt.rule }}\"><span ng-bind=\"opt.label\"></span></md-option></md-select></md-input-container></md-content></md-content></md-dialog-content><md-dialog-actions><span flex=\"\"></span><md-button class=\"md-raised\" ng-click=\"cancel()\" aria-label=\"Cancel\">Cancel</md-button><md-button class=\"md-raised md-accent\" ng-click=\"answer()\" aria-label=\"Save\">Save</md-button></md-dialog-actions></md-dialog>");
$templateCache.put("app/directive/components/components.html","<md-content><form name=\"formBuilderForm\"><div draggable-item=\"\'inputText\'\"><builder-input-text disabled=\"true\"></builder-input-text></div><div draggable-item=\"\'select\'\"><builder-select disabled=\"true\"></builder-select></div><div draggable-item=\"\'inputCheckbox\'\"><builder-checkbox disabled=\"true\"></builder-checkbox></div><div draggable-item=\"\'inputRadio\'\"><builder-radio disabled=\"true\"></builder-radio></div><div draggable-item=\"\'textarea\'\"><builder-textarea disabled=\"true\"></builder-textarea></div><div draggable-item=\"\'switch\'\"><builder-switch disabled=\"true\"></builder-switch></div><div draggable-item=\"\'datepicker\'\"><builder-datepicker disabled=\"true\"></builder-datepicker></div><div draggable-item=\"\'fileUploader\'\"><builder-file-uploader disabled=\"true\"></builder-file-uploader></div></form></md-content>");
$templateCache.put("app/directive/form/form.html","<md-content id=\"__droppableZone\" droppable-item=\"form.handlerDrop\"><form name=\"{{ form.formName }}\" id=\"__formBuilderForm\"></form></md-content>");
$templateCache.put("app/directive/render/render.html","");
$templateCache.put("app/form/datepicker/datepicker.html","<md-content id=\"{{ vm.targetId }}\" layout=\"row\" layout-fill=\"\" layout-padding=\"\" layout-align=\"start start\"><md-content flex=\"{{ !!vm.editable ? 75 : 100 }}\" class=\"md-block datepicker-errors-advanced\"><p ng-class=\"{ \'required-field\' : vm.options.required, disabled: !!vm.disabled }\"><span ng-bind=\"vm.options.label\"></span><span ng-if=\"vm.options.required\">&nbsp;*</span></p><md-datepicker ng-model=\"vm.options.value\" ng-required=\"vm.options.required\" md-min-date=\"vm.options.options.minDate\" md-max-date=\"vm.options.options.maxDate\" aria-label=\"{{ vm.options.placeholder }}\" md-placeholder=\"{{ vm.options.placeholder }}\" ng-disabled=\"vm.disabled\"></md-datepicker><div class=\"hint\"><span ng-bind=\"vm.options.description\"></span></div><div ng-messages=\"$parent[$parent.formName][vm.options.name].$error\" role=\"alert\"><div ng-message=\"valid\"><span ng-bind=\"vm.options.validation.valid\"></span></div><div ng-message=\"required\"><span ng-bind=\"vm.options.validation.required\"></span></div><div ng-message=\"mindate\"><span ng-bind=\"vm.options.validation.minDate\"></span></div><div ng-message=\"maxdate\"><span ng-bind=\"vm.options.validation.maxDate\"></span></div></div></md-content><section flex=\"25\" layout=\"column\" layout-fill=\"\" layout-align=\"center center\" ng-if=\"!!vm.editable\"><div flex=\"\"><md-button class=\"md-fab md-mini md-primary md-hue-1\" ng-click=\"vm.modifyComponent()\" aria-label=\"Edit field\"><md-icon>edit</md-icon></md-button></div><div flex=\"\"><md-button class=\"md-fab md-mini md-accent md-hue-2\" ng-click=\"vm.removeComponent()\" aria-label=\"Remove field\"><md-icon>delete</md-icon></md-button></div></section></md-content>");
$templateCache.put("app/form/fileUploader/fileUploader.html","<md-content id=\"{{ vm.targetId }}\" layout=\"row\" flow-prevent-drop=\"\" layout-fill=\"\" layout-padding=\"\" layout-align=\"start start\"><md-content flex=\"{{ !!vm.editable ? 75 : 100 }}\" class=\"md-block input-errors-advanced\" flow-init=\"\" flow-object=\"vm.uploaderFlow\"><p ng-class=\"{ \'required-field\' : vm.options.required, disabled: !!vm.disabled }\"><span ng-bind=\"vm.options.label\"></span><span ng-if=\"vm.options.required\">&nbsp;*</span></p><md-list class=\"prepare-upload-files\" ng-if=\"vm.uploaderFlow.files.length > 0\"><md-list-item class=\"prepare-upload-file\" ng-repeat=\"file in vm.uploaderFlow.files track by $index\"><img class=\"preview-image md-block\" flow-img=\"file\" ng-if=\"file.file.type.substr(0, 5) === \'image\' && vm.options.enableImagePreview && [\'jpg\',\'peg\',\'png\',\'gif\'].indexOf(file.file.type.substr(-3)) > -1\" ng-style=\"{ width: vm.options.preview.width, height: vm.options.preview.height }\" alt=\"Preview Image\"><md-content class=\"md-block\"><span ng-bind=\"file.name\"></span><md-icon class=\"md-secondary\" ng-click=\"vm.uploaderFlow.removeFile(file)\" aria-label=\"vm._(\'Remove file button.\')\">close</md-icon></md-content></md-list-item></md-list><md-content class=\"__uploader-drag-and-drop\" id=\"flow-{{ !!vm.editable || !!vm.disabled ? \'\' : vm.targetId }}\"><span class=\"disabled\">Drag and drop files or click here to upload.</span></md-content><div class=\"hint uploader\"><span ng-bind=\"vm.options.description\"></span></div><div ng-messages=\"$parent[$parent.formName][vm.options.name].$error\" role=\"alert\"><div ng-message=\"vaild\"><span ng-bind=\"vm.options.validation.required\"></span></div><div ng-message=\"required\"><span ng-bind=\"vm.options.validation.required\"></span></div></div></md-content><section flex=\"25\" layout=\"column\" layout-fill=\"\" layout-align=\"center center\" ng-if=\"!!vm.editable\"><div flex=\"\"><md-button class=\"md-fab md-mini md-primary md-hue-1\" ng-click=\"vm.modifyComponent()\" aria-label=\"Edit field\"><md-icon>edit</md-icon></md-button></div><div flex=\"\"><md-button class=\"md-fab md-mini md-accent md-hue-2\" ng-click=\"vm.removeComponent()\" aria-label=\"Remove field\"><md-icon>delete</md-icon></md-button></div></section></md-content>");
$templateCache.put("app/form/inputCheckbox/inputCheckbox.html","<md-content id=\"{{ vm.targetId }}\" layout=\"row\" layout-fill=\"\" layout-padding=\"\" layout-align=\"start start\"><md-content flex=\"{{ !!vm.editable ? 75 : 100 }}\" class=\"md-block checkbox-errors-advanced\"><p ng-class=\"{ \'required-field\' : vm.options.required, disabled: !!vm.disabled }\"><span ng-bind=\"vm.options.label\"></span><span ng-if=\"vm.options.required\">&nbsp;*</span></p><md-checkbox ng-model=\"option.checked\" aria-label=\"{{ option.name }}\" ng-repeat=\"option in vm.options.options track by $index\" ng-disabled=\"vm.disabled\"><span ng-bind=\"option.name\"></span></md-checkbox><div class=\"hint\"><span ng-bind=\"vm.options.description\"></span></div><div ng-messages=\"$parent[$parent.formName][vm.options.name].$error\" role=\"alert\"><div ng-message=\"required\"><span ng-bind=\"vm.options.validation.required\"></span></div></div></md-content><section flex=\"25\" layout=\"column\" layout-fill=\"\" layout-align=\"center center\" ng-if=\"!!vm.editable\"><div flex=\"\"><md-button class=\"md-fab md-mini md-primary md-hue-1\" ng-click=\"vm.modifyComponent()\" aria-label=\"Edit field\"><md-icon>edit</md-icon></md-button></div><div flex=\"\"><md-button class=\"md-fab md-mini md-accent md-hue-2\" ng-click=\"vm.removeComponent()\" aria-label=\"Remove field\"><md-icon>delete</md-icon></md-button></div></section></md-content>");
$templateCache.put("app/form/inputRadio/inputRadio.html","<md-content id=\"{{ vm.targetId }}\" layout=\"row\" layout-fill=\"\" layout-padding=\"\" layout-align=\"start start\"><md-content flex=\"{{ !!vm.editable ? 75 : 100 }}\" class=\"md-block radio-errors-advanced\"><p ng-class=\"{ \'required-field\' : vm.options.required, disabled: !!vm.disabled }\"><span ng-bind=\"vm.options.label\"></span><span ng-if=\"vm.options.required\">&nbsp;*</span></p><md-radio-group ng-model=\"vm.options.value\" ng-required=\"vm.options.required\"><md-radio-button ng-repeat=\"option in vm.options.options track by $index\" ng-value=\"option.value\" aria-label=\"option.name\" ng-disabled=\"vm.disabled\"><span ng-bind=\"option.name\"></span></md-radio-button></md-radio-group><div class=\"hint\"><span ng-bind=\"vm.options.description\"></span></div><div ng-messages=\"$parent[$parent.formName][vm.options.name].$error\" role=\"alert\"><div ng-message=\"required\"><span ng-bind=\"vm.options.validation.required\"></span></div></div></md-content><section flex=\"25\" layout=\"column\" layout-fill=\"\" layout-align=\"center center\" ng-if=\"!!vm.editable\"><div flex=\"\"><md-button class=\"md-fab md-mini md-primary md-hue-1\" ng-click=\"vm.modifyComponent()\" aria-label=\"Edit field\"><md-icon>edit</md-icon></md-button></div><div flex=\"\"><md-button class=\"md-fab md-mini md-accent md-hue-2\" ng-click=\"vm.removeComponent()\" aria-label=\"Remove field\"><md-icon>delete</md-icon></md-button></div></section></md-content>");
$templateCache.put("app/form/inputText/inputText.html","<md-content id=\"{{ vm.targetId }}\" layout=\"row\" layout-fill=\"\" layout-padding=\"\" layout-align=\"start start\"><md-input-container flex=\"{{ !!vm.editable ? 75 : 100 }}\" class=\"md-block input-errors-advanced\"><label ng-class=\"{ \'required-field\' : vm.options.required, disabled: !!vm.disabled }\"><span ng-bind=\"vm.options.label\"></span><span ng-if=\"vm.options.required\">&nbsp;*</span></label> <input type=\"text\" name=\"{{ vm.targetId }}\" ng-model=\"vm.options.value\" ng-required=\"vm.options.required\" ng-maxlength=\"vm.options.maxLength\" ng-minlength=\"vm.options.minLength\" ng-pattern=\"vm.options.pattern\" placeholder=\"{{ vm.options.placeholder }}\" ng-disabled=\"vm.disabled\"><div class=\"hint\"><span ng-bind=\"vm.options.description\"></span></div><div ng-messages=\"$parent[$parent.formName][vm.options.name].$error\" role=\"alert\"><div ng-message=\"required\"><span ng-bind=\"vm.options.validation.required\"></span></div><div ng-message=\"maxlength\"><span ng-bind=\"vm.options.validation.maxLength\"></span></div><div ng-message=\"minlength\"><span ng-bind=\"vm.options.validation.minLength\"></span></div><div ng-message=\"pattern\"><span ng-bind=\"vm.options.validation.pattern\"></span></div></div></md-input-container><section flex=\"25\" layout=\"column\" layout-fill=\"\" layout-align=\"center center\" ng-if=\"!!vm.editable\"><div flex=\"\"><md-button class=\"md-fab md-mini md-primary md-hue-1\" ng-click=\"vm.modifyComponent()\" aria-label=\"Edit field\"><md-icon>edit</md-icon></md-button></div><div flex=\"\"><md-button class=\"md-fab md-mini md-accent md-hue-2\" ng-click=\"vm.removeComponent()\" aria-label=\"Remove field\"><md-icon>delete</md-icon></md-button></div></section></md-content>");
$templateCache.put("app/form/select/select.html","<md-content id=\"{{ vm.targetId }}\" layout=\"row\" layout-fill=\"\" layout-padding=\"\" layout-align=\"start start\"><md-input-container flex=\"{{ !!vm.editable ? 75 : 100 }}\" class=\"md-block select-errors-advanced\"><label ng-class=\"{ \'required-field\' : vm.options.required }\"><span ng-bind=\"vm.options.label\"></span><span ng-if=\"vm.options.required\">&nbsp;*</span></label><md-select name=\"{{ vm.targetId }}\" ng-model=\"vm.options.value\" ng-required=\"vm.options.required\" ng-disabled=\"vm.disabled\"><md-option ng-repeat=\"option in vm.options.options\" value=\"{{ option.value }}\"><span ng-bind=\"option.name\"></span></md-option></md-select><div class=\"hint\"><span ng-bind=\"vm.options.description\"></span></div><div ng-messages=\"$parent[$parent.formName][vm.options.name].$error\" role=\"alert\"><div ng-message=\"required\"><span ng-bind=\"vm.options.validation.required\"></span></div></div></md-input-container><section flex=\"25\" layout=\"column\" layout-fill=\"\" layout-align=\"center center\" ng-if=\"!!vm.editable\"><div flex=\"\"><md-button class=\"md-fab md-mini md-primary md-hue-1\" ng-click=\"vm.modifyComponent()\" aria-label=\"Edit field\"><md-icon>edit</md-icon></md-button></div><div flex=\"\"><md-button class=\"md-fab md-mini md-accent md-hue-2\" ng-click=\"vm.removeComponent()\" aria-label=\"Remove field\"><md-icon>delete</md-icon></md-button></div></section></md-content>");
$templateCache.put("app/form/switch/switch.html","<md-content id=\"{{ vm.targetId }}\" layout=\"row\" layout-fill=\"\" layout-padding=\"\" layout-align=\"start start\"><md-content flex=\"{{ !!vm.editable ? 75 : 100 }}\" class=\"md-block switch-errors-advanced\"><md-switch ng-model=\"vm.options.value\" aria-label=\"{{ vm.options.label }}\" ng-required=\"vm.options.required\" ng-disabled=\"vm.disabled\"><p ng-class=\"{ \'required-field\' : vm.options.required, disabled: !!vm.disabled }\"><span ng-bind=\"vm.options.label\"></span><span ng-if=\"vm.options.required\">&nbsp;*</span></p></md-switch><div class=\"hint\"><span ng-bind=\"vm.options.description\"></span></div><div ng-messages=\"$parent[$parent.formName][vm.options.name].$error\" role=\"alert\"><div ng-message=\"required\"><span ng-bind=\"vm.options.validation.required\"></span></div></div></md-content><section flex=\"25\" layout=\"column\" layout-fill=\"\" layout-align=\"center center\" ng-if=\"!!vm.editable\"><div flex=\"\"><md-button class=\"md-fab md-mini md-primary md-hue-1\" ng-click=\"vm.modifyComponent()\" aria-label=\"Edit field\"><md-icon>edit</md-icon></md-button></div><div flex=\"\"><md-button class=\"md-fab md-mini md-accent md-hue-2\" ng-click=\"vm.removeComponent()\" aria-label=\"Remove field\"><md-icon>delete</md-icon></md-button></div></section></md-content>");
$templateCache.put("app/form/textarea/textarea.html","<md-content id=\"{{ vm.targetId }}\" layout=\"row\" layout-fill=\"\" layout-padding=\"\" layout-align=\"start start\"><md-input-container flex=\"{{ !!vm.editable ? 75 : 100 }}\" class=\"md-block textarea-errors-advanced\"><label ng-class=\"{ \'required-field\' : vm.options.required, disabled: !!vm.disabled }\"><span ng-bind=\"vm.options.label\"></span><span ng-if=\"vm.options.required\">&nbsp;*</span></label> <textarea class=\"md-textarea\" name=\"{{ vm.targetId }}\" ng-model=\"vm.options.value\" ng-required=\"vm.options.required\" ng-maxlength=\"vm.options.maxLength\" md-maxlength=\"vm.options.maxLength\" ng-minlength=\"vm.options.minLength\" rows=\"10\" placeholder=\"{{ vm.options.placeholder }}\" ng-disabled=\"vm.disabled\" md-select-on-focus=\"\"></textarea><div class=\"hint\"><span ng-bind=\"vm.options.description\"></span></div><div ng-messages=\"$parent[$parent.formName][vm.options.name].$error\" role=\"alert\"><div ng-message=\"required\"><span ng-bind=\"vm.options.validation.required\"></span></div><div ng-message=\"maxlength\"><span ng-bind=\"vm.options.validation.maxLength\"></span></div><div ng-message=\"minlength\"><span ng-bind=\"vm.options.validation.minLength\"></span></div></div></md-input-container><section flex=\"25\" layout=\"column\" layout-fill=\"\" layout-align=\"center center\" ng-if=\"!!vm.editable\"><div flex=\"\"><md-button class=\"md-fab md-mini md-primary md-hue-1\" ng-click=\"vm.modifyComponent()\" aria-label=\"Edit field\"><md-icon>edit</md-icon></md-button></div><div flex=\"\"><md-button class=\"md-fab md-mini md-accent md-hue-2\" ng-click=\"vm.removeComponent()\" aria-label=\"Remove field\"><md-icon>delete</md-icon></md-button></div></section></md-content>");}]);
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* global _: false, moment: false, swal: false */

	'use strict';

	var _config = __webpack_require__(1);

	var _runBlock = __webpack_require__(2);

	var _factoryComponentOptionsFactory = __webpack_require__(3);

	var _directiveDraggableDraggableDirective = __webpack_require__(4);

	var _directiveDroppableDroppableDirective = __webpack_require__(5);

	var _directiveComponentsComponentsDirective = __webpack_require__(6);

	var _directiveFormFormDirective = __webpack_require__(7);

	var _directiveRenderRenderDirective = __webpack_require__(8);

	var _formInputTextInputTextDirective = __webpack_require__(9);

	var _formInputRadioInputRadioDirective = __webpack_require__(10);

	var _formInputCheckboxInputCheckboxDirective = __webpack_require__(11);

	var _formSelectSelectDirective = __webpack_require__(12);

	var _formTextareaTextareaDirective = __webpack_require__(13);

	var _formSwitchSwitchDirective = __webpack_require__(14);

	var _formDatepickerDatepickerDirective = __webpack_require__(15);

	var _formFileUploaderFileUploaderDirective = __webpack_require__(16);

	angular.module('ngMaterialFormBuilder', ['ngSanitize', 'ngMessages', 'ngAria', 'ngMaterial', 'flow']).constant('_', _).constant('moment', moment).constant('swal', swal).constant('flow', Flow).config(_config.config).run(_runBlock.runBlock).factory('componentOptions', _factoryComponentOptionsFactory.componentOptionsFactory).directive('builderInputText', _formInputTextInputTextDirective.inputTextDirective).directive('builderRadio', _formInputRadioInputRadioDirective.inputRadioDirective).directive('builderCheckbox', _formInputCheckboxInputCheckboxDirective.inputCheckboxDirective).directive('builderSelect', _formSelectSelectDirective.selectDirective).directive('builderTextarea', _formTextareaTextareaDirective.textareaDirective).directive('builderSwitch', _formSwitchSwitchDirective.switchDirective).directive('builderDatepicker', _formDatepickerDatepickerDirective.datepickerDirective).directive('builderFileUploader', _formFileUploaderFileUploaderDirective.fileUploaderDirective).directive('draggableItem', _directiveDraggableDraggableDirective.draggableItemDirective).directive('droppableItem', _directiveDroppableDroppableDirective.droppableItemDirective).directive('ngFormBuilderComponents', _directiveComponentsComponentsDirective.componentsDirective).directive('ngFormBuilderForm', _directiveFormFormDirective.formDirective).directive('ngFormBuilderRender', _directiveRenderRenderDirective.renderDirective);

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	config.$inject = ["$logProvider"];
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.config = config;

	function config($logProvider) {
	  'ngInject';

	  // Enable log
	  $logProvider.debugEnabled(true);
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	runBlock.$inject = ["$log"];
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.runBlock = runBlock;

	function runBlock($log) {
	  'ngInject';

	  $log.info('run!');
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.componentOptionsFactory = componentOptionsFactory;

	function componentOptionsFactory() {
	  return {
	    inputText: {
	      name: 'inputText',
	      label: 'Label',
	      type: 'inputText',
	      description: 'Description about this field here...',
	      value: '',
	      maxLength: 99999999,
	      minLength: 0,
	      placeholder: 'Fill some text here...',
	      required: false,
	      validation: {
	        required: '123123',
	        maxLength: '123123',
	        minLength: '123123',
	        pattern: '123123123'
	      },
	      enableValidation: false,
	      validationOptions: [{
	        label: 'None',
	        rule: '/.*/'
	      }, {
	        label: 'Number',
	        rule: '/\d+/'
	      }, {
	        label: 'Email',
	        rule: '/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/'
	      }, {
	        label: 'URL',
	        rule: 'https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)'
	      }],
	      pattern: ''
	    },
	    fileUploader: {
	      name: 'fileUploader',
	      label: 'fileUploader',
	      type: 'fileUploader',
	      description: 'Description about this field here...',
	      value: '',
	      maxLength: 99999999,
	      minLength: 0,
	      placeholder: 'Fill some text here...',
	      required: false,
	      validation: {
	        required: '123123',
	        vaild: '123'
	      },
	      preview: {
	        width: 500,
	        height: 'auto'
	      },
	      fileSizeLimit: 2,
	      flow: {
	        target: './',
	        singleFile: false,
	        chunkSize: 1 * 1024 * 1024,
	        forceChunkSize: false,
	        simultaneousUploads: 3,
	        fileParameterName: 'file',
	        query: {},
	        headers: {},
	        withCredentials: false,
	        method: 'multipart',
	        testMethod: 'GET',
	        uploadMethod: 'POST',
	        allowDuplicateUploads: false,
	        prioritizeFirstAndLastChunk: false,
	        testChunks: false,
	        // preprocess: null,
	        // initFileFn: null,
	        // readFileFn: null,
	        // generateUniqueIdentifier: null,
	        maxChunkRetries: 0,
	        chunkRetryInterval: undefined,
	        progressCallbacksInterval: 500,
	        speedSmoothingFactor: 0.02,
	        progressCallbacksInterval: 0.1,
	        successStatuses: [200, 201, 202],
	        permanentErrors: [404, 415, 500, 501]
	      },
	      mimeTypes: {
	        'all': '*/*',
	        'jpg': 'image/jpeg',
	        'png': 'image/png',
	        'gif': 'image/gif',
	        'tiff': 'image/tiff',
	        'webp': 'image/webp',
	        'svg': 'image/svg+xml',
	        'csv': 'text/csv',
	        'txt': 'text/plain',
	        'text': 'text/plain',
	        'xml': 'text/xml',
	        'pdf': 'application/pdf',
	        'doc': 'application/msword',
	        'xls': 'application/vnd.ms-excel',
	        'swf': 'application/x-shockwave-flash',
	        'ppt': 'application/vnd.ms-powerpoint',
	        'mpg': ['audio/mpeg', 'video/mpeg'],
	        'mpeg': ['audio/mpeg', 'video/mpeg'],
	        'mp3': ['audio/mpeg', 'audio/mp3', 'audio/mpeg3', 'audio/x-mpeg-3', 'video/mpeg', 'video/x-mpeg'],
	        'ogg': ['audio/ogg', 'application/ogg'],
	        'm4a': 'audio/x-m4a',
	        'wma': 'audio/x-ms-wma',
	        '3gp': 'video/3gpp',
	        'mp4': 'video/mp4',
	        'avi': 'video/avi',
	        'wmv': 'video/x-ms-wmv',
	        'dvi': 'application/x-dvi',
	        'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
	        'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
	        'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
	        'ai': 'application/postscript',
	        'ps': 'application/postscript',
	        'eps': 'application/postscript',
	        'psd': 'image/vnd.adobe.photoshop'
	      },
	      allowedMimeTypes: ['all'],
	      enableImagePreview: true,
	      events: {}
	    },
	    select: {
	      name: 'select',
	      label: 'Select',
	      type: 'select',
	      description: 'Description about this field here...',
	      value: '',
	      placeholder: 'Fill some text here...',
	      required: false,
	      'default': '',
	      options: [{
	        name: 'option 1',
	        value: 'value 1'
	      }, {
	        name: 'option 2',
	        value: 'value 2'
	      }],
	      validation: {
	        required: '123123'
	      }
	    },
	    inputRadio: {
	      name: 'inputRadio',
	      label: 'Radio',
	      type: 'inputRadio',
	      description: 'Description about this field here...',
	      value: '',
	      placeholder: 'Fill some text here...',
	      required: false,
	      'default': '',
	      options: [{
	        name: 'option 1',
	        value: 'value 1'
	      }, {
	        name: 'option 2',
	        value: 'value 2'
	      }],
	      validation: {
	        required: '123123'
	      }
	    },
	    inputCheckbox: {
	      name: 'inputCheckbox',
	      label: 'Checkbox',
	      type: 'inputCheckbox',
	      description: 'Description about this field here...',
	      value: [],
	      placeholder: 'Fill some text here...',
	      required: false,
	      'default': [],
	      options: [{
	        name: 'option 1',
	        value: 'value 1',
	        checked: true
	      }, {
	        name: 'option 2',
	        value: 'value 2',
	        checked: false
	      }],
	      validation: {
	        required: '123123'
	      }
	    },
	    textarea: {
	      name: 'textarea',
	      label: 'Textarea',
	      type: 'textarea',
	      description: 'Description about this field here...',
	      value: '',
	      maxLength: 0,
	      minLength: 0,
	      placeholder: 'Fill some text here...',
	      required: false,
	      validation: {
	        required: '123123',
	        maxLength: '123123',
	        minLength: '123123'
	      },
	      enableValidation: false
	    },
	    'switch': {
	      name: 'switch',
	      label: 'Switch',
	      type: 'switch',
	      description: 'Description about this field here...',
	      value: false,
	      placeholder: 'Fill some text here...',
	      required: false,
	      on: 'Yes',
	      off: 'No',
	      validation: {
	        required: '123123'
	      }
	    },
	    datepicker: {
	      name: 'datepicker',
	      label: 'Datepicker',
	      type: 'datepicker',
	      description: 'Description about this field here...',
	      value: '',
	      placeholder: 'Pick Date',
	      required: false,
	      maxDate: '',
	      minDate: '',
	      enableValidation: false,
	      validation: {
	        required: '123123',
	        vaild: '123123',
	        minDate: '123',
	        maxDate: '123'
	      }
	    }
	  };
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.draggableItemDirective = draggableItemDirective;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function draggableItemDirective() {
	  'ngInject';

	  var directive = {
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

	var draggableController = function draggableController($scope, $rootScope, $element) {
	  'ngInject';

	  var _this = this;

	  _classCallCheck(this, draggableController);

	  var el = $element[0];
	  el.draggable = true;
	  el.addEventListener('dragstart', function (e) {
	    e.dataTransfer.effectAllowed = 'copyMove';
	    e.dataTransfer.setData('text/plain', _this.target);
	    e.target.classList.add('drag');
	    e.target.style.opacity = 0.99;

	    return false;
	  }, false);
	  el.addEventListener('dragend', function (e) {
	    e.target.classList.remove('drag');
	    e.target.style.opacity = 1;
	    angular.element('.builder-components').removeClass('after before');
	    $rootScope.$emit('ngMaterialFormBuilder::dragEnd', {});

	    return false;
	  }, false);
	  el.addEventListener('dragleave', function (e) {
	    e.target.classList.remove('drag');
	    e.target.style.opacity = 1;
	    angular.element('.builder-components').removeClass('after before');

	    return false;
	  }, false);
	};
	draggableController.$inject = ["$scope", "$rootScope", "$element"];

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.droppableItemDirective = droppableItemDirective;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function droppableItemDirective() {
	  'ngInject';

	  var directive = {
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

	var droppableController = function droppableController(_, $rootScope, $scope, $compile, $element, $log) {
	  'ngInject';

	  var _this = this;

	  _classCallCheck(this, droppableController);

	  this.$log = $log;
	  this.$scope = $scope;
	  this.$rootScope = $rootScope;
	  this.$compile = $compile;
	  this.position = {};

	  var zoneOffsetTop = angular.element('#__droppableZone')[0].offsetTop;
	  var form = angular.element('#__formBuilderForm');

	  this.dragEnd = $rootScope.$on('ngMaterialFormBuilder::dragEnd', function () {
	    $log.info('dragEnd');
	    form.removeClass('over');
	  });

	  var el = $element[0];
	  var elOffsetTop = el.offsetTop;

	  el.droppable = true;
	  el.addEventListener('dragover', function (e) {
	    e.dataTransfer.dropEffect = 'copyMove';

	    var item = _.find(e.path, function (item) {
	      return (/^(BUILDER\-)/gi.test(item.tagName) && item.id !== '__droppableZone'
	      );
	    });
	    if (angular.isDefined(item)) {
	      var target = angular.element(item),
	          components = angular.element('.builder-components');

	      components.removeClass('after before');
	      if (e.clientY >= zoneOffsetTop + elOffsetTop + item.offsetTop) {
	        if (false === target.hasClass('after')) {
	          target.addClass('after');
	        }
	        target.removeClass('before');
	        components.removeClass('before');
	        _this.position = {
	          direction: 'after',
	          key: item.attributes.getNamedItem('target-id').value.replace(/[']+/gi, '')
	        };
	      } else {
	        if (false === target.hasClass('before')) {
	          target.addClass('before');
	        }
	        target.removeClass('after');
	        components.removeClass('after');
	        _this.position = {
	          direction: 'before',
	          key: item.attributes.getNamedItem('target-id').value.replace(/[']+/gi, '')
	        };
	      }
	    }
	    if (angular.isDefined(e.preventDefault)) {
	      e.preventDefault();
	    }
	  }, false);
	  el.addEventListener('dragenter', function (e) {
	    form.addClass('over');
	    if (angular.isDefined(e.preventDefault)) {
	      e.preventDefault();
	    }
	  }, false);
	  el.addEventListener('drop', function (e) {
	    form.removeClass('over');
	    angular.element('.builder-components').removeClass('after before');
	    angular.element('.droppable-copy-drag-item').removeClass('drag');

	    $scope.$apply(function () {
	      if (angular.isFunction(_this.drop)) {
	        _this.drop(e.dataTransfer.getData('text/plain'), _this.position);
	      }
	    });
	    if (angular.isDefined(e.stopPropagation)) {
	      e.stopPropagation();
	    }
	  }, false);
	};
	droppableController.$inject = ["_", "$rootScope", "$scope", "$compile", "$element", "$log"];

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.componentsDirective = componentsDirective;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function componentsDirective() {
	  'ngInject';

	  var directive = {
	    restrict: 'E',
	    templateUrl: 'app/directive/components/components.html',
	    transclude: true,
	    link: function link(scope, element, attrs, ctrl, transclude) {
	      var cloneElement = undefined,
	          cloneScope = undefined;
	      scope.$watch(attrs, function (newAttrs) {
	        if (angular.isDefined(cloneElement)) {
	          cloneElement.remove();
	          cloneElement = undefined;
	          cloneScope.$destroy();
	          cloneScope = undefined;
	        }
	        cloneScope = scope.$new();
	        cloneElement = transclude(cloneScope, function injectClonedElement(clone) {
	          element.after(clone);
	        });
	      });
	    },
	    scope: true,
	    controller: componentsController,
	    controllerAs: 'components',
	    bindToController: true
	  };

	  return directive;
	}

	var componentsController = function componentsController($log, _, $scope) {
	  'ngInject';

	  _classCallCheck(this, componentsController);

	  this.$log = $log;
	  this._ = _;
	  this.$scope = $scope;
	};
	componentsController.$inject = ["$log", "_", "$scope"];

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	exports.formDirective = formDirective;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function formDirective() {
	  'ngInject';

	  var directive = {
	    restrict: 'E',
	    templateUrl: 'app/directive/form/form.html',
	    transclude: true,
	    link: function link(scope, element, attrs, ctrl, transclude) {
	      var cloneElement = undefined,
	          cloneScope = undefined;
	      scope.$watch(attrs, function (newAttrs) {
	        if (angular.isDefined(cloneElement)) {
	          cloneElement.remove();
	          cloneElement = undefined;
	          cloneScope.$destroy();
	          cloneScope = undefined;
	        }
	        cloneScope = scope.$new();
	        cloneElement = transclude(cloneScope, function injectClonedElement(clone) {
	          element.after(clone);
	        });
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

	var formController = (function () {
	  formController.$inject = ["$log", "_", "swal", "$rootScope", "$scope", "$compile", "$mdDialog", "$document", "$timeout", "componentOptions"];
	  function formController($log, _, swal, $rootScope, $scope, $compile, $mdDialog, $document, $timeout, componentOptions) {
	    'ngInject';

	    var _this = this;

	    _classCallCheck(this, formController);

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

	    this.handlerDrop = function (component, direction) {
	      var template = undefined;
	      if (component.substr(0, 5) === 'copy-') {
	        template = angular.element('#' + component.substr(5));
	      } else {
	        var _ret = (function () {
	          var id = _this.guid();
	          var options = angular.copy(componentOptions[component]);
	          options.name = angular.copy(id);

	          if (angular.isDefined(direction.key)) {
	            var index = _.findIndex(_this.components, { id: direction.key });

	            if (direction.direction === 'before') {
	              _this.components.splice(index, 0, {
	                id: id,
	                options: options
	              });
	            } else {
	              if (index + 1 >= _this.components.length) {
	                _this.components.push({
	                  id: id,
	                  options: options
	                });
	              } else {
	                _this.components.splice(index + 1, 0, {
	                  id: id,
	                  options: options
	                });
	              }
	            }
	          } else {
	            _this.components.push({
	              id: id,
	              options: options
	            });
	          }

	          var key = undefined;
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
	          template = angular.element(['<div class="droppable-copy-drag-item" id="', id, '"><builder-', key, ' class="builder-components" disabled="true" editable="true" target-id="\'', id, '\'"></builder-', key, '></div>'].join(''));

	          if (angular.isUndefined(template)) {
	            return {
	              v: false
	            };
	          }

	          var el = template[0];
	          el.draggable = true;
	          el.addEventListener('dragstart', function (e) {
	            e.dataTransfer.effectAllowed = 'copyMove';
	            e.dataTransfer.setData('text/plain', 'copy-' + id);
	            e.target.classList.add('drag');
	            e.target.style.opacity = 0.99;
	            return false;
	          }, false);
	          el.addEventListener('dragend', function (e) {
	            e.target.classList.remove('drag');
	            angular.element('.builder-components').removeClass('after before');
	            e.target.style.opacity = 1;

	            $rootScope.$emit('ngMaterialFormBuilder::dragEnd', {});

	            return false;
	          }, false);
	          el.addEventListener('dragleave', function (e) {
	            e.target.classList.remove('drag');
	            e.target.style.opacity = 1;

	            return false;
	          }, false);
	        })();

	        if (typeof _ret === 'object') return _ret.v;
	      }

	      var form = angular.element('#__formBuilderForm');
	      if (angular.isDefined(direction.key)) {
	        var target = angular.element('.builder-components[target-id="\'' + direction.key + '\'"]');
	        if (direction.direction === 'before') {
	          if (component.substr(0, 5) === 'copy-') {
	            template.after(target.parent());
	            _this.moveToPrevious(component.substr(5));
	          } else {
	            template.insertBefore(target.parent());
	          }
	        } else {
	          if (component.substr(0, 5) === 'copy-') {
	            template.before(target.parent());
	            _this.moveToNext(component.substr(5));
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

	      var components = _this._.map(angular.copy(_this.components), function (component) {
	        if (angular.isDefined(component.options.mimeTypes)) {
	          delete component.options.mimeTypes;
	        }
	        if (angular.isDefined(component.options.validationOptions)) {
	          delete component.options.validationOptions;
	        }
	        return component;
	      });
	      _this.form = angular.copy(components);

	      $timeout(function () {
	        $scope.$digest();
	      });
	    };
	  }

	  _createClass(formController, [{
	    key: 'modifyComponent',
	    value: function modifyComponent(targetScopeVM) {
	      var _this2 = this;

	      var modifiedComponent = this.findComponent(targetScopeVM.targetId);
	      modifiedComponent.options = targetScopeVM.options;

	      var modifyController = function modifyController(scope, $mdDialog) {
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

	        scope.checkFileUploaderEnable = function (type) {
	          return _this2._.indexOf(scope.component.options.allowedMimeTypes, type) > -1;
	        };
	        scope.enableFileUploaderMimeType = function (type) {
	          if (type !== 'all') {
	            if (_this2._.indexOf(scope.component.options.allowedMimeTypes, 'all') > -1) {
	              scope.component.options.allowedMimeTypes = _this2._.reject(scope.component.options.allowedMimeTypes, function (t) {
	                return t === 'all';
	              });
	            }
	            if (_this2._.indexOf(scope.component.options.allowedMimeTypes, type) > -1) {
	              scope.component.options.allowedMimeTypes = _this2._.reject(scope.component.options.allowedMimeTypes, function (t) {
	                return t === type;
	              });
	            } else {
	              scope.component.options.allowedMimeTypes.push(type);
	            }
	          } else {
	            scope.component.options.allowedMimeTypes = ['all'];
	          }
	        };

	        scope.removeComponentOptions = function (index) {
	          if (scope.component.options.options.length <= 1) {
	            return false;
	          }
	          _this2.swal(_this2.swalOption, function (isConfirm) {
	            if (isConfirm) {
	              scope.component.options.options.splice(index, 1);

	              _this2.$timeout(function () {
	                scope.$digest();
	              });
	            }
	          });
	        };

	        scope.addComponentOptions = function () {
	          var option = angular.copy(scope.component.options.options[0]);
	          _this2._.each(Object.keys(option), function (key) {
	            option[key] = key + (scope.component.options.options.length + 1);
	          });
	          scope.component.options.options.push(option);
	        };

	        scope.answer = function () {
	          var components = _this2._.map(angular.copy(_this2.components), function (component) {
	            if (angular.isDefined(component.options.mimeTypes)) {
	              delete component.options.mimeTypes;
	            }
	            if (angular.isDefined(component.options.validationOptions)) {
	              delete component.options.validationOptions;
	            }
	            return component;
	          });
	          _this2.form = angular.copy(components);
	          $mdDialog.hide();
	        };
	        scope.hide = function () {
	          $mdDialog.hide();
	        };
	        scope.cancel = function () {
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
	  }, {
	    key: 'removeComponent',
	    value: function removeComponent(element, targetScope, targetId) {
	      var _this3 = this;

	      this.swal(this.swalOption, function (isConfirm) {
	        if (isConfirm) {
	          _this3.components = _this3._.reject(_this3.components, function (component) {
	            return component.id === targetId;
	          });

	          var components = _this3._.map(angular.copy(_this3.components), function (component) {
	            if (angular.isDefined(component.options.mimeTypes)) {
	              delete component.options.mimeTypes;
	            }
	            if (angular.isDefined(component.options.validationOptions)) {
	              delete component.options.validationOptions;
	            }
	            return component;
	          });
	          _this3.form = angular.copy(components);

	          targetScope.$destroy();
	          element.parent().remove();
	          _this3.$timeout(function () {
	            _this3.$scope.$digest();
	          });
	        }
	      });
	    }

	    // Magic for swap array to value by index.
	  }, {
	    key: 'identity',
	    value: function identity(x) {
	      return x;
	    }
	  }, {
	    key: 'findComponent',
	    value: function findComponent(id) {
	      return this._.find(this.components, function (component) {
	        return component.id === id;
	      });
	    }
	  }, {
	    key: 'findComponentIndex',
	    value: function findComponentIndex(id) {
	      return this._.findIndex(this.components, { id: id });
	    }
	  }, {
	    key: 'moveComponentPosition',
	    value: function moveComponentPosition(direction, index, id) {
	      var _this4 = this;

	      if (direction === 'previous') {
	        this.components[index - 1] = this.identity(this.components[index], this.components[index] = this.components[index - 1]);
	      } else {
	        this.components[index] = this.identity(this.components[index + 1], this.components[index + 1] = this.components[index]);
	      }
	      this.$timeout(function () {
	        _this4.$scope.$digest();
	      });
	    }
	  }, {
	    key: 'moveToPrevious',
	    value: function moveToPrevious(id) {
	      var index = this.findComponentIndex(id);
	      if (index === 0) {
	        return false;
	      }
	      this.moveComponentPosition('previous', index, id);
	    }
	  }, {
	    key: 'moveToNext',
	    value: function moveToNext(id) {
	      var index = this.findComponentIndex(id);
	      if (index === this.components.length - 1) {
	        return false;
	      }
	      this.moveComponentPosition('next', index, id);
	    }
	  }, {
	    key: 'guid',
	    value: function guid() {
	      var s4 = function s4() {
	        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	      };
	      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	    }
	  }]);

	  return formController;
	})();

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	exports.renderDirective = renderDirective;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function renderDirective() {
	  'ngInject';

	  var directive = {
	    restrict: 'A',
	    require: '^ngModel',
	    transclude: true,
	    link: function link(scope, element, attrs, ctrl, transclude) {
	      var cloneElement = undefined,
	          cloneScope = undefined;
	      scope.$watch(attrs, function (newAttrs) {
	        if (angular.isDefined(cloneElement)) {
	          cloneElement.remove();
	          cloneElement = undefined;
	          cloneScope.$destroy();
	          cloneScope = undefined;
	        }
	        cloneScope = scope.$new();
	        cloneScope[attrs.name] = ctrl.$$parentForm;
	        cloneScope.formName = attrs.name;
	        cloneScope.render.formAction = attrs.action;
	        cloneScope.render.formMethod = attrs.method;

	        cloneElement = transclude(cloneScope, function injectClonedElement(clone) {
	          element.after(clone);
	        });
	      });
	    },
	    scope: {
	      components: '=ngModel',
	      renderResponse: '=ngFormBuilderRender'
	    },
	    controller: renderController,
	    controllerAs: 'render',
	    bindToController: true,
	    terminal: true
	  };

	  return directive;
	}

	var renderController = (function () {
	  renderController.$inject = ["$log", "_", "$q", "swal", "flow", "moment", "$scope", "$element", "$compile", "$mdDialog", "$timeout"];
	  function renderController($log, _, $q, swal, flow, moment, $scope, $element, $compile, $mdDialog, $timeout) {
	    'ngInject';

	    var _this = this;

	    _classCallCheck(this, renderController);

	    this.$log = $log;
	    this.$scope = $scope;
	    this.$timeout = $timeout;
	    this._ = _;
	    this.swal = swal;
	    this.moment = moment;
	    this.$mdDialog = $mdDialog;
	    this.$compile = $compile;

	    $scope.$watch('render.components', function (newFormObj, oldFormObj) {
	      $element.html('');

	      _this.components = angular.copy(newFormObj);
	      var uploader = {},
	          uploaderDeferred = [];
	      if (_this.components.length > 0) {
	        (function () {
	          var template = '',
	              key = undefined;
	          var scope = $scope.$new(true, $scope.$parent);
	          _.each(_this.components, function (component, index) {
	            var existsComponent = -1;
	            if (oldFormObj.length > 0) {
	              existsComponent = _.findIndex(oldFormObj, { id: component.id });
	            }

	            switch (component.options.type) {
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
	                if ('' === component.options.flow.fileParameterName) {
	                  angular.extend(component.options.flow, {
	                    fileParameterName: 'file'
	                  });
	                }
	                uploader[component.id] = {
	                  deferred: $q.defer(),
	                  flow: new flow(component.options.flow)
	                };
	                uploader[component.id].flow.on('fileSuccess', function (file, message, chunk) {
	                  var res = undefined;
	                  try {
	                    res = angular.fromJson(message);
	                  } catch (e) {
	                    res = [];
	                  }
	                  if (angular.isFunction(_this.renderResponse.fileSuccess)) {
	                    _this.renderResponse.fileSuccess.apply(scope, [file, res, chunk]);
	                  }
	                });
	                uploader[component.id].flow.on('fileProgress', function (file, chunk) {
	                  if (angular.isFunction(_this.renderResponse.fileProgress)) {
	                    _this.renderResponse.fileProgress.apply(scope, [file, chunk]);
	                  }
	                });
	                uploader[component.id].flow.on('filesAdded', function (files, event) {
	                  event.preventDefault();
	                  $timeout(function () {
	                    _.each(files, function (file) {
	                      if (component.options.allowedMimeTypes.indexOf('all') === -1) {
	                        if (allowdMimeTypeMapping.indexOf(file.file.type) === -1) {
	                          uploader[component.id].flow.removeFile(file);
	                        }
	                      }
	                      if (file.file.size > component.options.fileSizeLimit * 1024 * 1024) {
	                        uploader[component.id].flow.removeFile(file);
	                      }
	                    });
	                    scope.$digest();
	                  });
	                  if (angular.isFunction(_this.renderResponse.filesAdded)) {
	                    _this.renderResponse.filesAdded.apply(scope, [files, event]);
	                  }
	                });
	                uploader[component.id].flow.on('filesSubmitted', function (files, event) {
	                  event.preventDefault();
	                  if (angular.isFunction(_this.renderResponse.filesSubmitted)) {
	                    _this.renderResponse.filesSubmitted.apply(scope, [files, event]);
	                  }
	                });
	                uploader[component.id].flow.on('fileRemoved', function (file) {
	                  if (angular.isFunction(_this.renderResponse.fileRemoved)) {
	                    _this.renderResponse.fileRemoved.apply(scope, [file]);
	                  }
	                });
	                uploader[component.id].flow.on('fileRetry', function (file, chunk) {
	                  if (angular.isFunction(_this.renderResponse.fileRetry)) {
	                    _this.renderResponse.fileRetry.apply(scope, [file, chunk]);
	                  }
	                });
	                uploader[component.id].flow.on('fileError', function (file, message, chunk) {
	                  var res = undefined;
	                  try {
	                    res = angular.fromJson(message);
	                  } catch (e) {
	                    res = [];
	                  }

	                  if (angular.isFunction(_this.renderResponse.fileError)) {
	                    _this.renderResponse.fileError.apply(scope, [file, res, chunk]);
	                  }
	                });
	                uploader[component.id].flow.on('uploadStart', function () {
	                  if (angular.isFunction(_this.renderResponse.uploadStart)) {
	                    _this.renderResponse.uploadStart.call(scope);
	                  }
	                });
	                uploader[component.id].flow.on('complete', function () {
	                  uploader[component.id].deferred.resolve();
	                  if (angular.isFunction(_this.renderResponse.complete)) {
	                    _this.renderResponse.complete.call(scope);
	                  }
	                });
	                uploader[component.id].flow.on('progress', function () {
	                  if (angular.isFunction(_this.renderResponse.progress)) {
	                    _this.renderResponse.progress.call(scope);
	                  }
	                });
	                uploader[component.id].flow.on('error', function (message, file, chunk) {
	                  var res = undefined;
	                  try {
	                    res = angular.fromJson(message);
	                  } catch (e) {
	                    res = [];
	                  }
	                  uploader[component.id].deferred.reject();
	                  if (angular.isFunction(_this.renderResponse.error)) {
	                    _this.renderResponse.error.apply(scope, [res, file, chunk]);
	                  }
	                });

	                uploaderDeferred.push(uploader[component.id].deferred.promise.then(function () {
	                  return true;
	                }, function () {
	                  return false;
	                }));
	                break;
	              default:
	                key = component.options.type;
	            }
	            template += ['<builder-', key, ' disabled="false" target-id="\'', component.id, '\'" options="render.components[', index, '].options"', key === 'file-uploader' ? [' uploader-flow="render.uploader[\'', component.id, '\'].flow"'].join('') : '', '></builder-', key, '>'].join('');
	          });
	          template += '<md-button ng-click="render.submitted()">Submit</md-button>';

	          template = angular.element(template);
	          $element.append(template);

	          scope.render = {
	            components: angular.copy(_this.components),
	            submitted: _this.submitted,
	            renderResponse: _this.renderResponse,
	            uploader: uploader,
	            uploaderDeferred: uploaderDeferred,
	            $q: $q,
	            $log: $log,
	            $timeout: $timeout
	          };
	          $compile(template)(scope);

	          $timeout(function () {
	            _.each(_this.components, function (component, index) {
	              if (component.options.type === 'fileUploader') {
	                var flowTarget = $element.find('#flow-' + component.id);
	                if (flowTarget.length > 0) {
	                  uploader[component.id].flow.assignBrowse(flowTarget[0]);
	                  uploader[component.id].flow.assignDrop(flowTarget[0]);
	                }
	              }
	            });
	            $scope.$digest();
	          });
	        })();
	      }
	    }, true);
	  }

	  _createClass(renderController, [{
	    key: 'submitted',
	    value: function submitted() {
	      var _this2 = this;

	      if (angular.isFunction(this.renderResponse.submitCallback)) {
	        (function () {
	          var response = {};
	          _.each(_this2.components, function (component) {
	            if (angular.isUndefined(response[component.id])) {
	              if (component.options.type === 'inputCheckbox') {
	                response[component.id] = [];
	                _.each(component.options.options, function (option) {
	                  if (true === option.checked) {
	                    response[component.id].push(option.value);
	                  }
	                });
	              } else if (component.options.type === 'switch') {
	                if (component.options.value) {
	                  response[component.id] = component.options.on;
	                } else {
	                  response[component.id] = component.options.off;
	                }
	              } else if (component.options.type === 'datepicker') {
	                response[component.id] = _this2.moment(component.options.value).format('YYYY-MM-DD HH:mm:ss');
	              } else {
	                response[component.id] = component.options.value;
	              }
	            }
	          });

	          _this2.$q.all(_this2.uploaderDeferred).then(function (res) {
	            _this2.renderResponse.submitCallback(response);
	          }, function (err) {
	            _this2.renderResponse.submitCallback(response);
	          });

	          _this2.$timeout(function () {
	            _.each(_this2.uploader, function (obj) {
	              if (obj.flow.files.length > 0) {
	                obj.flow.upload();
	              } else {
	                obj.deferred.resolve();
	              }
	            });
	          });
	        })();
	      }
	    }
	  }]);

	  return renderController;
	})();

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	exports.inputTextDirective = inputTextDirective;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function inputTextDirective() {
	  'ngInject';

	  var directive = {
	    restrict: 'E',
	    templateUrl: 'app/form/inputText/inputText.html',
	    transclude: true,
	    link: function link(scope, element, attrs, _, transclude) {
	      var cloneElement = undefined,
	          cloneScope = undefined;
	      scope.$watch(attrs, function (newAttrs) {
	        if (angular.isDefined(cloneElement)) {
	          cloneElement.remove();
	          cloneElement = undefined;
	          cloneScope.$destroy();
	          cloneScope = undefined;
	        }
	        cloneScope = scope.$new();
	        cloneElement = transclude(cloneScope, function injectClonedElement(clone) {
	          element.after(clone);
	        });
	      });
	    },
	    scope: {
	      disabled: '=?disabled',
	      editable: '=?editable',
	      targetId: '=?targetId',
	      options: '=?options'
	    },
	    controller: inputTextController,
	    controllerAs: 'vm',
	    bindToController: true
	  };

	  return directive;
	}

	var inputTextController = (function () {
	  inputTextController.$inject = ["$log", "_", "$rootScope", "$scope", "$element", "componentOptions"];
	  function inputTextController($log, _, $rootScope, $scope, $element, componentOptions) {
	    'ngInject';

	    _classCallCheck(this, inputTextController);

	    if (angular.isUndefined(this.disabled)) {
	      this.disabled = true;
	    }
	    if (angular.isUndefined(this.editable)) {
	      this.editable = false;
	    }

	    this.$scope = $scope;
	    this.$log = $log;
	    this.$element = $element;

	    var options = angular.copy(componentOptions.inputText);
	    options.pattern = options.validationOptions[0].rule;

	    if (angular.isDefined(this.options)) {
	      angular.extend(options, this.options);
	    }

	    this.options = options;
	  }

	  _createClass(inputTextController, [{
	    key: 'modifyComponent',
	    value: function modifyComponent() {
	      this.$scope.$parent.form.modifyComponent(this.$scope.vm);
	    }
	  }, {
	    key: 'removeComponent',
	    value: function removeComponent() {
	      this.$scope.$parent.form.removeComponent(this.$element, this.$scope, this.targetId);
	    }
	  }]);

	  return inputTextController;
	})();

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	exports.inputRadioDirective = inputRadioDirective;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function inputRadioDirective() {
	  'ngInject';

	  var directive = {
	    restrict: 'E',
	    templateUrl: 'app/form/inputRadio/inputRadio.html',
	    transclude: true,
	    link: function link(scope, element, attrs, _, transclude) {
	      var cloneElement = undefined,
	          cloneScope = undefined;
	      scope.$watch(attrs, function (newAttrs) {
	        if (angular.isDefined(cloneElement)) {
	          cloneElement.remove();
	          cloneElement = undefined;
	          cloneScope.$destroy();
	          cloneScope = undefined;
	        }
	        cloneScope = scope.$new();
	        cloneElement = transclude(cloneScope, function injectClonedElement(clone) {
	          element.after(clone);
	        });
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

	var inputRadioController = (function () {
	  inputRadioController.$inject = ["$log", "_", "$rootScope", "$scope", "$element", "componentOptions"];
	  function inputRadioController($log, _, $rootScope, $scope, $element, componentOptions) {
	    'ngInject';

	    _classCallCheck(this, inputRadioController);

	    if (angular.isUndefined(this.disabled)) {
	      this.disabled = true;
	    }
	    if (angular.isUndefined(this.editable)) {
	      this.editable = false;
	    }

	    this.$scope = $scope;
	    this.$log = $log;
	    this.$element = $element;

	    var options = angular.copy(componentOptions.inputRadio);

	    if (angular.isDefined(this.options)) {
	      angular.extend(options, this.options);
	    }
	    options['default'] = angular.copy(options.options[0].value).toString();

	    this.options = options;
	  }

	  _createClass(inputRadioController, [{
	    key: 'modifyComponent',
	    value: function modifyComponent() {
	      this.$scope.$parent.form.modifyComponent(this.$scope.vm);
	    }
	  }, {
	    key: 'removeComponent',
	    value: function removeComponent() {
	      this.$scope.$parent.form.removeComponent(this.$element, this.$scope, this.targetId);
	    }
	  }]);

	  return inputRadioController;
	})();

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	exports.inputCheckboxDirective = inputCheckboxDirective;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function inputCheckboxDirective() {
	  'ngInject';

	  var directive = {
	    restrict: 'E',
	    templateUrl: 'app/form/inputCheckbox/inputCheckbox.html',
	    transclude: true,
	    link: function link(scope, element, attrs, _, transclude) {
	      var cloneElement = undefined,
	          cloneScope = undefined;
	      scope.$watch(attrs, function (newAttrs) {
	        if (angular.isDefined(cloneElement)) {
	          cloneElement.remove();
	          cloneElement = undefined;
	          cloneScope.$destroy();
	          cloneScope = undefined;
	        }
	        cloneScope = scope.$new();
	        cloneElement = transclude(cloneScope, function injectClonedElement(clone) {
	          element.after(clone);
	        });
	      });
	    },
	    scope: {
	      disabled: '=?disabled',
	      editable: '=?editable',
	      targetId: '=?targetId',
	      options: '=?options'
	    },
	    controller: inputCheckboxController,
	    controllerAs: 'vm',
	    bindToController: true
	  };

	  return directive;
	}

	var inputCheckboxController = (function () {
	  inputCheckboxController.$inject = ["$log", "_", "$rootScope", "$scope", "$element", "componentOptions"];
	  function inputCheckboxController($log, _, $rootScope, $scope, $element, componentOptions) {
	    'ngInject';

	    _classCallCheck(this, inputCheckboxController);

	    if (angular.isUndefined(this.disabled)) {
	      this.disabled = true;
	    }
	    if (angular.isUndefined(this.editable)) {
	      this.editable = false;
	    }

	    this.$scope = $scope;
	    this.$log = $log;
	    this.$element = $element;

	    var options = angular.copy(componentOptions.inputCheckbox);

	    if (angular.isDefined(this.options)) {
	      angular.extend(options, this.options);
	    }

	    this.options = options;
	  }

	  _createClass(inputCheckboxController, [{
	    key: 'modifyComponent',
	    value: function modifyComponent() {
	      this.$scope.$parent.form.modifyComponent(this.$scope.vm);
	    }
	  }, {
	    key: 'removeComponent',
	    value: function removeComponent() {
	      this.$scope.$parent.form.removeComponent(this.$element, this.$scope, this.targetId);
	    }
	  }]);

	  return inputCheckboxController;
	})();

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	exports.selectDirective = selectDirective;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function selectDirective() {
	  'ngInject';

	  var directive = {
	    restrict: 'E',
	    templateUrl: 'app/form/select/select.html',
	    transclude: true,
	    link: function link(scope, element, attrs, _, transclude) {
	      var cloneElement = undefined,
	          cloneScope = undefined;
	      scope.$watch(attrs, function (newAttrs) {
	        if (angular.isDefined(cloneElement)) {
	          cloneElement.remove();
	          cloneElement = undefined;
	          cloneScope.$destroy();
	          cloneScope = undefined;
	        }
	        cloneScope = scope.$new();
	        cloneElement = transclude(cloneScope, function injectClonedElement(clone) {
	          element.after(clone);
	        });
	      });
	    },
	    scope: {
	      disabled: '=?disabled',
	      editable: '=?editable',
	      targetId: '=?targetId',
	      options: '=?options'
	    },
	    controller: selectController,
	    controllerAs: 'vm',
	    bindToController: true
	  };

	  return directive;
	}

	var selectController = (function () {
	  selectController.$inject = ["$log", "_", "$rootScope", "$scope", "$element", "componentOptions"];
	  function selectController($log, _, $rootScope, $scope, $element, componentOptions) {
	    'ngInject';

	    _classCallCheck(this, selectController);

	    if (angular.isUndefined(this.disabled)) {
	      this.disabled = true;
	    }
	    if (angular.isUndefined(this.editable)) {
	      this.editable = false;
	    }

	    this.$scope = $scope;
	    this.$log = $log;
	    this.$element = $element;

	    var options = angular.copy(componentOptions.select);

	    if (angular.isDefined(this.options)) {
	      angular.extend(options, this.options);
	    }
	    options['default'] = angular.copy(options.options[0].value).toString();

	    this.options = options;
	  }

	  _createClass(selectController, [{
	    key: 'modifyComponent',
	    value: function modifyComponent() {
	      this.$scope.$parent.form.modifyComponent(this.$scope.vm);
	    }
	  }, {
	    key: 'removeComponent',
	    value: function removeComponent() {
	      this.$scope.$parent.form.removeComponent(this.$element, this.$scope, this.targetId);
	    }
	  }]);

	  return selectController;
	})();

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	exports.textareaDirective = textareaDirective;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function textareaDirective() {
	  'ngInject';

	  var directive = {
	    restrict: 'E',
	    templateUrl: 'app/form/textarea/textarea.html',
	    transclude: true,
	    link: function link(scope, element, attrs, _, transclude) {
	      var cloneElement = undefined,
	          cloneScope = undefined;
	      scope.$watch(attrs, function (newAttrs) {
	        if (angular.isDefined(cloneElement)) {
	          cloneElement.remove();
	          cloneElement = undefined;
	          cloneScope.$destroy();
	          cloneScope = undefined;
	        }
	        cloneScope = scope.$new();
	        cloneElement = transclude(cloneScope, function injectClonedElement(clone) {
	          element.after(clone);
	        });
	      });
	    },
	    scope: {
	      disabled: '=?disabled',
	      editable: '=?editable',
	      targetId: '=?targetId',
	      options: '=?options'
	    },
	    controller: textareaController,
	    controllerAs: 'vm',
	    bindToController: true
	  };

	  return directive;
	}

	var textareaController = (function () {
	  textareaController.$inject = ["$log", "_", "$rootScope", "$scope", "$element", "componentOptions"];
	  function textareaController($log, _, $rootScope, $scope, $element, componentOptions) {
	    'ngInject';

	    _classCallCheck(this, textareaController);

	    if (angular.isUndefined(this.disabled)) {
	      this.disabled = true;
	    }
	    if (angular.isUndefined(this.editable)) {
	      this.editable = false;
	    }

	    this.$scope = $scope;
	    this.$log = $log;
	    this.$element = $element;

	    var options = angular.copy(componentOptions.textarea);

	    if (angular.isDefined(this.options)) {
	      angular.extend(options, this.options);
	    }

	    this.options = options;
	  }

	  _createClass(textareaController, [{
	    key: 'modifyComponent',
	    value: function modifyComponent() {
	      this.$scope.$parent.form.modifyComponent(this.$scope.vm);
	    }
	  }, {
	    key: 'removeComponent',
	    value: function removeComponent() {
	      this.$scope.$parent.form.removeComponent(this.$element, this.$scope, this.targetId);
	    }
	  }]);

	  return textareaController;
	})();

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	exports.switchDirective = switchDirective;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function switchDirective() {
	  'ngInject';

	  var directive = {
	    restrict: 'E',
	    templateUrl: 'app/form/switch/switch.html',
	    transclude: true,
	    link: function link(scope, element, attrs, _, transclude) {
	      var cloneElement = undefined,
	          cloneScope = undefined;
	      scope.$watch(attrs, function (newAttrs) {
	        if (angular.isDefined(cloneElement)) {
	          cloneElement.remove();
	          cloneElement = undefined;
	          cloneScope.$destroy();
	          cloneScope = undefined;
	        }
	        cloneScope = scope.$new();
	        cloneElement = transclude(cloneScope, function injectClonedElement(clone) {
	          element.after(clone);
	        });
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

	var switchController = (function () {
	  switchController.$inject = ["$log", "_", "$rootScope", "$scope", "$element", "componentOptions"];
	  function switchController($log, _, $rootScope, $scope, $element, componentOptions) {
	    'ngInject';

	    _classCallCheck(this, switchController);

	    if (angular.isUndefined(this.disabled)) {
	      this.disabled = true;
	    }
	    if (angular.isUndefined(this.editable)) {
	      this.editable = false;
	    }

	    this.$scope = $scope;
	    this.$log = $log;
	    this.$element = $element;

	    var options = angular.copy(componentOptions['switch']);

	    if (angular.isDefined(this.options)) {
	      angular.extend(options, this.options);
	    }

	    this.options = options;
	  }

	  _createClass(switchController, [{
	    key: 'modifyComponent',
	    value: function modifyComponent() {
	      this.$scope.$parent.form.modifyComponent(this.$scope.vm);
	    }
	  }, {
	    key: 'removeComponent',
	    value: function removeComponent() {
	      this.$scope.$parent.form.removeComponent(this.$element, this.$scope, this.targetId);
	    }
	  }]);

	  return switchController;
	})();

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	exports.datepickerDirective = datepickerDirective;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function datepickerDirective() {
	  'ngInject';

	  var directive = {
	    restrict: 'E',
	    templateUrl: 'app/form/datepicker/datepicker.html',
	    transclude: true,
	    link: function link(scope, element, attrs, _, transclude) {
	      var cloneElement = undefined,
	          cloneScope = undefined;
	      scope.$watch(attrs, function (newAttrs) {
	        if (angular.isDefined(cloneElement)) {
	          cloneElement.remove();
	          cloneElement = undefined;
	          cloneScope.$destroy();
	          cloneScope = undefined;
	        }
	        cloneScope = scope.$new();
	        cloneElement = transclude(cloneScope, function injectClonedElement(clone) {
	          element.after(clone);
	        });
	      });
	    },
	    scope: {
	      disabled: '=?disabled',
	      editable: '=?editable',
	      targetId: '=?targetId',
	      options: '=?options'
	    },
	    controller: datepickerController,
	    controllerAs: 'vm',
	    bindToController: true
	  };

	  return directive;
	}

	var datepickerController = (function () {
	  datepickerController.$inject = ["$log", "_", "$rootScope", "$scope", "$element", "componentOptions"];
	  function datepickerController($log, _, $rootScope, $scope, $element, componentOptions) {
	    'ngInject';

	    _classCallCheck(this, datepickerController);

	    if (angular.isUndefined(this.disabled)) {
	      this.disabled = true;
	    }
	    if (angular.isUndefined(this.editable)) {
	      this.editable = false;
	    }

	    this.$scope = $scope;
	    this.$log = $log;
	    this.$element = $element;

	    var options = angular.copy(componentOptions.datepicker);

	    if (angular.isDefined(this.options)) {
	      angular.extend(options, this.options);
	    }

	    this.options = options;
	  }

	  _createClass(datepickerController, [{
	    key: 'modifyComponent',
	    value: function modifyComponent() {
	      this.$scope.$parent.form.modifyComponent(this.$scope.vm);
	    }
	  }, {
	    key: 'removeComponent',
	    value: function removeComponent() {
	      this.$scope.$parent.form.removeComponent(this.$element, this.$scope, this.targetId);
	    }
	  }]);

	  return datepickerController;
	})();

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	exports.fileUploaderDirective = fileUploaderDirective;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function fileUploaderDirective() {
	  'ngInject';

	  var directive = {
	    restrict: 'E',
	    templateUrl: 'app/form/fileUploader/fileUploader.html',
	    transclude: true,
	    link: function link(scope, element, attrs, _, transclude) {
	      var cloneElement = undefined,
	          cloneScope = undefined;
	      scope.$watch(attrs, function (newAttrs) {
	        if (angular.isDefined(cloneElement)) {
	          cloneElement.remove();
	          cloneElement = undefined;
	          cloneScope.$destroy();
	          cloneScope = undefined;
	        }
	        cloneScope = scope.$new();
	        cloneElement = transclude(cloneScope, function injectClonedElement(clone) {
	          element.after(clone);
	        });
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

	var fileUploaderController = (function () {
	  fileUploaderController.$inject = ["$log", "_", "$rootScope", "$scope", "$timeout", "$element", "flow", "swal", "componentOptions"];
	  function fileUploaderController($log, _, $rootScope, $scope, $timeout, $element, flow, swal, componentOptions) {
	    'ngInject';

	    _classCallCheck(this, fileUploaderController);

	    if (angular.isUndefined(this.disabled)) {
	      this.disabled = true;
	    }
	    if (angular.isUndefined(this.editable)) {
	      this.editable = false;
	    }

	    this.$scope = $scope;
	    this.$log = $log;
	    this.$element = $element;

	    var options = angular.copy(componentOptions.fileUploader);

	    if (angular.isDefined(this.options)) {
	      angular.extend(options, this.options);
	    }

	    this.options = options;

	    var allowdMimeTypeMapping = [];
	    if (options.allowedMimeTypes.indexOf('all') === -1) {
	      var _allowdMimeTypeMapping = _.reduce(options.mimeTypes, function (mime, types, key) {
	        if (options.allowedMimeTypes.indexOf(key) > -1) {
	          return mime.concat(types);
	        } else {
	          return mime;
	        }
	      }, []);
	      _allowdMimeTypeMapping = _.uniq(_allowdMimeTypeMapping);
	    }
	  }

	  _createClass(fileUploaderController, [{
	    key: 'modifyComponent',
	    value: function modifyComponent() {
	      this.$scope.$parent.form.modifyComponent(this.$scope.vm);
	    }
	  }, {
	    key: 'removeComponent',
	    value: function removeComponent() {
	      this.$scope.$parent.form.removeComponent(this.$element, this.$scope, this.targetId);
	    }
	  }]);

	  return fileUploaderController;
	})();

/***/ }
/******/ ]);