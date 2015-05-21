var os   = require('os'),
    join = require('path').join,
    exec = require('child_process').exec;

if (parseFloat(os.release()) > 5.2) {
  var data_path = join('AppData', 'Local');
  var documents_path = ['Contacts', 'Documents', 'Downloads', 'Desktop', 'Pictures', 'Videos'];
} else {
  var data_path = 'Application Data';
  var documents_path = ['Desktop', 'My Documents'];
}

exports.paths = {
  keychains: [],
  documents: documents_path,
  emails:    [
    join(data_path, 'Microsoft', 'Outlook'),
    join(data_path, 'Thunderbird', 'Profiles')
  ],
  browsers:  [
    join(data_path, 'Google', 'Chrome'),
    join(data_path, 'Mozilla', 'Firefox', 'Profiles'),
    join(data_path, 'Apple Computer', 'Safari')
  ]
};

// 255 deletes everything, so no need to go one by one
exports.clear_ie = function(cb) {
  exec('RunDll32.exe InetCpl.cpl,ClearMyTracksByProcess 255', cb);
};
