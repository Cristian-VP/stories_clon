import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { StorageKeys, Story } from '../types';
import { compressImageToBase64 } from '../services/imageServices';

const loadStoriesFromLocalStorage = (): Story[] => {
    try {
      const stored = localStorage.getItem(StorageKeys.STORIES_SAVED);
      if (stored) {
        const parsed = JSON.parse(stored) as Story[];
        return Array.isArray(parsed) ? parsed : [];
      }
      return [];
    } catch (error) {
      console.error('Error al cargar stories desde localStorage:', error);
      return [];
    }
  };

  
  const saveStoriesToLocalStorage = (stories: Story[]): void => {
    try {
      const jsonValue = JSON.stringify(stories);
      localStorage.setItem(StorageKeys.STORIES_TO_SAVE, jsonValue);
    } catch (error) {
      console.error('Error al guardar stories en localStorage:', error);
    }
  }