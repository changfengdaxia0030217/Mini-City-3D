// Game constants and configuration
export const PERFORMANCE_SETTINGS = {
  worldHalfSize: 136,
  walkSpeed: 4.4,
  runSpeed: 8.2,
  aimReticleRefreshMs: 120,
  cameraCollisionInterval: 0.05,
  maxAimDistance: 120,
};

export const PLAYER_SETTINGS = {
  jumpImpulse: 7.2,
  defaultCameraPitch: -0.22,
  cameraDistance: 3.8,
};

export const COMBAT_SETTINGS = {
  punchCooldown: 0.42,
  fireCooldown: 0.22,
  aimAssistRadiusNear: 0.16,
  aimAssistRadiusMid: 0.11,
  aimAssistRadiusFar: 0.075,
  flashDurationMs: 130,
};

export const CAMERA_SETTINGS = {
  defaultDistance: PLAYER_SETTINGS.cameraDistance,
  precisionAimDistance: PLAYER_SETTINGS.cameraDistance * 0.78,
  precisionAimOffsetX: -0.92,
  defaultOffsetX: -0.72,
  pitchLowerLimit: -1.15,
  pitchUpperLimit: 0.35,
};

export const VEHICLE_STATS = [
  { name: '街头轿车', maxSpeed: 34, acceleration: 24, grip: 4.6 },
  { name: '烈焰跑车', maxSpeed: 43, acceleration: 29, grip: 3.9 },
  { name: '霓虹跑车', maxSpeed: 49, acceleration: 32, grip: 3.5 },
];

export const VEHICLE_COLORS = [0xf5a623, 0xf04d4d, 0x35b9ff];

export const MISSION_CONFIGS = [
  { name: '新手赛', time: 55, reward: 100, desc: '沿主路穿过 4 个检查点。', points: [{ x: 0, z: -28 }, { x: 0, z: -57 }, { x: 60, z: -60, rot: Math.PI / 2 }, { x: 60, z: -22 }] },
  { name: '街区赛', time: 85, reward: 250, desc: '完成 6 个检查点，挑战连续转弯。', points: [{ x: 0, z: -42 }, { x: 0, z: -60 }, { x: 60, z: -60, rot: Math.PI / 2 }, { x: 60, z: 0 }, { x: 0, z: 60, rot: Math.PI / 2 }, { x: 0, z: 28 }] },
  { name: '极限赛', time: 125, reward: 500, desc: '环绕城市完成 7 个检查点。', points: [{ x: 0, z: -55 }, { x: 60, z: -60, rot: Math.PI / 2 }, { x: 60, z: 60 }, { x: -60, z: 60, rot: Math.PI / 2 }, { x: -60, z: 0 }, { x: 0, z: 0, rot: Math.PI / 2 }, { x: 0, z: -30 }] },
  { name: '金币寻宝', time: 95, reward: 180, desc: '追踪金色路线，穿过 6 个寻宝点。', points: [{ x: 0, z: -18 }, { x: 60, z: -24 }, { x: 60, z: 42 }, { x: 24, z: 60 }, { x: -60, z: 24 }, { x: 0, z: 42 }] },
];

export const CITY_JOB_STOPS = [
  { x: 0, z: -42 }, { x: 0, z: 42 }, { x: 60, z: -24 }, { x: 60, z: 42 },
  { x: -60, z: -24 }, { x: -60, z: 42 }, { x: -24, z: 60 }, { x: 24, z: 60 },
  { x: 24, z: -60 }, { x: -24, z: -60 }, { x: 42, z: 0 }, { x: -42, z: 0 },
];

export const COMBAT_MISSION_GOAL = 3;
export const COMBAT_MISSION_REWARD = 150;

export const TRAFFIC_ROUTES = [
  [{ x: -40, z: -40 }, { x: 40, z: -40 }, { x: 40, z: 40 }, { x: -40, z: 40 }],
  [{ x: 0, z: 0 }, { x: 0, z: -40 }, { x: -40, z: -40 }, { x: -40, z: 0 }],
  [{ x: 0, z: 0 }, { x: 40, z: 0 }, { x: 40, z: 40 }, { x: 0, z: 40 }],
  [{ x: -40, z: 0 }, { x: -40, z: 40 }, { x: 0, z: 40 }, { x: 0, z: 0 }],
];

export const TRAFFIC_PAINTS = [0x39a6ff, 0xef5b58, 0xf1f1e8, 0x52bd83, 0xb18be8, 0xffc24b, 0x4d657c];

export const PICKUP_POSITIONS = [
  [0, -18], [0, -38], [0, -78], [0, 22], [0, 42], [0, 82],
  [60, -24], [60, 24], [60, 42], [-60, -24], [-60, 24], [-60, 42],
  [-24, 60], [24, 60], [42, 60], [-24, -60], [24, -60], [42, -60],
  [-18, 0], [18, 0], [78, 0], [-78, 0],
];

export const BRIDGE_XS = [-100, -60, 0, 60, 100];
export const HUANGPU_BRIDGE_XS = [-65, 65];

export const RIVER_HALF_WIDTH = 4.1;
export const HUANGPU_RIVER_HALF_WIDTH = 28;