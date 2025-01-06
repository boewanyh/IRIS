Class Interaction.SSH.Calling Extends %RegisteredObject
{

ClassMethod CallSSH()
{
  //建立连接
  Set ssh = ##class(%Net.SSH.Session).%New()
  Set status = ssh.Connect("10.208.8.5","22")
  Set status = ssh.AuthenticateWithUsername("root","Boeit0983@123")
  Do ssh.SetTimeout(1000)

  //执行命令
  Set command = "uname -a"
  Set status = ssh.Execute(command,.tDevice)

  //SFTP
  Set status = ssh.OpenSFTP(.sftp) //%Net.SSH.SFTP
  //创建目录
  Set status = sftp.MkDir("dir")

  //上传文件
  Set status = sftp.Put("F:\file","dir/file1") 
  Set stream = ##class(%Stream.GlobalCharacter).%New()
  Do stream.Write("This is a test file")
  Set status = sftp.PutStream(stream,"dir/file2")

  //追加内容
  Set stream = ##class(%Stream.GlobalCharacter).%New()
  Do stream.Write("Append content")
  Set status = sftp.PutStream(stream,"dir/file2","0600",1) 

  //获取文件列表
  Set status = sftp.Dir("dir/.",.files)
  Set i=$ORDER(files(""))
  While i'="" {
    Write $LISTGET(files(i),1),!
    Set i=$ORDER(files(i))
  }

  //重命名文件
  Set status = sftp.Rename("dir/file1", "dir/Newfile")
  
  //读取文件
  Set status = sftp.Get("dir/file2","F:\file2")
  Set status = sftp.GetStream("dir/file2",.stream)
  Write stream.Read(),!

  //删除文件，目录
  Set status = sftp.Delete("dir/file2")
  Set status = sftp.RmDir("dir")

  //关闭SFTP
  Set status = sftp.CloseSFTP()

  //关闭连接
  Do ssh.Disconnect()
}

}
