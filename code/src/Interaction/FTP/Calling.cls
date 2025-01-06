Class Interaction.FTP.Calling Extends %RegisteredObject
{

ClassMethod CallFTP()
{
  //建立连接
  Set ftp = ##class(%Net.FtpSession).%New() 
  If 'ftp.Connect("10.146.163.243","it","BOEit123","21") Write "Not connected",! Quit
  Set ftp.Timeout = 10
  Do ftp.Binary() //传输模式设置为二进制模式
  //Do ftp.Ascii() //传输模式设置为ASCII模式

  //创建目录
  Do ftp.MakeDirectory("/dir")

  //上传文件
  Set stream = ##class(%Stream.GlobalCharacter).%New()
  Do stream.Write("This is a test file")
  Do ftp.Store("/dir/file1",stream)
  Do ftp.Store("/dir/file2",stream)

  //追加内容
  Set stream = ##class(%Stream.GlobalCharacter).%New()
  Do stream.Write("Append content")
  Do ftp.Append("/dir/file2", stream)

  //获取文件列表
  Do ftp.NameList("/dir/*", .FileArray)
  For  Write FileArray.GetNext(.key),! Quit:(key="")

  //重命名文件
  Do ftp.Rename("/dir/file1", "/dir/Newfile")

  //读取文件
  Do ftp.Retrieve("/dir/Newfile",.stream)
  Write stream.Read(),!

  //删除文件，目录
  Do ftp.Delete("/dir/Newfile")
  Do ftp.RemoveDirectory("/dir") 

  //关闭连接
  Do ftp.Logout()
  Quit
}

}
