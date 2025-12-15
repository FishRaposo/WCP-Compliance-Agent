/**
 * Unit tests for error handling utilities
 * 
 * Verifies that error classes work correctly and produce
 * the expected structure and messages.
 */

import { describe, it, expect } from "@jest/globals";
import { 
  WCPError, 
  ValidationError, 
  ConfigError, 
  NotFoundError, 
  ExternalApiError, 
  RateLimitError,
  extractErrorDetails,
  formatApiError
} from "../../src/utils/errors.js";

describe("Error Classes", () => {
  it("WCPError creates error with correct properties", () => {
    const error = new WCPError("Test error", "TEST_CODE", 500, { detail: "info" });
    
    expect(error.message).toBe("Test error");
    expect(error.code).toBe("TEST_CODE");
    expect(error.statusCode).toBe(500);
    expect(error.details).toEqual({ detail: "info" });
    expect(error.name).toBe("WCPError");
  });

  it("ValidationError extends WCPError with correct defaults", () => {
    const error = new ValidationError("Invalid input", { field: "role" });
    
    expect(error.message).toBe("Invalid input");
    expect(error.code).toBe("VALIDATION_ERROR");
    expect(error.statusCode).toBe(400);
    expect(error.details).toEqual({ field: "role" });
    expect(error.name).toBe("ValidationError");
  });

  it("ConfigError extends WCPError with correct defaults", () => {
    const error = new ConfigError("Missing config", { key: "API_KEY" });
    
    expect(error.code).toBe("CONFIG_ERROR");
    expect(error.statusCode).toBe(500);
    expect(error.name).toBe("ConfigError");
  });

  it("NotFoundError extends WCPError with correct defaults", () => {
    const error = new NotFoundError("Resource not found");
    
    expect(error.code).toBe("NOT_FOUND");
    expect(error.statusCode).toBe(404);
    expect(error.name).toBe("NotFoundError");
  });

  it("ExternalApiError extends WCPError with correct defaults", () => {
    const error = new ExternalApiError("API failed", { endpoint: "/test" });
    
    expect(error.code).toBe("EXTERNAL_API_ERROR");
    expect(error.statusCode).toBe(502);
    expect(error.name).toBe("ExternalApiError");
  });

  it("RateLimitError extends WCPError with correct defaults", () => {
    const error = new RateLimitError("Too many requests");
    
    expect(error.code).toBe("RATE_LIMIT_ERROR");
    expect(error.statusCode).toBe(429);
    expect(error.name).toBe("RateLimitError");
  });

  it("WCPError toJSON method produces correct structure", () => {
    const error = new WCPError("Test error", "TEST_CODE", 500, { detail: "info" });
    const json = error.toJSON();
    
    expect(json).toEqual({
      error: {
        name: "WCPError",
        code: "TEST_CODE",
        message: "Test error",
        statusCode: 500,
        details: { detail: "info" }
      }
    });
  });
});

describe("Error Utilities", () => {
  it("extractErrorDetails extracts info from WCPError", () => {
    const error = new ValidationError("Invalid input", { field: "role" });
    const details = extractErrorDetails(error);
    
    expect(details).toEqual({
      message: "Invalid input",
      code: "VALIDATION_ERROR",
      statusCode: 400,
      details: { field: "role" }
    });
  });

  it("extractErrorDetails extracts info from generic Error", () => {
    const error = new Error("Generic error");
    const details = extractErrorDetails(error);
    
    expect(details.message).toBe("Generic error");
    expect(details.code).toBe("UNKNOWN_ERROR");
    expect(details.statusCode).toBe(500);
    expect(details.details.stack).toBeDefined();
  });

  it("extractErrorDetails handles non-Error objects", () => {
    const details = extractErrorDetails("string error");
    
    expect(details.message).toBe("string error");
    expect(details.code).toBe("UNKNOWN_ERROR");
    expect(details.statusCode).toBe(500);
  });

  it("formatApiError formats WCPError correctly", () => {
    const error = new ValidationError("Invalid input", { field: "role" });
    const formatted = formatApiError(error);
    
    expect(formatted).toEqual({
      success: false,
      error: {
        message: "Invalid input",
        code: "VALIDATION_ERROR",
        statusCode: 400
      }
    });
  });

  it("formatApiError formats generic Error correctly", () => {
    const error = new Error("Generic error");
    const formatted = formatApiError(error);
    
    expect(formatted.success).toBe(false);
    expect(formatted.error.message).toBe("Generic error");
    expect(formatted.error.code).toBe("UNKNOWN_ERROR");
    expect(formatted.error.statusCode).toBe(500);
  });
});
