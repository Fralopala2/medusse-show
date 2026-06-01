var path = 'c:\\Users\\spano\\Documents\\PROYECTOS\\medusse-show\\docker\\grafana\\dashboards\\medusse-clean.json';
var stream = new ActiveXObject('ADODB.Stream');
stream.Type = 1;
stream.Open();
stream.LoadFromFile(path);
var bytes = stream.Read(8);
stream.Close();
var out = [];
for (var i = 0; i < bytes.length; i++) {
  var b = bytes.charCodeAt(i) & 0xFF;
  out.push(('0' + b.toString(16)).slice(-2));
}
WScript.Echo(out.join(' '));
