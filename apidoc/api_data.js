define({ "api": [
  {
    "type": "get",
    "url": "/api/admin",
    "title": "Request Admin Panel",
    "name": "GetAdmin",
    "group": "Admin",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "File",
            "optional": false,
            "field": "AdminPanel",
            "description": "<p>The Administrative Panel for Managing the UT Aquaponics Web Application.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "File",
            "optional": false,
            "field": "Homepage",
            "description": "<p>Redirects to the Homepage of the UT Aquaponics Web Application.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api/admin.js",
    "groupTitle": "Admin"
  },
  {
    "type": "delete",
    "url": "/api/images/image/:id",
    "title": "Delete an Image",
    "name": "DeleteImage",
    "group": "Images",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "response",
            "description": "<p>Response Information</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.message",
            "description": "<p>Response Message</p>"
          },
          {
            "group": "Success 200",
            "type": "Image",
            "optional": false,
            "field": "response.data",
            "description": "<p>The deleted image</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.code",
            "description": "<p>Response Code</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "response.timestamp",
            "description": "<p>Response Timestamp</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api/images.js",
    "groupTitle": "Images"
  },
  {
    "type": "get",
    "url": "/api/images/count",
    "title": "Request the Count of Images",
    "name": "GetCountOfImages",
    "group": "Images",
    "permission": [
      {
        "name": "none"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "response",
            "description": "<p>Response Information</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.message",
            "description": "<p>Response Message</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "response.data",
            "description": "<p>The count of all images stored.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.code",
            "description": "<p>Response Code</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "response.timestamp",
            "description": "<p>Response Timestamp</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api/images.js",
    "groupTitle": "Images"
  },
  {
    "type": "get",
    "url": "/api/images/image/:id",
    "title": "Request Image By ID",
    "name": "GetImage",
    "group": "Images",
    "permission": [
      {
        "name": "none"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "response",
            "description": "<p>Response Information</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.message",
            "description": "<p>Response Message</p>"
          },
          {
            "group": "Success 200",
            "type": "Image",
            "optional": false,
            "field": "response.data",
            "description": "<p>An image with the given ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.code",
            "description": "<p>Response Code</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "response.timestamp",
            "description": "<p>Response Timestamp</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api/images.js",
    "groupTitle": "Images"
  },
  {
    "type": "get",
    "url": "/api/images",
    "title": "Request the Last Hundred Images.",
    "name": "GetImages",
    "group": "Images",
    "permission": [
      {
        "name": "none"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "response",
            "description": "<p>Response Information</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.message",
            "description": "<p>Response Message</p>"
          },
          {
            "group": "Success 200",
            "type": "Image[]",
            "optional": false,
            "field": "response.data",
            "description": "<p>An array of up to the last hundred images.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.code",
            "description": "<p>Response Code</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "response.timestamp",
            "description": "<p>Response Timestamp</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api/images.js",
    "groupTitle": "Images"
  },
  {
    "type": "get",
    "url": "/api/images/date/:date",
    "title": "Request Images By Date.",
    "name": "GetImagesWithDate",
    "group": "Images",
    "permission": [
      {
        "name": "none"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "response",
            "description": "<p>Response Information</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.message",
            "description": "<p>Response Message</p>"
          },
          {
            "group": "Success 200",
            "type": "Images[]",
            "optional": false,
            "field": "response.data",
            "description": "<p>An array of images that match the given date.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.code",
            "description": "<p>Response Code</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "response.timestamp",
            "description": "<p>Response Timestamp</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api/images.js",
    "groupTitle": "Images"
  },
  {
    "type": "get",
    "url": "/api/images/tag/:tag",
    "title": "Request Images By Tag.",
    "name": "GetImagesWithTag",
    "group": "Images",
    "permission": [
      {
        "name": "none"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "response",
            "description": "<p>Response Information</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.message",
            "description": "<p>Response Message</p>"
          },
          {
            "group": "Success 200",
            "type": "Image[]",
            "optional": false,
            "field": "response.data",
            "description": "<p>An array of images that match the given tag.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.code",
            "description": "<p>Response Code</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "response.timestamp",
            "description": "<p>Response Timestamp</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api/images.js",
    "groupTitle": "Images"
  },
  {
    "type": "post",
    "url": "/api/images",
    "title": "Submit an Image.",
    "name": "PostImages",
    "group": "Images",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "response",
            "description": "<p>Response Information</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.message",
            "description": "<p>Response Message</p>"
          },
          {
            "group": "Success 200",
            "type": "Image",
            "optional": false,
            "field": "response.data",
            "description": "<p>The saved image.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.code",
            "description": "<p>Response Code</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "response.timestamp",
            "description": "<p>Response Timestamp</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api/images.js",
    "groupTitle": "Images"
  },
  {
    "type": "post",
    "url": "/api/images/search",
    "title": "Search for Images",
    "name": "SearchImages",
    "group": "Images",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "response",
            "description": "<p>Response Information</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.message",
            "description": "<p>Response Message</p>"
          },
          {
            "group": "Success 200",
            "type": "Image[]",
            "optional": false,
            "field": "response.data",
            "description": "<p>An array of images that match the provided parameters.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.code",
            "description": "<p>Response Code</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "response.timestamp",
            "description": "<p>Response Timestamp</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api/images.js",
    "groupTitle": "Images"
  },
  {
    "type": "put",
    "url": "/api/images/image/:id",
    "title": "Update an Image",
    "name": "UpdateImage",
    "group": "Images",
    "permission": [
      {
        "name": "none"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "response",
            "description": "<p>Response Information</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.message",
            "description": "<p>Response Message</p>"
          },
          {
            "group": "Success 200",
            "type": "Image",
            "optional": false,
            "field": "response.data",
            "description": "<p>The updated image.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.code",
            "description": "<p>Response Code</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "response.timestamp",
            "description": "<p>Response Timestamp</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api/images.js",
    "groupTitle": "Images"
  },
  {
    "type": "get",
    "url": "/api/login",
    "title": "Login",
    "name": "GetLogin",
    "group": "Login",
    "permission": [
      {
        "name": "none"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "File",
            "optional": false,
            "field": "Homepage",
            "description": "<p>Redirects to the Homepage of the UT Aquaponics Web Application.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api/login.js",
    "groupTitle": "Login"
  },
  {
    "type": "post",
    "url": "/api/login",
    "title": "Login",
    "name": "PostLogin",
    "group": "Login",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "examples": [
      {
        "title": "Login Schema",
        "content": "{\n     \"username\": \"administrator\",\n     \"password\": \"fishy\"\n}",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Redirect",
            "optional": false,
            "field": "AdminPanel",
            "description": "<p>Redirects to the Administrative Panel for Managing the UT Aquaponics Web Application.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api/login.js",
    "groupTitle": "Login"
  },
  {
    "type": "",
    "url": "/api/logout",
    "title": "Logout",
    "name": "Logout",
    "group": "Logout",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "response",
            "description": "<p>Response Information</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.message",
            "description": "<p>Response Message</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.data",
            "description": "<p>&quot;&quot;.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.code",
            "description": "<p>Response Code</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "response.timestamp",
            "description": "<p>Response Timestamp</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api/logout.js",
    "groupTitle": "Logout"
  },
  {
    "type": "get",
    "url": "/",
    "title": "Request Homepage",
    "name": "GetHomepage",
    "group": "Main",
    "permission": [
      {
        "name": "none"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "File",
            "optional": false,
            "field": "Homepage",
            "description": "<p>Redirects to the Homepage of the UT Aquaponics Web Application.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/index.js",
    "groupTitle": "Main"
  },
  {
    "type": "get",
    "url": "*",
    "title": "Resource Does Not Exist",
    "name": "ResourceDoesNotExist",
    "group": "Main",
    "permission": [
      {
        "name": "none"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "File",
            "optional": false,
            "field": "404Page",
            "description": "<p>Sends the 404 Page of the UT Aquaponics Web Application.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/index.js",
    "groupTitle": "Main"
  },
  {
    "type": "delete",
    "url": "/api/readings/reading/:id",
    "title": "Delete Reading By ID",
    "name": "DeleteReadingByID",
    "group": "Readings",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "response",
            "description": "<p>Response Information</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.message",
            "description": "<p>Response Message</p>"
          },
          {
            "group": "Success 200",
            "type": "Reading",
            "optional": false,
            "field": "response.data",
            "description": "<p>The deleted reading.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.data.timestamp",
            "description": "<p>The timestamp of the reading's creation.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.data.sensor_id",
            "description": "<p>The ID of the sensor that generated the reading.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "response.data.value",
            "description": "<p>The measurement value of the reading.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.code",
            "description": "<p>Response Code</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "response.timestamp",
            "description": "<p>Response Timestamp</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response",
          "content": "\"response\": {\n     \"message\": \"Reading removed successfully.\",\n     \"data\": {\n         \"_id\": \"57c263e6daedcf141264448b\",\n         \"timestamp\": \"2016-08-28T04:08:40.000Z\",\n         \"sensor_id\": \"57c257ee9f8d16fc037d7cc0\",\n         \"value\": 500,\n         \"__v\": 0\n     },\n     \"code\": \"400\",\n     \"route\": \"readings\",\n     \"timestamp\": \"Sat Aug 27 2016 23:36:38 GMT-0500 (Central Daylight Time)\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api/readings.js",
    "groupTitle": "Readings"
  },
  {
    "type": "get",
    "url": "/api/readings/count",
    "title": "Request Count of Readings",
    "name": "GetCountOfReadings",
    "group": "Readings",
    "permission": [
      {
        "name": "none"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "response",
            "description": "<p>Response Information</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.message",
            "description": "<p>Response Message</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "response.data",
            "description": "<p>The count of all readings stored.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.code",
            "description": "<p>Response Code</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "response.timestamp",
            "description": "<p>Response Timestamp</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response",
          "content": "\"response\": {\n  \"message\": \"Your request was processed successfully.\",\n  \"data\": 0,\n  \"code\": \"400\",\n  \"route\": \"readings\",\n  \"timestamp\": \"Sat Aug 27 2016 23:40:31 GMT-0500 (Central Daylight Time)\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api/readings.js",
    "groupTitle": "Readings"
  },
  {
    "type": "get",
    "url": "/api/readings/sensor:id/count",
    "title": "Request the Count of Readings By Sensor ID",
    "name": "GetCountOfReadingsBySensorID",
    "group": "Readings",
    "permission": [
      {
        "name": "none"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "response",
            "description": "<p>Response Information</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.message",
            "description": "<p>Response Message</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "response.data",
            "description": "<p>The count of readings generated by the sensor with the given ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.code",
            "description": "<p>Response Code</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "response.timestamp",
            "description": "<p>Response Timestamp</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response",
          "content": "\"response\": {\n     \"message\": \"Your request was processed successfully.\",\n     \"data\": 1,\n     \"code\": \"400\",\n     \"route\": \"readings\",\n     \"timestamp\": \"Sat Aug 27 2016 23:16:24 GMT-0500 (Central Daylight Time)\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api/readings.js",
    "groupTitle": "Readings"
  },
  {
    "type": "get",
    "url": "/api/readings/reading/:id",
    "title": "Request Reading By ID",
    "name": "GetReadingByID",
    "group": "Readings",
    "permission": [
      {
        "name": "none"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "response",
            "description": "<p>Response Information</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.message",
            "description": "<p>Response Message</p>"
          },
          {
            "group": "Success 200",
            "type": "Reading",
            "optional": false,
            "field": "response.data",
            "description": "<p>A reading with the given ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.data.timestamp",
            "description": "<p>The timestamp of the reading's creation.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.data.sensor_id",
            "description": "<p>The ID of the sensor that generated the reading.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "response.data.value",
            "description": "<p>The measurement value of the reading.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.code",
            "description": "<p>Response Code</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "response.timestamp",
            "description": "<p>Response Timestamp</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response",
          "content": "\"response\": {\n  \"message\": \"Your request was processed successfully.\",\n  \"data\": [\n    {\n      \"_id\": \"57c263e6daedcf141264448b\",\n      \"timestamp\": \"2016-08-28T04:08:40.000Z\",\n      \"sensor_id\": \"57c257ee9f8d16fc037d7cc0\",\n      \"value\": 21,\n      \"__v\": 0\n    }\n  ],\n  \"code\": \"400\",\n  \"route\": \"readings\",\n  \"timestamp\": \"Sat Aug 27 2016 23:18:23 GMT-0500 (Central Daylight Time)\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api/readings.js",
    "groupTitle": "Readings"
  },
  {
    "type": "get",
    "url": "/api/readings",
    "title": "Request the Last Hundred Readings.",
    "name": "GetReadings",
    "group": "Readings",
    "permission": [
      {
        "name": "none"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "response",
            "description": "<p>Response Information</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.message",
            "description": "<p>Response Message</p>"
          },
          {
            "group": "Success 200",
            "type": "Reading[]",
            "optional": false,
            "field": "response.data",
            "description": "<p>An array of up to the last hundred readings.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.code",
            "description": "<p>Response Code</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "response.timestamp",
            "description": "<p>Response Timestamp</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response",
          "content": "\"response\": {\n     \"message\": \"Your request was processed successfully.\",\n     \"data\": [\n         {\n             \"_id\": \"57c263e6daedcf141264448b\",\n             \"timestamp\": \"2016-08-28T04:08:40.000Z\",\n             \"sensor_id\": \"57c257ee9f8d16fc037d7cc0\",\n             \"value\": 21,\n             \"__v\": 0\n         }\n     ],\n     \"code\": \"400\",\n     \"route\": \"readings\",\n     \"timestamp\": \"Sat Aug 27 2016 23:11:44 GMT-0500 (Central Daylight Time)\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api/readings.js",
    "groupTitle": "Readings"
  },
  {
    "type": "get",
    "url": "/api/readings/sensor/:id",
    "title": "Request Readings By Sensor ID",
    "name": "GetReadingsBySensorID",
    "group": "Readings",
    "permission": [
      {
        "name": "none"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "response",
            "description": "<p>Response Information</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.message",
            "description": "<p>Response Message</p>"
          },
          {
            "group": "Success 200",
            "type": "Reading[]",
            "optional": false,
            "field": "response.data",
            "description": "<p>An array of readings generated by the sensor with the given ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.code",
            "description": "<p>Response Code</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "response.timestamp",
            "description": "<p>Response Timestamp</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response",
          "content": "\"response\": {\n     \"message\": \"Your request was processed successfully.\",\n     \"data\": [\n         {\n             \"_id\": \"57c263e6daedcf141264448b\",\n             \"timestamp\": \"2016-08-28T04:08:40.000Z\",\n             \"sensor_id\": \"57c257ee9f8d16fc037d7cc0\",\n             \"value\": 21,\n             \"__v\": 0\n         }\n     ],\n     \"code\": \"400\",\n     \"route\": \"readings\",\n     \"timestamp\": \"Sat Aug 27 2016 23:14:08 GMT-0500 (Central Daylight Time)\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api/readings.js",
    "groupTitle": "Readings"
  },
  {
    "type": "post",
    "url": "/api/readings",
    "title": "Submit a Reading.",
    "name": "PostReading",
    "group": "Readings",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "examples": [
      {
        "title": "Reading Schema",
        "content": "{\n   \"sensor_id\": \"57c257ee9f8d16fc037d7cc0\",\n   \"value\": \"21\",\n   \"timestamp\": \"Sat Aug 27 2016 23:08:40 GMT-0500 (Central Daylight Time)\"\n}",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "response",
            "description": "<p>Response Information</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.message",
            "description": "<p>Response Message</p>"
          },
          {
            "group": "Success 200",
            "type": "Reading",
            "optional": false,
            "field": "response.data",
            "description": "<p>The saved reading.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.data.timestamp",
            "description": "<p>The timestamp of the reading's creation.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.data.sensor_id",
            "description": "<p>The ID of the sensor that generated the reading.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "response.data.value",
            "description": "<p>The measurement value of the reading.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.code",
            "description": "<p>Response Code</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "response.timestamp",
            "description": "<p>Response Timestamp</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response",
          "content": "\"response\": {\n     \"message\": \"Reading registered successfully!\",\n     \"data\": {\n         \"__v\": 0,\n         \"timestamp\": \"2016-08-28T04:08:40.000Z\",\n         \"sensor_id\": \"57c257ee9f8d16fc037d7cc0\",\n         \"value\": 21,\n         \"_id\": \"57c263e6daedcf141264448b\"\n     },\n     \"code\": \"400\",\n     \"route\": \"readings\",\n     \"timestamp\": \"Sat Aug 27 2016 23:09:10 GMT-0500 (Central Daylight Time)\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api/readings.js",
    "groupTitle": "Readings"
  },
  {
    "type": "put",
    "url": "/api/readings/reading/:id",
    "title": "Update Reading By ID",
    "name": "UpdateReadingByID",
    "group": "Readings",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "examples": [
      {
        "title": "Update Reading Schema",
        "content": "{\n  \"sensor_id\": \"57c257ee9f8d16fc037d7cc0\",\n  \"value\": \"500\",\n  \"timestamp\": \"Sat Aug 27 2016 23:08:40 GMT-0500 (Central Daylight Time)\"\n}",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "response",
            "description": "<p>Response Information</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.message",
            "description": "<p>Response Message</p>"
          },
          {
            "group": "Success 200",
            "type": "Reading",
            "optional": false,
            "field": "response.data",
            "description": "<p>The updated reading.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.data.timestamp",
            "description": "<p>The timestamp of the reading's creation.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.data.sensor_id",
            "description": "<p>The ID of the sensor that generated the reading.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "response.data.value",
            "description": "<p>The measurement value of the reading.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.code",
            "description": "<p>Response Code</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "response.timestamp",
            "description": "<p>Response Timestamp</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response",
          "content": "\"response\": {\n     \"message\": \"Reading updated successfully.\",\n     \"data\": {\n         \"_id\": \"57c263e6daedcf141264448b\",\n         \"timestamp\": \"2016-08-28T04:08:40.000Z\",\n         \"sensor_id\": \"57c257ee9f8d16fc037d7cc0\",\n         \"value\": 500,\n         \"__v\": 0\n     },\n     \"code\": \"400\",\n     \"route\": \"readings\",\n     \"timestamp\": \"Sat Aug 27 2016 23:32:49 GMT-0500 (Central Daylight Time)\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api/readings.js",
    "groupTitle": "Readings"
  },
  {
    "type": "post",
    "url": "/api/register",
    "title": "Register",
    "name": "Register",
    "group": "Register",
    "permission": [
      {
        "name": "Registration Key Required & Development Mode Enabled"
      }
    ],
    "examples": [
      {
        "title": "Registration Schema",
        "content": "{\n     \"username\": \"administrator\",\n     \"password\": \"fishy\",\n     \"registration_key\": \"UTRocks\"\n}",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "User",
            "optional": false,
            "field": "User",
            "description": "<p>The user registered. Note: Password field is not sent for security purposes.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example",
          "content": "\"response\": {\n     \"message\": \"Welcome! You've been successfully registered.\",\n     \"data\": {\n         \"__v\": 0,\n         \"username\": \"username\",\n         \"_id\": \"57c2560a9f8d16fc037d7cbf\"\n     },\n     \"code\": \"400\",\n     \"route\": \"register\",\n     \"timestamp\": \"Sat Aug 27 2016 22:10:03 GMT-0500 (Central Daylight Time)\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api/register.js",
    "groupTitle": "Register"
  },
  {
    "type": "delete",
    "url": "/api/sensors/sensor/:id",
    "title": "Delete a Sensor",
    "name": "DeleteSensor",
    "group": "Sensors",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "response",
            "description": "<p>Response Information</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.message",
            "description": "<p>Response Message</p>"
          },
          {
            "group": "Success 200",
            "type": "Sensor",
            "optional": false,
            "field": "response.data",
            "description": "<p>The sensor deleted.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.data.sensor_name",
            "description": "<p>The name of the sensor.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.data.reading_measurement",
            "description": "<p>The type of measurement the sensor makes.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.data.reading_units",
            "description": "<p>The measurement units the sensor's readings are reported in.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.data.serial_number",
            "description": "<p>The serial number of the sensor.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.data.description",
            "description": "<p>A brief description of the sensor.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.data.title",
            "description": "<p>The title to be used for the sensor's data plot.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.data.last_reading",
            "description": "<p>A timestamp of the last reading time.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.code",
            "description": "<p>Response Code</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "response.timestamp",
            "description": "<p>Response Timestamp</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response",
          "content": "\"response\": {\n  \"message\": \"Sensor removed successfully.\",\n  \"data\": {\n    \"_id\": \"57c257ee9f8d16fc037d7cc0\",\n    \"sensor_name\": \"floating_raft_temperature\",\n    \"reading_measurement\": \"Temperature\",\n    \"reading_units\": \"°C\",\n    \"serial_number\": \"777-777-777\",\n    \"description\": \"The Floating Raft System's Temperature Sensor.\",\n    \"title\": \"****************\",\n    \"last_reading\": \"2016-08-28T04:09:10.000Z\",\n    \"__v\": 0\n  },\n  \"code\": \"400\",\n  \"route\": \"sensors\",\n  \"timestamp\": \"Sat Aug 27 2016 23:43:47 GMT-0500 (Central Daylight Time)\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api/sensors.js",
    "groupTitle": "Sensors"
  },
  {
    "type": "get",
    "url": "/api/sensors/count",
    "title": "Request the Count of Sensors",
    "name": "GetCountOfSensors",
    "group": "Sensors",
    "permission": [
      {
        "name": "none"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "response",
            "description": "<p>Response Information</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.message",
            "description": "<p>Response Message</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "response.data",
            "description": "<p>The count of all sensors stored.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.code",
            "description": "<p>Response Code</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "response.timestamp",
            "description": "<p>Response Timestamp</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response",
          "content": "\"response\": {\n     \"message\": \"Your request was processed successfully.\",\n     \"data\": 1,\n     \"code\": \"400\",\n     \"route\": \"sensors\",\n     \"timestamp\": \"Sat Aug 27 2016 22:49:56 GMT-0500 (Central Daylight Time)\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api/sensors.js",
    "groupTitle": "Sensors"
  },
  {
    "type": "get",
    "url": "/api/sensors/sensor/:id",
    "title": "Request a Sensor By ID",
    "name": "GetSensorByID",
    "group": "Sensors",
    "permission": [
      {
        "name": "none"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "response",
            "description": "<p>Response Information</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.message",
            "description": "<p>Response Message</p>"
          },
          {
            "group": "Success 200",
            "type": "Sensor",
            "optional": false,
            "field": "response.data",
            "description": "<p>The sensor with the ID provided.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.data.sensor_name",
            "description": "<p>The name of the sensor.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.data.reading_measurement",
            "description": "<p>The type of measurement the sensor makes.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.data.reading_units",
            "description": "<p>The measurement units the sensor's readings are reported in.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.data.serial_number",
            "description": "<p>The serial number of the sensor.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.data.description",
            "description": "<p>A brief description of the sensor.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.data.title",
            "description": "<p>The title to be used for the sensor's data plot.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.data.last_reading",
            "description": "<p>A timestamp of the last reading time.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.code",
            "description": "<p>Response Code</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "response.timestamp",
            "description": "<p>Response Timestamp</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response",
          "content": "\"response\": {\n     \"message\": \"Your request was processed successfully.\",\n     \"data\": {\n         \"_id\": \"57c257ee9f8d16fc037d7cc0\",\n         \"sensor_name\": \"floating_raft_temperature\",\n         \"reading_measurement\": \"Temperature\",\n         \"reading_units\": \"°C\",\n         \"serial_number\": \"777-777-777\",\n         \"description\": \"The Floating Raft System's Temperature Sensor.\",\n         \"title\": \"Floating Raft Temperature\",\n         \"last_reading\": \"2016-08-28T03:18:06.000Z\",\n         \"__v\": 0\n     },\n     \"code\": \"400\",\n     \"route\": \"sensors\",\n     \"timestamp\": \"Sat Aug 27 2016 22:51:22 GMT-0500 (Central Daylight Time)\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api/sensors.js",
    "groupTitle": "Sensors"
  },
  {
    "type": "get",
    "url": "/api/sensors/name/:sensor_name",
    "title": "Request a Sensor By Name",
    "name": "GetSensorByName",
    "group": "Sensors",
    "permission": [
      {
        "name": "none"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "response",
            "description": "<p>Response Information</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.message",
            "description": "<p>Response Message</p>"
          },
          {
            "group": "Success 200",
            "type": "Sensor",
            "optional": false,
            "field": "response.data",
            "description": "<p>A sensor that has the name provided.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.data.sensor_name",
            "description": "<p>The name of the sensor.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.data.reading_measurement",
            "description": "<p>The type of measurement the sensor makes.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.data.reading_units",
            "description": "<p>The measurement units the sensor's readings are reported in.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.data.serial_number",
            "description": "<p>The serial number of the sensor.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.data.description",
            "description": "<p>A brief description of the sensor.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.data.title",
            "description": "<p>The title to be used for the sensor's data plot.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.data.last_reading",
            "description": "<p>A timestamp of the last reading time.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.code",
            "description": "<p>Response Code</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "response.timestamp",
            "description": "<p>Response Timestamp</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response",
          "content": "\"response\": {\n     \"message\": \"Your request was processed successfully.\",\n     \"data\": {\n         \"_id\": \"57c257ee9f8d16fc037d7cc0\",\n         \"sensor_name\": \"floating_raft_temperature\",\n         \"reading_measurement\": \"Temperature\",\n         \"reading_units\": \"°C\",\n         \"serial_number\": \"777-777-777\",\n         \"description\": \"The Floating Raft System's Temperature Sensor.\",\n         \"title\": \"Floating Raft Temperature\",\n         \"last_reading\": \"2016-08-28T03:18:06.000Z\",\n         \"__v\": 0\n     },\n     \"code\": \"400\",\n     \"route\": \"sensors\",\n     \"timestamp\": \"Sat Aug 27 2016 22:51:22 GMT-0500 (Central Daylight Time)\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api/sensors.js",
    "groupTitle": "Sensors"
  },
  {
    "type": "get",
    "url": "/api/sensors/serial-number/:serial_number",
    "title": "Request a Sensor By Serial Number",
    "name": "GetSensorBySerialNumber",
    "group": "Sensors",
    "permission": [
      {
        "name": "none"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "response",
            "description": "<p>Response Information</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.message",
            "description": "<p>Response Message</p>"
          },
          {
            "group": "Success 200",
            "type": "Sensor",
            "optional": false,
            "field": "response.data",
            "description": "<p>A sensor that has the serial number provided.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.data.sensor_name",
            "description": "<p>The name of the sensor.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.data.reading_measurement",
            "description": "<p>The type of measurement the sensor makes.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.data.reading_units",
            "description": "<p>The measurement units the sensor's readings are reported in.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.data.serial_number",
            "description": "<p>The serial number of the sensor.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.data.description",
            "description": "<p>A brief description of the sensor.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.data.title",
            "description": "<p>The title to be used for the sensor's data plot.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.data.last_reading",
            "description": "<p>A timestamp of the last reading time.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.code",
            "description": "<p>Response Code</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "response.timestamp",
            "description": "<p>Response Timestamp</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response",
          "content": "\"response\": {\n     \"message\": \"Your request was processed successfully.\",\n     \"data\": {\n         \"_id\": \"57c257ee9f8d16fc037d7cc0\",\n         \"sensor_name\": \"floating_raft_temperature\",\n         \"reading_measurement\": \"Temperature\",\n         \"reading_units\": \"°C\",\n         \"serial_number\": \"777-777-777\",\n         \"description\": \"The Floating Raft System's Temperature Sensor.\",\n         \"title\": \"Floating Raft Temperature\",\n         \"last_reading\": \"2016-08-28T03:18:06.000Z\",\n         \"__v\": 0\n     },\n     \"code\": \"400\",\n     \"route\": \"sensors\",\n     \"timestamp\": \"Sat Aug 27 2016 22:51:22 GMT-0500 (Central Daylight Time)\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api/sensors.js",
    "groupTitle": "Sensors"
  },
  {
    "type": "get",
    "url": "/api/sensors",
    "title": "Request All Sensors.",
    "name": "GetSensors",
    "group": "Sensors",
    "permission": [
      {
        "name": "none"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "response",
            "description": "<p>Response Information</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.message",
            "description": "<p>Response Message</p>"
          },
          {
            "group": "Success 200",
            "type": "Sensor[]",
            "optional": false,
            "field": "response.data",
            "description": "<p>An array of the sensors stored.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.code",
            "description": "<p>Response Code</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "response.timestamp",
            "description": "<p>Response Timestamp</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response",
          "content": "\"response\": {\n     \"message\": \"Your request was processed successfully.\",\n     \"data\": [\n         {\n             \"_id\": \"57c257ee9f8d16fc037d7cc0\",\n             \"sensor_name\": \"floating_raft_temperature\",\n             \"reading_measurement\": \"Temperature\",\n             \"reading_units\": \"°C\",\n             \"serial_number\": \"777-777-777\",\n             \"description\": \"The Floating Raft System's Temperature Sensor.\",\n             \"title\": \"****************\",\n             \"last_reading\": \"2016-08-28T03:18:06.000Z\",\n             \"__v\": 0\n         }\n     ],\n     \"code\": \"400\",\n     \"route\": \"sensors\",\n     \"timestamp\": \"Sat Aug 27 2016 22:46:34 GMT-0500 (Central Daylight Time)\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api/sensors.js",
    "groupTitle": "Sensors"
  },
  {
    "type": "post",
    "url": "/api/sensors",
    "title": "Submit a Sensor.",
    "name": "PostSensors",
    "group": "Sensors",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "examples": [
      {
        "title": "Sensor Schema",
        "content": "{\n     \"sensor_name\": \"floating_raft_temperature\",\n     \"reading_measurement\": \"Temperature\",\n     \"reading_units\": \"°C\",\n     \"serial_number\": \"777-777-7777\",\n     \"description\": \"The Floating Raft System's Temperature Sensor.\",\n     \"title\": \"Floating Raft Temperature\"\n}",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "response",
            "description": "<p>Response Information</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.message",
            "description": "<p>Response Message</p>"
          },
          {
            "group": "Success 200",
            "type": "Sensor",
            "optional": false,
            "field": "response.data",
            "description": "<p>The saved sensor.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.data.sensor_name",
            "description": "<p>The name of the sensor.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.data.reading_measurement",
            "description": "<p>The type of measurement the sensor makes.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.data.reading_units",
            "description": "<p>The measurement units the sensor's readings are reported in.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.data.serial_number",
            "description": "<p>The serial number of the sensor.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.data.description",
            "description": "<p>A brief description of the sensor.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.data.title",
            "description": "<p>The title to be used for the sensor's data plot.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.data.last_reading",
            "description": "<p>A timestamp of the last reading time.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.code",
            "description": "<p>Response Code</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "response.timestamp",
            "description": "<p>Response Timestamp</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example",
          "content": "\"response\": {\n     \"message\": \"Sensor registered successfully!\",\n     \"data\": {\n          \"__v\": 0,\n          \"sensor_name\": \"floating_raft_temperature\",\n          \"reading_measurement\": \"Temperature\",\n          \"reading_units\": \"°C\",\n          \"serial_number\": \"777-777-7777\",\n          \"description\": \"The Floating Raft System's Temperature Sensor.\",\n          \"title\": \"Floating Raft Temperature\",\n          \"last_reading\": \"2016-08-28T03:18:06.000Z\",\n          \"_id\": \"57c257ee9f8d16fc037d7cc0\"\n     },\n     \"code\": \"400\",\n     \"route\": \"sensors\",\n     \"timestamp\": \"Sat Aug 27 2016 22:18:06 GMT-0500 (Central Daylight Time)\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api/sensors.js",
    "groupTitle": "Sensors"
  },
  {
    "type": "put",
    "url": "/api/sensors/sensor/:id",
    "title": "Update a Sensor",
    "name": "UpdateSensor",
    "group": "Sensors",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "examples": [
      {
        "title": "Update Sensor Schema",
        "content": "{\n      \"sensor_name\": \"floating_raft_temperature\",\n      \"reading_measurement\": \"Temperature\",\n      \"reading_units\": \"°C\",\n      \"serial_number\": \"777-777-777\",\n      \"description\": \"The Floating Raft System's Temperature Sensor.\",\n      \"title\": \"****************\"\n}",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "response",
            "description": "<p>Response Information</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.message",
            "description": "<p>Response Message</p>"
          },
          {
            "group": "Success 200",
            "type": "Sensor",
            "optional": false,
            "field": "response.data",
            "description": "<p>The updated sensor.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.data.sensor_name",
            "description": "<p>The name of the sensor.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.data.reading_measurement",
            "description": "<p>The type of measurement the sensor makes.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.data.reading_units",
            "description": "<p>The measurement units the sensor's readings are reported in.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.data.serial_number",
            "description": "<p>The serial number of the sensor.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.data.description",
            "description": "<p>A brief description of the sensor.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.data.title",
            "description": "<p>The title to be used for the sensor's data plot.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.data.last_reading",
            "description": "<p>A timestamp of the last reading time.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.code",
            "description": "<p>Response Code</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "response.timestamp",
            "description": "<p>Response Timestamp</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Response",
          "content": "\"response\": {\n     \"message\": \"Sensor updated successfully.\",\n     \"data\": {\n         \"_id\": \"57c257ee9f8d16fc037d7cc0\",\n         \"sensor_name\": \"floating_raft_temperature\",\n         \"reading_measurement\": \"Temperature\",\n         \"reading_units\": \"°C\",\n         \"serial_number\": \"777-777-777\",\n         \"description\": \"The Floating Raft System's Temperature Sensor.\",\n         \"title\": \"****************\",\n         \"last_reading\": \"2016-08-28T03:18:06.000Z\",\n         \"__v\": 0\n     },\n     \"code\": \"400\",\n     \"route\": \"sensors\",\n     \"timestamp\": \"Sat Aug 27 2016 22:42:17 GMT-0500 (Central Daylight Time)\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api/sensors.js",
    "groupTitle": "Sensors"
  }
] });
