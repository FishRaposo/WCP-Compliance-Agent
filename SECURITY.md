# Security Policy

## Supported Versions

| Version | Supported          |
|---------|--------------------|
| 0.1.0   | ✅ Current version |

## Reporting a Vulnerability

The WCP AI Agent Prototype team takes security seriously. If you discover a security vulnerability, please do NOT open a public issue.

### How to Report

**Private Disclosure (Preferred)**
- Email: security@example.com
- Include "SECURITY: WCP AI Agent" in the subject line
- Provide as much detail as possible about the vulnerability

**GitHub Security Advisory**
- Use GitHub's [Private Vulnerability Reporting](https://docs.github.com/en/code-security/security-advisories/guidance-on-reporting-and-writing/privately-reporting-a-security-vulnerability)
- This allows private coordination before public disclosure

### What to Include

- Type of vulnerability (e.g., XSS, SQL injection, authentication bypass)
- Steps to reproduce the issue
- Potential impact of the vulnerability
- Any proof-of-concept code or screenshots (if applicable)

### Response Time

- Initial response within 48 hours
- Detailed assessment within 7 days
- Patch timeline depends on severity

### Security Scope

The following are considered in-scope for security reports:

- API authentication and authorization
- Input validation and sanitization
- Data exposure and privacy issues
- Cross-site scripting (XSS)
- Injection vulnerabilities
- Configuration security
- Dependency vulnerabilities

The following are out-of-scope:

- Issues requiring physical access to user devices
- Issues in third-party dependencies (unless directly exploitable)
- Denial of service attacks
- Social engineering

### Security Best Practices

This project follows these security practices:

1. **Environment Variables**: Sensitive data stored in `.env` (not committed)
2. **Input Validation**: All inputs validated using Zod schemas
3. **Error Handling**: Errors don't expose sensitive information
4. **Dependencies**: Regular security updates via npm audit
5. **Mock Mode**: Testing without exposing real API keys

### Acknowledgments

Security researchers who report vulnerabilities will be:

- Acknowledged in our security advisories (if desired)
- Eligible for security swag (if available)
- Recognized in our project documentation

Thank you for helping keep the WCP AI Agent Prototype secure!
