/**
 * Enhanced Validator Utility
 * 
 * Comprehensive input validation for WCP data, DBWD rates,
 * and location parameters.
 * 
 * @file src/utils/validator.ts
 * @see AGENTS.md for coding patterns
 * @see CONTEXT.md for architecture decisions
 */

import { z } from 'zod';

/**
 * Validation result interface
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings?: string[];
}

/**
 * Extracted WCP data interface
 */
export interface ExtractedWCPData {
  role: string;
  hours: number;
  wage: number;
}

/**
 * DBWD rate interface
 */
export interface DBWDRate {
  role: string;
  baseRate: number;
  overtimeRate?: number;
  fringeBenefit?: number;
}

/**
 * Location interface
 */
export interface Location {
  county: string;
  state: string;
}

/**
 * WCP text input schema
 */
const WCPInputSchema = z.string()
  .min(10, 'WCP input is too short')
  .max(10000, 'WCP input is too long');

/**
 * Extracted data schema
 */
const ExtractedDataSchema = z.object({
  role: z.string().min(1, 'Role cannot be empty'),
  hours: z.number()
    .min(0, 'Hours cannot be negative')
    .max(168, 'Hours cannot exceed 168 (hours in a week)'),
  wage: z.number()
    .min(0, 'Wage cannot be negative')
    .max(1000, 'Wage seems unreasonably high'),
});

/**
 * DBWD rate schema
 */
const DBWDRateSchema = z.object({
  role: z.string().min(1, 'Role cannot be empty'),
  baseRate: z.number()
    .min(0, 'Base rate cannot be negative')
    .max(500, 'Base rate seems unreasonably high'),
  overtimeRate: z.number()
    .min(0, 'Overtime rate cannot be negative')
    .max(750, 'Overtime rate seems unreasonably high')
    .optional(),
  fringeBenefit: z.number()
    .min(0, 'Fringe benefit cannot be negative')
    .max(100, 'Fringe benefit seems unreasonably high')
    .optional(),
});

/**
 * Location schema
 */
const LocationSchema = z.object({
  county: z.string().min(1, 'County cannot be empty'),
  state: z.string()
    .length(2, 'State must be a 2-letter code')
    .regex(/^[A-Z]{2}$/, 'State must be uppercase letters'),
});

/**
 * Project type schema
 */
const ProjectTypeSchema = z.enum([
  'building',
  'highway',
  'residential',
  'heavy',
], {
  errorMap: () => ({ message: 'Invalid project type. Must be: building, highway, residential, or heavy' }),
});

/**
 * Validate WCP text input
 * 
 * @param input WCP text input
 * @returns Validation result
 */
export function validateWCPInput(input: string): ValidationResult {
  try {
    WCPInputSchema.parse(input);
    
    // Additional checks
    const warnings: string[] = [];
    
    if (input.length < 50) {
      warnings.push('WCP input seems very short, may be missing information');
    }
    
    if (!input.includes('Role:') && !input.includes('role:')) {
      warnings.push('WCP input may be missing role information');
    }
    
    if (!input.includes('Hours:') && !input.includes('hours:')) {
      warnings.push('WCP input may be missing hours information');
    }
    
    if (!input.includes('Wage:') && !input.includes('wage:') && !input.includes('$')) {
      warnings.push('WCP input may be missing wage information');
    }
    
    return {
      isValid: true,
      errors: [],
      warnings: warnings.length > 0 ? warnings : undefined,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        isValid: false,
        errors: error.errors.map(err => err.message),
      };
    }
    
    return {
      isValid: false,
      errors: ['Unknown validation error occurred'],
    };
  }
}

/**
 * Validate extracted WCP data
 * 
 * @param data Extracted WCP data
 * @returns Validation result
 */
export function validateExtractedData(data: ExtractedWCPData): ValidationResult {
  try {
    ExtractedDataSchema.parse(data);
    
    // Additional validation
    const warnings: string[] = [];
    const errors: string[] = [];
    
    // Check for common issues
    if (data.hours > 80) {
      warnings.push('Hours exceed typical work week (80+ hours)');
    }
    
    if (data.hours === 0) {
      errors.push('Hours cannot be zero');
    }
    
    if (data.wage < 7.25) {
      errors.push('Wage is below federal minimum wage ($7.25)');
    }
    
    if (data.wage > 200) {
      warnings.push('Wage seems unusually high (over $200/hour)');
    }
    
    if (data.role.toLowerCase() === 'unknown' || data.role.toLowerCase() === 'n/a') {
      errors.push('Role is unknown or not specified');
    }
    
    return {
      isValid: errors.length === 0,
      errors,
      warnings: warnings.length > 0 ? warnings : undefined,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        isValid: false,
        errors: error.errors.map(err => err.message),
      };
    }
    
    return {
      isValid: false,
      errors: ['Unknown validation error occurred'],
    };
  }
}

/**
 * Validate DBWD rate
 * 
 * @param rate DBWD rate
 * @returns Validation result
 */
export function validateDBWDRate(rate: DBWDRate): ValidationResult {
  try {
    DBWDRateSchema.parse(rate);
    
    // Additional checks
    const warnings: string[] = [];
    
    if (rate.overtimeRate && rate.overtimeRate < rate.baseRate * 1.5) {
      warnings.push('Overtime rate is less than 1.5x base rate (standard overtime multiplier)');
    }
    
    if (rate.fringeBenefit && rate.fringeBenefit > rate.baseRate) {
      warnings.push('Fringe benefit exceeds base rate (unusual)');
    }
    
    return {
      isValid: true,
      errors: [],
      warnings: warnings.length > 0 ? warnings : undefined,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        isValid: false,
        errors: error.errors.map(err => err.message),
      };
    }
    
    return {
      isValid: false,
      errors: ['Unknown validation error occurred'],
    };
  }
}

/**
 * Validate location
 * 
 * @param location Location
 * @returns Validation result
 */
export function validateLocation(location: Location): ValidationResult {
  try {
    LocationSchema.parse(location);
    
    return {
      isValid: true,
      errors: [],
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        isValid: false,
        errors: error.errors.map(err => err.message),
      };
    }
    
    return {
      isValid: false,
      errors: ['Unknown validation error occurred'],
    };
  }
}

/**
 * Validate project type
 * 
 * @param type Project type
 * @returns Validation result
 */
export function validateProjectType(type: string): ValidationResult {
  try {
    ProjectTypeSchema.parse(type.toLowerCase());
    
    return {
      isValid: true,
      errors: [],
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        isValid: false,
        errors: error.errors.map(err => err.message),
      };
    }
    
    return {
      isValid: false,
      errors: ['Unknown validation error occurred'],
    };
  }
}

/**
 * Validate all WCP data at once
 * 
 * @param input WCP text input
 * @param extracted Extracted data
 * @returns Combined validation result
 */
export function validateWCPComplete(
  input: string,
  extracted: ExtractedWCPData
): ValidationResult {
  const inputResult = validateWCPInput(input);
  const dataResult = validateExtractedData(extracted);
  
  return {
    isValid: inputResult.isValid && dataResult.isValid,
    errors: [...inputResult.errors, ...dataResult.errors],
    warnings: [
      ...(inputResult.warnings || []),
      ...(dataResult.warnings || []),
    ],
  };
}
