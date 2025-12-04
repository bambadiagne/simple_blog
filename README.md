# Simple blog
This is a full-stack blog made with Angular,Nest,Postgres,Docker,Prisma,AWS. I have trying to make the bests practices like SOLID principles,separation of modules...

| Stack       | Logo                                                                                                                                            |
|-------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| Nest.js     | <a href="https://nestjs.com/" target="_blank" rel="noreferrer"> <img src="https://nestjs.com/img/logo-small.svg" alt="Nest.js" width="40" height="40"/> </a> |
| Angular     | <a href="https://angular.io/" target="_blank" rel="noreferrer"> <img src="https://v7.angular.cn/assets/images/logos/angular/angular.svg" alt="Angular" width="40" height="40"/> </a> |
| Docker      | <a href="https://www.docker.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg" alt="Docker" width="40" height="40"/> </a> |
| AWS         | <a href="https://aws.amazon.com/" target="_blank" rel="noreferrer"> <img src="https://icongr.am/devicon/amazonwebservices-original.svg?size=128&color=currentColor" alt="AWS" width="40" height="40"/> </a> |
| PostgreSQL  | <a href="https://www.postgresql.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg" alt="PostgreSQL" width="40" height="40"/> </a> |


## Features 
- User registration and authentication and authorization(JWT refresh + CORS)
- CRUD operations for posts
- Comments section management
- Storage service S3
- Pagination and search for posts
- Logging system(file based) 

## Usage

To see a demo of the blog in action, watch the video below:

https://github.com/user-attachments/assets/6a1cd6f3-4c72-462b-bfae-5cf3f0dc6426

## Installation
1. Clone the repository: `git clone https://github.com/bambadiagne/simple_blog.git`

2. Create .env file based on .env.sample contents and change the values see above example:
```env
#env.dev
NODE_ENV=development
FRONTEND_URL="http://localhost:4200"
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/blog?schema=public"
POSTGRES_USER=johndoe
POSTGRES_PASSWORD=randompassword
POSTGRES_DB=blog
JWT_SECRET="RandomSecret123@"
JWT_REFRESH_SECRET="RandomRefresh"
AWS_REGION="your-region"
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-access-key"
AWS_BUCKET_NAME="your-bucket-name"
```
```env
#env.prod
NODE_ENV=production
API_URL="/api"
FRONTEND_URL="http://localhost:8080"
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/blog?schema=public"
POSTGRES_USER=johndoe
POSTGRES_PASSWORD=randompassword
POSTGRES_DB=blog
JWT_SECRET="RandomSecret123@"
JWT_REFRESH_SECRET="RandomRefresh383912!"
AWS_REGION="your-region"
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-access-key"
AWS_BUCKET_NAME="your-bucket-name"
GOOGLE_CLIENT_ID="your-google-client-id"
```

| Variable                | Description                                                      |
|-------------------------|------------------------------------------------------------------|
| NODE_ENV                | Application environment (development/production)                 |
| API_URL                 | Base API path for frontend requests                              |
| FRONTEND_URL            | URL where the frontend is hosted                                 |
| DATABASE_URL            | Connection string for the PostgreSQL database                    |
| POSTGRES_USER           | Username for the PostgreSQL database                             |
| POSTGRES_PASSWORD       | Password for the PostgreSQL database                             |
| POSTGRES_DB             | Database name for PostgreSQL                                     |
| JWT_SECRET              | Secret key for signing JWT access tokens                         |
| JWT_REFRESH_SECRET      | Secret key for signing JWT refresh tokens                        |
| AWS_REGION              | AWS region for S3 bucket                                         |
| AWS_ACCESS_KEY_ID       | AWS access key for S3                                            |
| AWS_SECRET_ACCESS_KEY   | AWS secret access key for S3                                     |
| AWS_BUCKET_NAME         | Name of the AWS S3 bucket                                        |
| GOOGLE_CLIENT_ID        | Google OAuth client ID for authentication                        |

3. You can use the docker-compose file it's so simple but you need that Docker installed in your device

```bash
docker-compose --env-file .env up -d
```

## Contributing
Pull requests are welcome.Just fork and create PR!
## License
[MIT](LICENSE)
