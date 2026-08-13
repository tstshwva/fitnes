/**
 * Mock Client with LocalStorage Persistence
 * Simulates an API/Database layer for prototyping with state preservation.
 */

import {
  initialUsers,
  initialEvaluations,
  initialPrograms,
  initialModules,
  initialClasses,
  initialResources,
  initialExercises,
  initialEnrollments,
  initialProgress
} from '../../data/mockData';

const STORAGE_PREFIX = 'yessi_platform_';

const SEED_DATA = {
  users: initialUsers,
  evaluations: initialEvaluations,
  programs: initialPrograms,
  modules: initialModules,
  classes: initialClasses,
  resources: initialResources,
  exercises: initialExercises,
  enrollments: initialEnrollments,
  progress: initialProgress
};

class MockClient {
  constructor() {
    this.initCollections();
  }

  initCollections(forceReset = false) {
    if (typeof window === 'undefined') return;

    Object.keys(SEED_DATA).forEach((key) => {
      const storageKey = STORAGE_PREFIX + key;
      const existing = localStorage.getItem(storageKey);
      if (!existing || forceReset) {
        localStorage.setItem(storageKey, JSON.stringify(SEED_DATA[key]));
      }
    });
  }

  resetAll() {
    this.initCollections(true);
    return Promise.resolve({ success: true, message: 'Base de datos de prueba restaurada' });
  }

  _delay(ms = 60) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  _getCollection(collection) {
    if (typeof window === 'undefined') return SEED_DATA[collection] || [];
    const storageKey = STORAGE_PREFIX + collection;
    const raw = localStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) : (SEED_DATA[collection] || []);
  }

  _saveCollection(collection, data) {
    if (typeof window === 'undefined') return;
    const storageKey = STORAGE_PREFIX + collection;
    localStorage.setItem(storageKey, JSON.stringify(data));
  }

  async getAll(collection) {
    await this._delay();
    return [...this._getCollection(collection)];
  }

  async getById(collection, id) {
    await this._delay();
    const items = this._getCollection(collection);
    return items.find((item) => item.id === id) || null;
  }

  async find(collection, predicate) {
    await this._delay();
    const items = this._getCollection(collection);
    return items.filter(predicate);
  }

  async findOne(collection, predicate) {
    await this._delay();
    const items = this._getCollection(collection);
    return items.find(predicate) || null;
  }

  async create(collection, item) {
    await this._delay();
    const items = this._getCollection(collection);
    const newItem = {
      ...item,
      id: item.id || `${collection.slice(0, 3)}_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      createdAt: item.createdAt || new Date().toISOString()
    };
    items.push(newItem);
    this._saveCollection(collection, items);
    return newItem;
  }

  async update(collection, id, updates) {
    await this._delay();
    const items = this._getCollection(collection);
    const index = items.findIndex((i) => i.id === id);
    if (index === -1) {
      throw new Error(`Item with id ${id} not found in collection ${collection}`);
    }
    const updatedItem = {
      ...items[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    items[index] = updatedItem;
    this._saveCollection(collection, items);
    return updatedItem;
  }

  async delete(collection, id) {
    await this._delay();
    const items = this._getCollection(collection);
    const filtered = items.filter((i) => i.id !== id);
    this._saveCollection(collection, filtered);
    return { success: true, id };
  }
}

export const mockClient = new MockClient();
