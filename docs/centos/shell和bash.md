##### 什么是shell,什么是bash?

管理计算机硬件的其实是内核，用户正是通过**shell**来跟内核通信的,从本质上说shell是一个能执行各种命令的宏处理器。而bash（/bin/bash）就是linux默认的shell。



## shell脚本

 linux中.sh文件是***\*脚本文件\****，一般都是bash脚本。



**inux中的.sh文件怎么执行？**

1、直接./加上文件名.sh，如运行hello.sh为  ***\*./hello.sh\**** 【绝对路径下也可以，但hello.sh必须有x权限】

```bash
./hello.sh
```



2、直接sh 加上文件名.sh，如运行hello.sh为 ***\*sh hello.sh\****【hello.sh可以没有x权限】

```shell
sh hello.sh
```

