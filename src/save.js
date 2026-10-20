// Save/Load system
export function saveProgress(player, playerCar, playerAvatar, playerVehicle, toast) {
  try {
    const data = {
      player: {
        health: player.health,
        money: player.money,
        weapon: player.weapon,
        ammo: player.ammo,
        level: player.level,
        xp: player.xp,
        completedMissions: player.completedMissions,
        completedJobs: player.completedJobs,
        position: player.position.toArray(),
        rotation: player.rotation
      },
      car: {
        position: playerCar.position.toArray(),
        rotation: playerCar.rotation.y,
        speed: playerCar.userData.speed
      },
      avatar: {
        position: playerAvatar.position.toArray(),
        rotation: playerAvatar.rotation.y
      },
      vehicle: playerVehicle
    };
    localStorage.setItem('miniCity3D_save', JSON.stringify(data));
    toast('进度已保存');
  } catch (e) { console.warn('Save failed', e); }
}

export function loadProgress(player, playerCar, playerAvatar, setPlayerVehicle, toast) {
  try {
    const raw = localStorage.getItem('miniCity3D_save');
    if (!raw) return false;
    const data = JSON.parse(raw);
    if (data.player) {
      player.health = data.player.health;
      player.money = data.player.money;
      player.weapon = data.player.weapon;
      player.ammo = data.player.ammo;
      player.level = data.player.level;
      player.xp = data.player.xp;
      player.completedMissions = data.player.completedMissions || [];
      player.completedJobs = data.player.completedJobs || [];
      player.position.fromArray(data.player.position);
      player.rotation = data.player.rotation;
    }
    if (data.car) {
      playerCar.position.fromArray(data.car.position);
      playerCar.rotation.y = data.car.rotation;
      playerCar.userData.speed = data.car.speed || 0;
    }
    if (data.avatar) {
      playerAvatar.position.fromArray(data.avatar.position);
      playerAvatar.rotation.y = data.avatar.rotation;
    }
    if (data.vehicle) {
      setPlayerVehicle(data.vehicle);
      playerCar.visible = false;
      playerAvatar.visible = true;
      playerAvatar.position.copy(playerCar.position);
    }
    toast('进度已加载');
    return true;
  } catch (e) { console.warn('Load failed', e); return false; }
}
