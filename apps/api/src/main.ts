import 'reflect-metadata';
import { Controller, Get, Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
const { validate, validateFixed } = require('@notification/shared-config');
@Controller()
class HealthController {
  @Get('health') health() { return { status: 'ok', service: 'api', readiness: 'scaffold' }; }
}
@Module({ controllers: [HealthController] })
class AppModule {}
async function main() {
  const { errors, host, port } = validate();
  errors.push(...validateFixed());
  if (errors.length) { console.error('Invalid configuration: ' + errors.join(', ')); process.exitCode = 1; return; }
  try { const app = await NestFactory.create(AppModule, { logger: false }); await app.listen(port, host); }
  catch { console.error('API failed to start'); process.exitCode = 1; }
}
void main();
