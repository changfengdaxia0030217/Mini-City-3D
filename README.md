# Mini City 3D

一个基于浏览器运行的轻量级第三人称 3D 城市游戏原型，持续迭代上海外滩场景、人物控制、车辆驾驶与 NPC/战斗体验。

- **在线体验：** https://changfengdaxia0030217.github.io/Mini-City-3D/
- **GitHub 仓库：** https://github.com/changfengdaxia0030217/Mini-City-3D
- **开发历程与技术文档：** [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md)

## 项目现状

- Three.js + HTML/CSS/JavaScript，主要游戏逻辑目前位于 `index.html`。
- 支持第三人称人物与车辆玩法，场景正向卡通上海外滩风格演进。
- 重点地标包括浦东天际线、外滩建筑、黄浦江、拱桥与观光游轮元素。
- 持续优化 NPC、车辆、几何体复用、阴影与渲染分辨率，避免过多装饰物影响性能。
- GitHub Pages 通过 `.github/workflows/pages.yml` 自动部署。

## 本地运行

这是静态网页项目。可直接通过浏览器打开 `index.html`，或使用任意本地静态文件服务器运行。部分浏览器和外部模型资源可能需要通过 HTTP 服务加载，推荐使用本地开发服务器。

## 开发说明

开始开发前请先阅读 [开发文档](docs/DEVELOPMENT.md)，其中记录了项目从初始原型至今的主要演进、关键提交、测试清单、已知问题和后续路线。修改后请检查 GitHub Actions 中的 Pages 部署状态，并在浏览器实际验证人物移动、车辆上下车、准星射击及场景性能。