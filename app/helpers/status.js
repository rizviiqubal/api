define(['app', 'underscore'], function (app, _) {

  'use strict';

  return {

    // get all the table status information
    getTableStatuses: function (tableName) {
      return app.statusMapping.get(tableName || '*');
    },

    getTableStatusesMapping: function (tableName) {
      return this.getTableStatuses(tableName).get('mapping');
    },

    getStatus: function (tableName, statusValue) {
      var mapping = this.getTableStatusesMapping(tableName);

      return mapping.get(statusValue);
    },

    getStatusVisible: function (tableName) {
      var mapping = this.getTableStatusesMapping(tableName);
      var status = this.getTableStatuses(tableName);
      var deleteValue = status ? status.get('delete_value') : undefined;
      var statuses = [];

      mapping.each(function (status) {
        var isDelete = deleteValue == status.get('id');

        if (status.get('hidden_globally') !== false && !isDelete) {
          statuses.push(status);
        }
      });

      return statuses;
    },

    isHardDelete: function (tableName, statusValue) {
      var statuses = this.getTableStatuses(tableName);
      var isDeleteValue = statuses.get('delete_value') === statusValue;
      var isHardDeleteStatus = false;

      statuses.get('mapping').each(function (status) {
        if (status.get('id') == statusValue && status.get('hard_delete') === true) {
          isHardDeleteStatus = true;
        }
      });

      return isDeleteValue || isHardDeleteStatus;
    },

    getStatusBackgroundColor: function (tableName, statusValue) {
      var status = this.getStatus(tableName, statusValue);

      return status.get('background_color') || status.get('color') || '#eeeeee';
    },

    getStatusTextColor: function (tableName, statusValue) {
      var status = this.getStatus(tableName, statusValue);

      return status.get('text_color') || '#999999';
    }
  };
});
