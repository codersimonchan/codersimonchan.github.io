---
layout: post
title: SVN
tags: VControl
---
[TOC]

[Video](https://www.bilibili.com/video/BV1k4411m7mP?p=5)
[Note](https://easydoc.top/s/78711005/uSJD1CDg/60815798)


对我们上传更新的每个文件进行tortoise SVN-->go diff检查，检查我们在本地版本上进行了哪些更新操作。next difference， 直到确认所有的更新都是我们自己做的且想保留的。如果发现不是我们自己做的更新，或者不想保留的更新，那么需要use left，and then save the document. after that close this file.也可以一起上传之后，在提交页面变更列表中，双击文件查看差异。查看具体更新了哪些内容。这样在更新多个文件时，更加方便查看。

## checkout拉取

和远程仓库建立连接，一旦建立连接，就会变成绿色勾的文件夹，说明文件内容已经同步。checkout 检出操作： 1.连接到服务器 2.第一次链接的时候更新数据到本地，后面使用update（更新指令）

## 新增文件

直接拷贝文件到SVN客户端文件夹, 我们可以tortoise SVN-->add，也可以在提交的时候，前面打勾解决这个问题。

## Commit提交文件

记得update文件，leave message。
last step, we need to commit our branches V1 or trunk folder by right click. We should remember to leave our message before we are going to click ok. Message would be like (SMG218:Catch message - manual replied message was marked as 'Auto-Replied')

## 查看版本信息

右击--》show log可以查看提交的版本信息，版本号时自然数增加，每一个版本修改了哪些文件及其内容。双击可以查看。

## 撤销和恢复：

### 撤销本地修改，并没有提交。

如果发现修改是错误的，在文件上右击，选择Tortoise-》SVN还原，也可以在commit时候，对文件查看后进行右击SVN还原，不过在现在的项目中，没有必要，因为现在的项目都是在testing server上测试过的，test server不通过svn管理，所以在上传的时候文件应该都已经经过了测试。

### 本地撤销已经提交的文件：

在查看提交记录（showlog）时，在相关版本上右击，复原此版本所做出的修改（Revert changes from this version）。只是在本地复原，没有在远程修改，需要重新提交版本。

### 恢复到某个指定的版本：

showlog查看版本信息，在相关版本上右击，复原到此版本（Revert to this version），也只是在本地复原了，并没有在远程修改，查看文件信息后，需要重新提交版本到远程仓库。

### 忽略文件夹或文件：

忽略文件夹右击-》TortoiseSVN-》去除版本控制并增加到忽略列表，然后再次提交。也可以再提交时直接添加到忽略列表。

### 冲突问题:

多个人修改了同个文件同一行；无法进行合并的二进制文件，如图片。如何避免冲突，首先经常update，同步一下他人的代码，二进制文件不要多个人同时操作。即使有了冲突也可以解决，不要怕。

在更新文件时，远程文件与本地文件的同一行内容不一致，会提示冲突，并在本地生成自己的版本和远程版本。在冲突文件上右击，选择编辑冲突，查看冲突行，然后右击，选择使用此文本块。来解决冲突。

## SVN分支：

### 什么时候需要开分支？

当我们需要隔离线上版本和开发版本的时候； 大功能开发，不想影响到其他人，自己独立开个分支去开发。

*分支的创建在远程仓库，所以当依据主干的其中一个版本节点创建一个分支后，需要将分支更新到本地，将分支上的内容拉取到本地对应目录；而分支的合并是在本地发生，所以在分支合并到主干后，需要提交本地trunk版本到远程仓库trunk*
*本地文件夹只是映射了远程仓库的一个目录，并通过SVN进行管理，所以一个文件夹可以进行分支切换，使本地online文件夹能映射不同的分支目录*

### SVN经典目录结构：  

trunk
branches
tags
创建分支是在远程仓库里创建分支TortoiseSVN->Branch/tag，然后需要将分支更新到本地。我们在分支里进行开发和修改，然后提交版本到远程分支。在branches里面提交分支后，可以将branches里面的修改合并到主干上，在branches/v1上版本右击（你在分支上的什么目录点击合并，那就需要定位到主干的对应目录合并，不然会出错。），显示日志，选择需要合并的版本并右击，合并版本到---选择trunk文件夹进行合并。最后需要在主干的根目录下进行版本提交（因为TortoiseSVN的合并发生在本地，即你的working copy中，你无需过多担心会对repository中的代码造成影响。），查看变更，并可以选择最近已提交的信息作为提交信息。

### *暂存：shelve 搁浅，搁置，放到---书架上

比如代码改了很多，突然需要紧急修复一个bug，但是代码还没有写完，不能提交。这样的话可以将代码暂存起来。V1右击》TortoiseSVN-》shelve，使用shelve，这样不会保存本地修改，恢复成和服务器原来的一样了，给暂存取名字，这样当这些文件被其他人更新的时候，其也会一起随着更新，但只有自己未完成的代码仍然得到保存，这样下次想继续开发的时候，可以直接发现自己原来做了哪些更改。右击-》unshelve恢复暂存。

主干开发了新功能，改了很多；分支使线上版本，修复了很多bug。两个分支的代码时间久了差异很大，无法直接合并或者指定提交记录合并代码。此时可以使用beyondCompare 这款软件
