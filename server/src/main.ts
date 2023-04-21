import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as fs from "fs";

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync("./secrets/privkey.pem"),
    cert: fs.readFileSync("./secrets/fullchain.pem"),
  };
  const app = await NestFactory.create(AppModule, { httpsOptions });
  app.setGlobalPrefix("api");
  const corsOptions = {
    origin: "*",
    methods: ["GET", "PUT", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  };
  app.enableCors(corsOptions);
  await app.listen(3001);
}
bootstrap();
