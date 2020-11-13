import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as swStats from 'swagger-stats';
export function setUpSwagger(app:INestApplication):void{
    const options = new DocumentBuilder()
    .setTitle('SAVE ME')
    .setVersion('1.0')
    .addTag('Save me API')
    .build();
    app.use(swStats.getMiddleware({
        name: 'API SAVE ME ',
        uriPath:"/swagger",
        authentication:true,
        onAuthenticate:(req,username:string,password:string)=>{
            return ((username=='admin'))&&((password=='admin'))
        }
    }))
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('docs', app, document);
}