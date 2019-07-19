初始化git仓库：git init

配置使用者的用户名和邮箱
配置全局用户名：git config --global user.name "xiaoming"
配置全局邮  箱：git config --global user.email "xiaoming@139.com"
删除配置的用户名和邮箱：git config --global --unset user.name

把代码放到Git仓库
1.添加修改文件到git的门口，命令`git add 修改的文件名`
2.将门口代码提交到仓库中 `git commit -m '提交了一次文件'`

更新一次文件，重复上次操作

多个文件统一上传
第一步：`git add .`
第二部：`git commit --all -m "提交说明"`

设置忽略文件
新建.gitignore文件配置需要忽略的文件路径。
语法`/.idea`,`/.gitignore` {以斜杠（/）开头}
`/.idea`  		忽略.idea文件
`/js`  			忽略js文件夹里面的所有文件
`/js/*.js`  		忽略js文件夹里面的所有js文件

查看日志
`git log`  		查看历史提交的日志
`git log --oneline`  	查看历史提交的日志(简洁版)

版本回退
`git reset --hard HEAD~0`  	回退到当前版本
`git reset --hard HEAD~1`  	回退到前一个版本
`git reset --hard HEAD~2`  	回退到前两个版本


