// Shared Three.js loader — loads Three.js from CDN with fallbacks
let _THREE = null;

export async function loadThree() {
  if (_THREE) return _THREE;
  const sources = [
    'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js',
    'https://unpkg.com/three@0.160.0/build/three.module.js',
    'https://esm.sh/three@0.160.0'
  ];
  let lastError;
  for (const url of sources) {
    document.body.dataset.bootStage = '正在加载 Three.js：' + url;
    try {
      _THREE = await import(url);
      return _THREE;
    } catch (error) {
      lastError = error;
      console.warn('[Mini City 3D] Three.js CDN failed:', url, error);
    }
  }
  const message = 'Three.js 加载失败，已尝试 jsDelivr、unpkg、esm.sh。请检查网络或 CDN 访问。\n' + (lastError && lastError.message ? lastError.message : String(lastError));
  const panel = document.getElementById('boot-diagnostic'), detail = document.getElementById('boot-diagnostic-message');
  if (panel && detail) { panel.style.display = 'block'; detail.textContent = message; }
  throw lastError || new Error(message);
}
