export function componentOptionsFactory () {
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
      validationOptions: [
        {
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
        }
      ],
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
        chunkSize: 1*1024*1024,
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
        successStatuses: [200,201,202],
        permanentErrors: [404,415,500,501]
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
      default: '',
      options: [
        {
          name: 'option 1',
          value: 'value 1'
        },
        {
          name: 'option 2',
          value: 'value 2'
        }
      ],
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
      default: '',
      options: [
        {
          name: 'option 1',
          value: 'value 1'
        },
        {
          name: 'option 2',
          value: 'value 2'
        }
      ],
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
      default: [],
      options: [
        {
          name: 'option 1',
          value: 'value 1',
          checked: true
        },
        {
          name: 'option 2',
          value: 'value 2',
          checked: false
        }
      ],
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
    switch: {
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
