/**
 * Validator Utility Tests
 * 
 * @file tests/unit/test_validator.test.ts
 */

import { describe, it, expect } from 'vitest';
import {
  validateWCPInput,
  validateExtractedData,
  validateDBWDRate,
  validateLocation,
  validateProjectType,
  validateWCPComplete,
} from '../../src/utils/validator.js';

describe('Validator Utility', () => {
  describe('validateWCPInput', () => {
    it('should validate valid WCP input', () => {
      const input = 'Role: Electrician, Hours: 40, Wage: $35.50/hour';
      const result = validateWCPInput(input);
      
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject input that is too short', () => {
      const result = validateWCPInput('test');
      
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should warn about potentially incomplete input', () => {
      const input = 'Some text without proper fields';
      const result = validateWCPInput(input);
      
      expect(result.warnings).toBeDefined();
      expect(result.warnings!.length).toBeGreaterThan(0);
    });
  });

  describe('validateExtractedData', () => {
    it('should validate valid extracted data', () => {
      const data = { role: 'Electrician', hours: 40, wage: 35.50 };
      const result = validateExtractedData(data);
      
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject negative hours', () => {
      const data = { role: 'Electrician', hours: -5, wage: 35.50 };
      const result = validateExtractedData(data);
      
      expect(result.isValid).toBe(false);
    });

    it('should reject hours exceeding 168', () => {
      const data = { role: 'Electrician', hours: 200, wage: 35.50 };
      const result = validateExtractedData(data);
      
      expect(result.isValid).toBe(false);
    });

    it('should reject zero hours', () => {
      const data = { role: 'Electrician', hours: 0, wage: 35.50 };
      const result = validateExtractedData(data);
      
      expect(result.isValid).toBe(false);
    });

    it('should reject wage below minimum', () => {
      const data = { role: 'Electrician', hours: 40, wage: 5.00 };
      const result = validateExtractedData(data);
      
      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('minimum wage'))).toBe(true);
    });

    it('should warn about high hours', () => {
      const data = { role: 'Electrician', hours: 85, wage: 35.50 };
      const result = validateExtractedData(data);
      
      expect(result.warnings).toBeDefined();
    });
  });

  describe('validateDBWDRate', () => {
    it('should validate valid DBWD rate', () => {
      const rate = { role: 'Electrician', baseRate: 35.50, overtimeRate: 53.25 };
      const result = validateDBWDRate(rate);
      
      expect(result.isValid).toBe(true);
    });

    it('should warn about low overtime rate', () => {
      const rate = { role: 'Electrician', baseRate: 35.50, overtimeRate: 40.00 };
      const result = validateDBWDRate(rate);
      
      expect(result.warnings).toBeDefined();
    });
  });

  describe('validateLocation', () => {
    it('should validate valid location', () => {
      const location = { county: 'Los Angeles', state: 'CA' };
      const result = validateLocation(location);
      
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid state code', () => {
      const location = { county: 'Los Angeles', state: 'California' };
      const result = validateLocation(location);
      
      expect(result.isValid).toBe(false);
    });
  });

  describe('validateProjectType', () => {
    it('should validate valid project types', () => {
      expect(validateProjectType('building').isValid).toBe(true);
      expect(validateProjectType('highway').isValid).toBe(true);
      expect(validateProjectType('residential').isValid).toBe(true);
      expect(validateProjectType('heavy').isValid).toBe(true);
    });

    it('should reject invalid project type', () => {
      const result = validateProjectType('invalid');
      expect(result.isValid).toBe(false);
    });
  });

  describe('validateWCPComplete', () => {
    it('should combine all validations', () => {
      const input = 'Role: Electrician, Hours: 40, Wage: $35.50/hour';
      const extracted = { role: 'Electrician', hours: 40, wage: 35.50 };
      
      const result = validateWCPComplete(input, extracted);
      
      expect(result.isValid).toBe(true);
    });
  });
});
