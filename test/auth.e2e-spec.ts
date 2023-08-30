import { Test, TestingModule } from '@nestjs/testing';
import {INestApplication, ValidationPipe} from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AuthController (e2e)', () => {
    let app: INestApplication;
    const setUp = async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.setGlobalPrefix('api')
        app.useGlobalPipes(new ValidationPipe({
            whitelist: true
        }))
        await app.init();
    }
    beforeEach((setUp) => setTimeout(setUp, 500));

    it('handle register request', () => {
        const checkEmail = "nam@gmail.com"

        return request(app.getHttpServer())
            .post('/api/auth/register')
            .send({
                email: checkEmail,
                password:"password",
                username: "nam"
            })
            // .expect(201)
            .then(res => {
                console.log(res)
                const {id, email, access_token} = res.body.user
                expect(id).toBeDefined()
                expect(access_token).toBeDefined()
                expect(email).toEqual(checkEmail)
            });
    });
});
