Set fso = CreateObject("Scripting.FileSystemObject")
scriptDir = fso.GetParentFolderName(WScript.ScriptFullName)
projectRoot = fso.GetParentFolderName(scriptDir)
logDir = projectRoot & "\logs"

If Not fso.FolderExists(logDir) Then
  fso.CreateFolder(logDir)
End If

Set WshShell = CreateObject("WScript.Shell")
WshShell.CurrentDirectory = projectRoot & "\web"
cmd = "cmd /c npm run dev >> """ & logDir & "\web.log"" 2>&1"
WshShell.Run cmd, 0, False
