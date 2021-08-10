# H5-Editor

基于Svelte搭建的编辑器项目,通过可视化拖动创建Canvas,可以进行预览与导出.

### DEMO
---

[https://gopowerteam.github.io/app.h5-editor](https://gopowerteam.github.io/app.h5-editor)


### 技术栈
---

* svelte
* konva
* vite
* @easyroute/svelte
* @storeon/svelte
* tailwindcss

### 项目运行
---

因为图片以及登录部分使用`cloudbase`实现,所有运行项目需要添加`cloudbase`配置

``` yaml
VITE_CLOUDBASE_ENV=<cloudbase 环境ID>
VITE_CLOUDBASE_REGION=<cloudbase region>
```


