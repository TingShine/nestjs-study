import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ResponseTransformInterceptor } from './shared/interception/response-transform.interception';
import { AllExceptionFilter } from './shared/filters/all-exception.filter';
import { AuthGard } from './shared/guard/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors()  // 允许跨域
  app.setGlobalPrefix('api')
  app.useGlobalGuards(new AuthGard())   // 全局守卫（权限）
  app.useGlobalFilters(new AllExceptionFilter())    // 全局过滤器（错误捕获）
  app.useGlobalInterceptors(new ResponseTransformInterceptor())   // 全局拦截器（修改内容）
  const config = new DocumentBuilder().setTitle("Nest Document").setVersion("1.0").build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('swagger', app, document)
  await app.listen(3088, () => {
    console.log('server 3088');
  });
}
bootstrap();
