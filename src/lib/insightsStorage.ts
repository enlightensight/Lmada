import fs from 'fs';
import path from 'path';
import { insightsData, type InsightItem } from '@/data/insightsData';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');
const STORAGE_FILE = path.join(DATA_DIR, 'storedInsights.json');

// Helper to ensure the storedInsights.json file exists with initial data
function initializeStorage(): Record<string, InsightItem[]> {
  try {
    if (!fs.existsSync(STORAGE_FILE)) {
      // Write initial default data
      fs.writeFileSync(STORAGE_FILE, JSON.stringify(insightsData, null, 2), 'utf-8');
      return insightsData;
    }
    const raw = fs.readFileSync(STORAGE_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return parsed;
  } catch (err) {
    console.error('Error initializing/reading storedInsights.json:', err);
    return insightsData;
  }
}

export function getAllStoredInsights(): Record<string, InsightItem[]> {
  return initializeStorage();
}

export function getAllStoredInsightList(): InsightItem[] {
  const store = initializeStorage();
  return Object.values(store).flat();
}

export function getStoredInsightBySlug(category: string, slug: string): InsightItem | undefined {
  const store = initializeStorage();
  const catItems = store[category] || [];
  return catItems.find(
    (item) =>
      item.slug.toLowerCase() === slug.toLowerCase() ||
      item.id.toLowerCase() === slug.toLowerCase()
  );
}

export function getStoredInsightsByCategory(category: string): InsightItem[] {
  const store = initializeStorage();
  return store[category] || [];
}

export function saveStoredInsight(item: InsightItem): { success: boolean; item: InsightItem } {
  const store = initializeStorage();
  const category = item.category || 'blogs';
  
  if (!store[category]) {
    store[category] = [];
  }

  const existingIndex = store[category].findIndex(
    (existing) => existing.id === item.id || existing.slug === item.slug
  );

  if (existingIndex >= 0) {
    // Update
    store[category][existingIndex] = { ...item };
  } else {
    // If it moved from another category, remove from old category
    for (const cat of Object.keys(store)) {
      if (cat !== category) {
        store[cat] = store[cat].filter((existing) => existing.id !== item.id);
      }
    }
    // Add to the top of the category list so it's featured
    store[category].unshift(item);
  }

  try {
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(store, null, 2), 'utf-8');
    return { success: true, item };
  } catch (err) {
    console.error('Error saving to storedInsights.json:', err);
    return { success: false, item };
  }
}

export function deleteStoredInsight(id: string): boolean {
  const store = initializeStorage();
  let found = false;

  for (const cat of Object.keys(store)) {
    const beforeCount = store[cat].length;
    store[cat] = store[cat].filter((item) => item.id !== id && item.slug !== id);
    if (store[cat].length < beforeCount) {
      found = true;
    }
  }

  if (found) {
    try {
      fs.writeFileSync(STORAGE_FILE, JSON.stringify(store, null, 2), 'utf-8');
      return true;
    } catch (err) {
      console.error('Error writing after delete:', err);
      return false;
    }
  }

  return false;
}
