# %File

```java
Class Interaction.FILE.Calling Extends %RegisteredObject
{

/// Process an input file writing to an output file
ClassMethod ProcessFile()
{
  // Open input file for reading
  Set inputfile = ##class(%File).%New("F:\dir\tmp")
  Set status = inputfile.Open("RU")

  // Open output file for writing
  Set dir = ##class(%File).GetDirectory("F:\dir\tmpNew")
  Do ##class(%File).CreateDirectoryChain(dir)
  Set outputfile = ##class(%File).%New("F:\dir\tmpNew")
  Set status = outputfile.Open("WSN")

  // Loop over each line in the input file
  // Write to the output file
  While (inputfile.AtEnd = 0) {
    Set line = inputfile.ReadLine(,.status)
    If $$$ISERR(status) { 
      Do $SYSTEM.Status.DisplayError(status) 
    }Else {
      Do outputfile.WriteLine(line)
    }
  }
  
  // Close the input and output files
  Do inputfile.Close()
  Do outputfile.Close()
}

ClassMethod CallFile()
{
  //列出目录的内容
  Set stmt = ##class(%SQL.Statement).%New()
  Set status = stmt.%PrepareClassQuery("%File", "FileSet")
  Set rset = stmt.%Execute("F:\IRIS\code\src\Interaction","*","Name")  //Name,Type,Size,DateCreated,DateModified 
  While rset.%Next()
  {
    Write !, rset.%Get("Name")
    Write " ", rset.%Get("Type")
    Write " ", rset.%Get("Size")
  }

  //检查文件和目录的存在
  Write !,##class(%File).Exists("F:\IRIS\code\src\Interaction\XML.cls")
  Write !,##class(%File).DirectoryExists("F:\IRIS\code\src\Interaction\FILE")

  //查看文件属性
  Write !,$ZDATE(##class(%File).GetFileDateCreated("F:\IRIS\code\src\Interaction\XML.cls"),3)
  Write !,$ZDATE(##class(%File).GetFileDateModified("F:\IRIS\code\src\Interaction\XML.cls"),3)
  Write !,##class(%File).GetFileSize("F:\IRIS\code\src\Interaction\XML.cls")

  //创建目录
  Set status = ##class(%File).CreateDirectory("F:\dir", .return)
  Set status = ##class(%File).CreateNewDir("F:\dir", "dir2", .return)
  Set status = ##class(%File).CopyDir("F:\dir1", "F:\dir\dir1", 0, .pCreated, 0) //复制

  //删除目录
  Set status = ##class(%File).RemoveDirectory("F:\dir\dir2", .return)
  Set status = ##class(%File).RemoveDirectoryTree("F:\dir")  //删除目录及其子目录

  //重命名目录
  Set status = ##class(%File).Rename("F:\dir1", "F:\dirNew", .return)

  //复制文件
  Set status = ##class(%File).CopyFile("F:\dirNew\tmp", "F:\dirNew\tmp1", 0, .return)

  //重命名文件
  Set status = ##class(%File).Rename("F:\dirNew\tmp", "F:\dirNew\tmpNew", .return)

  //比较文件
  Set bool = ##class(%File).Compare("F:\dirNew\tmpNew", "F:\dirNew\tmp1") 

  //删除文件
  Set status = ##class(%File).Delete("F:\dirNew\tmp1", .return)
  Set status = ##class(%File).ComplexDelete("F:\dirNew\*", .return)
}

}

```

# %Net.FtpSession

```java
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

```

# %Net.SSH.Session

```java
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

```

