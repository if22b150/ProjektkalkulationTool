# ProjektkalkulationTool
## Frontend
### Prerequisites
-   Node.js
    - https://nodejs.org/en/download 
- Angular CLI
    - https://angular.io/guide/setup-local#install-the-angular-cli
### Setup
```
cd frontend
npm install
```
If there are errors/vulnerabilities (critical or high), try the following:
```
npm update
npm audit fix
```
Start application:
```
ng serve
```

## Backend
### Prerequisites
- Docker Engine (e.g. Docker Desktop for Windows)
### Setup
(In *ProjektkalkulationTool* folder)
```
docker compose up
docker compose exec backend bash
php artisan key:generate
php artisan jwt:secret
php artisan migrate:fresh --seed
php artisan storage:link
```
