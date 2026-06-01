Set fso = CreateObject("Scripting.FileSystemObject")
scriptDir = fso.GetParentFolderName(WScript.ScriptFullName)
projectRoot = fso.GetParentFolderName(scriptDir)
logDir = projectRoot & "\logs"

If Not fso.FolderExists(logDir) Then
  fso.CreateFolder(logDir)
End If

Set WshShell = CreateObject("WScript.Shell")
WshShell.CurrentDirectory = projectRoot
cmd = "cmd /c chcp 65001 >nul & set PYTHONIOENCODING=utf-8& set PYTHONUTF8=1& set PYTHONUNBUFFERED=1& py -3.12 -u arduino\medusse_simulator.py >> """ & logDir & "\simulator.log"" 2>&1"
WshShell.Run cmd, 0, False
