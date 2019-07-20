初始化git仓库：git init

配置使用者的用户名和邮箱
配置全局用户名：git config --global user.name "xiaoming"
配置全局邮  箱：git config --global user.email "xiaoming@139.com"
删除配置的用户名和邮箱：git config --global --unset user.name

把代码放到Git仓库
1.添加修改文件到git的门口，命令`git add 修改的文件名`
2.将门口代码提交到仓库中 `git commit -m '提交了一次文件'`

多个文件统一上传
第一步：`git add .`
第二部：`git commit --all -m "提交说明"`

设置忽略文件
新建.gitignore文件配置需要忽略的文件路径。
语法`/.idea`,`/.gitignore` {以斜杠（/）开头}
`/.idea`  		忽略.idea文件
`/js`  			忽略js文件夹里面的所有文件
`/js/*.js`  		忽略js文件夹里面的所有js文件

查看日志，可以获得所有版本的版本号
`git log`  		查看历史提交的日志
`git log --oneline`  	查看历史提交的日志(简洁版)
`git reflog`  		查看历史日志操作记录

版本回退
`git reset --hard HEAD~0`  	回退到当前版本
`git reset --hard HEAD~1`  	回退到上一个版本
`git reset --hard HEAD~2`  	回退到上上个版本
也可以根据每一次提交的版本的版本号回退
`git reset --hard 版本号`  	回退到这个版本号的版本

创建分支
`git branch dev`		创建一个新分支dev
查看分支
`git branch`			查看当前有哪些分支
切换分支
`git checkout dev`		切换到指定分支dev
合并分支
`git merge dev`			合并分支dev

将代码提交到GitHub上：git push(推)
将代码下载到本    地：git pull(拉)

git remote add origin https://github.com/morning-light-h/git_day01.git
git push -u origin master