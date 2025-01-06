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
