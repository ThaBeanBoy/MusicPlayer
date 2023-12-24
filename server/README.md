# Prisma Experiment

## Prisma Setup

[Guide](https://www.prisma.io/docs/getting-started/quickstart)

## Express, Typescript Setup

Traversy media

## Security

### OWASP Top Ten

[Resource](https://owasp.org/www-pdf-archive/OWASP_Top_10-2017_%28en%29.pdf.pdf)

### Rate Limiter

[Express-rate-limit](https://www.npmjs.com/package/express-rate-limit) is used to limit the amount of requests made to the server. This is to mitigate against DDOS attacks...

I got the rateLimit options from the [README](https://www.npmjs.com/package/express-rate-limit).

```ts
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Use an external store for consistency across multiple server instances.
});
```

### Helmet

### Validation

[validator js](https://github.com/validatorjs/validator.js)

### Cross Site Request Forgery (CSFR)

### OWASP Dependancy Check

[Resource](https://owasp.org/www-project-dependency-check/)

### SNYK

### Burp Suite

## Authentication

### Prisma

### Encryption

## Testing
