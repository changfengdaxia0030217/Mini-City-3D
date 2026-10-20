# Mini City 3D — 开发文档

## 文件拆分结构

```
Mini-City-3D/
├── index.html          # 主入口（HTML + CSS + 入口脚本）
├── src/
│   ├── constants.js    # 游戏常量、配置
│   ├── scene.js        # 场景、光照、地面、道路、河流
│   ├── buildings.js    # 建筑模型（外滩、石库门、玻璃塔）
│   ├── vehicles.js     # 车辆模型、交通 AI、警车
│   ├── pedestrians.js  # NPC 创建、AI、战斗
│   ├── missions.js     # 任务系统、检查点
│   ├── combat.js       # 武器系统、瞄准、伤害
│   ├── ui.js           # HUD、车库、任务面板
│   ├── physics.js      # 碰撞检测、车辆物理
│   └── save.js         # localStorage 存档
├── minimap.js          # 小地图（已独立）
└── server/
    ├── index.js        # Socket.io + Express 后端
    └── package.json    # 依赖配置
```

## 多人游戏架构

### 当前状态
- 前端：`index.html`（单文件，~2410 行）
- 后端：`server/index.js`（Socket.io 实时同步）
- 数据库：内存 Map（演示用）；生产环境建议 MongoDB

### 实时同步数据流
```
客户端浏览器
    ↕ WebSocket (Socket.io)
Node.js 服务器 (port 3001)
    ├── 玩家位置同步 (每帧广播)
    ├── 战斗事件同步 (击中、死亡)
    ├── 任务状态同步
    └── 数据库存储 (MongoDB / Firebase)
```

### 启动多人服务器
```bash
cd server
npm install
npm start
```

服务器运行在 `http://localhost:3001`，WebSocket 端点自动可用。

### 数据库建议（生产环境）
- **MongoDB**：存储玩家存档、任务进度、排行榜
- **Redis**：实时房间状态缓存
- **Firebase**：快速原型（Realtime DB + Auth）
