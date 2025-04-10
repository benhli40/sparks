const STORAGE_KEY = 'sparks-list';

export function saveSpark(spark) {
  const sparks = loadSparks();
  sparks.unshift(spark);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sparks));
}

export function loadSparks() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
}

export function deleteSparkAt(index) {
  const sparks = loadSparks();
  sparks.splice(index, 1);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sparks));
}