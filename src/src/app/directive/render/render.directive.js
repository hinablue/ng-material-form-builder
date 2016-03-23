export function renderDirective() {
  'ngInject';

  let directive = {
    restrict: 'A',
    require: '^ngModel',
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
        // cloneScope[attrs.name] = ctrl.$$parentForm;
        cloneScope.formName = attrs.name;
        cloneScope.render.formAction = attrs.action;
        cloneScope.render.formMethod = attrs.method;

        cloneElement = transclude(
            cloneScope,
            function injectClonedElement( clone ) {
                element.after( clone );
            }
        );
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

class renderController {
  constructor($log, _, $q, swal, flow, moment, $scope, $element, $compile, $mdDialog, $timeout) {
    'ngInject';

    this.$log = $log;
    this.$scope = $scope;
    this.$timeout = $timeout;
    this._ = _;
    this.swal = swal;
    this.moment = moment;
    this.$mdDialog = $mdDialog;
    this.$compile = $compile;

    $scope.$watch('render.components', (newFormObj) => {
      $element.html('');

      this.components = angular.copy(newFormObj);
      let uploader = {}, uploaderDeferred = [];
      if (this.components.length > 0) {
        let template = '', key;
        let scope = $scope.$new(true, $scope.$parent);

        _.each(this.components, (component, index) => {
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


              let allowdMimeTypeMapping = [];
              if (component.options.allowedMimeTypes.indexOf('all') === -1) {
                let allowdMimeTypeMapping = _.reduce(component.options.mimeTypes, (mime, types, key) => {
                  if (component.options.allowedMimeTypes.indexOf(key) > -1) {
                    return mime.concat(types);
                  } else {
                    return mime;
                  }
                }, []);
                allowdMimeTypeMapping = _.uniq(allowdMimeTypeMapping);
              }
              uploader[component.id] = {
                deferred: $q.defer(),
                flow: new flow(component.options.flow)
              };
              uploader[component.id].flow.on('fileSuccess', (file, message, chunk) => {
                let res;
                try {
                  res = angular.fromJson(message);
                } catch(e) {
                  res = [];
                }
                if (angular.isFunction(this.renderResponse.fileSuccess)) {
                  this.renderResponse.fileSuccess.apply(scope, [file, res, chunk]);
                }
              });
              uploader[component.id].flow.on('fileProgress', (file, chunk) => {
                if (angular.isFunction(this.renderResponse.fileProgress)) {
                  this.renderResponse.fileProgress.apply(scope, [file, chunk]);
                }
              });
              uploader[component.id].flow.on('filesAdded', (files, event) => {
                event.preventDefault();
                $timeout(() => {
                  _.each(files, (file) => {
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
                if (angular.isFunction(this.renderResponse.filesAdded)) {
                  this.renderResponse.filesAdded.apply(scope, [files, event]);
                }
              });
              uploader[component.id].flow.on('filesSubmitted', (files, event) => {
                event.preventDefault();
                if (angular.isFunction(this.renderResponse.filesSubmitted)) {
                  this.renderResponse.filesSubmitted.apply(scope, [files, event]);
                }
              });
              uploader[component.id].flow.on('fileRemoved', (file) => {
                if (angular.isFunction(this.renderResponse.fileRemoved)) {
                  this.renderResponse.fileRemoved.apply(scope, [file]);
                }
              });
              uploader[component.id].flow.on('fileRetry', (file, chunk) => {
                if (angular.isFunction(this.renderResponse.fileRetry)) {
                  this.renderResponse.fileRetry.apply(scope, [file, chunk]);
                }
              });
              uploader[component.id].flow.on('fileError', (file, message, chunk) => {
                let res;
                try {
                  res = angular.fromJson(message);
                } catch(e) {
                  res = [];
                }

                if (angular.isFunction(this.renderResponse.fileError)) {
                  this.renderResponse.fileError.apply(scope, [file, res, chunk]);
                }
              });
              uploader[component.id].flow.on('uploadStart', () => {
                if (angular.isFunction(this.renderResponse.uploadStart)) {
                  this.renderResponse.uploadStart.call(scope);
                }
              });
              uploader[component.id].flow.on('complete', () => {
                uploader[component.id].deferred.resolve();
                if (angular.isFunction(this.renderResponse.complete)) {
                  this.renderResponse.complete.call(scope);
                }
              });
              uploader[component.id].flow.on('progress', () => {
                if (angular.isFunction(this.renderResponse.progress)) {
                  this.renderResponse.progress.call(scope);
                }
              });
              uploader[component.id].flow.on('error', (message, file, chunk) => {
                let res;
                try {
                  res = angular.fromJson(message);
                } catch(e) {
                  res = [];
                }
                uploader[component.id].deferred.reject();
                if (angular.isFunction(this.renderResponse.error)) {
                  this.renderResponse.error.apply(scope, [res, file, chunk]);
                }
              });

              uploaderDeferred.push(uploader[component.id].deferred.promise.then(() => {
                return true;
              }, () => {
                return false;
              }));
            break;
            default:
              key = component.options.type;
          }
          template += ['<builder-',
            key,
            ' disabled="false" target-id="\'',
            component.id,
            '\'" options="render.components[',
            index,
            '].options"',
            (key === 'file-uploader' ? [
              ' uploader-flow="render.uploader[\'',
              component.id,
              '\'].flow"'
              ].join('') : ''),
            '></builder-',
            key,
            '>'].join('');
        });
        template += '<md-button ng-click="render.submitted()">Submit</md-button>'

        template = angular.element(template);
        $element.append(template);

        scope.render = {
          components: angular.copy(this.components),
          submitted: this.submitted,
          renderResponse: this.renderResponse,
          uploader: uploader,
          uploaderDeferred: uploaderDeferred,
          $q: $q,
          $log: $log,
          $timeout: $timeout,
          _: _
        };
        $compile(template)(scope);

        $timeout(() => {
          _.each(this.components, (component) => {
            if (component.options.type === 'fileUploader') {
              let flowTarget = $element.find('#flow-'+component.id);
              if (flowTarget.length > 0) {
                uploader[component.id].flow.assignBrowse(flowTarget[0]);
                uploader[component.id].flow.assignDrop(flowTarget[0]);
              }
            }
          });
          $scope.$digest();
        });
      }
    }, true);
  }

  submitted () {
    if (angular.isFunction(this.renderResponse.submitCallback)) {
      let response = {};
      this._.each(this.components, (component) => {
        if (angular.isUndefined(response[component.id])) {
          if (component.options.type === 'inputCheckbox') {
            response[component.id] = [];
            this._.each(component.options.options, (option) => {
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
            response[component.id] = this.moment(component.options.value)
                                      .format('YYYY-MM-DD HH:mm:ss');
          } else {
            response[component.id] = component.options.value;
          }
        }
      });

      this.$q.all(this.uploaderDeferred).then((res) => {
        this.$log.info(res);
        this.renderResponse.submitCallback(response);
      }, (err) => {
        this.$log.info(err);
        this.renderResponse.submitCallback(response);
      });

      this.$timeout(() => {
        this._.each(this.uploader, (obj) => {
          if (obj.flow.files.length > 0) {
            obj.flow.upload();
          } else {
            obj.deferred.resolve();
          }
        });
      });
    }
  }
}