<?php

namespace App\Providers;

use App\Repositories\ExpenseRepository;
use App\Repositories\FacultyRepository;
use App\Repositories\Interfaces\IExpenseRepository;
use App\Repositories\Interfaces\IFacultyRepository;
use App\Repositories\Interfaces\ILecturerRepository;
use App\Repositories\Interfaces\IProjectExpenseRepository;
use App\Repositories\Interfaces\IProjectFacultyRepository;
use App\Repositories\Interfaces\IProjectLecturerRepository;
use App\Repositories\Interfaces\IProjectRepository;
use App\Repositories\Interfaces\IProjectTypeRepository;
use App\Repositories\Interfaces\IUserRepository;
use App\Repositories\LecturerRepository;
use App\Repositories\ProjectExpenseRepository;
use App\Repositories\ProjectFacultyRepository;
use App\Repositories\ProjectLecturerRepository;
use App\Repositories\ProjectRepository;
use App\Repositories\ProjectTypeRepository;
use App\Repositories\UserRepository;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(IUserRepository::class, UserRepository::class);
        $this->app->bind(IFacultyRepository::class, FacultyRepository::class);
        $this->app->bind(ILecturerRepository::class, LecturerRepository::class);
        $this->app->bind(IExpenseRepository::class, ExpenseRepository::class);
        $this->app->bind(IProjectTypeRepository::class, ProjectTypeRepository::class);
        $this->app->bind(IProjectRepository::class, ProjectRepository::class);
        $this->app->bind(IProjectLecturerRepository::class, ProjectLecturerRepository::class);
        $this->app->bind(IProjectExpenseRepository::class, ProjectExpenseRepository::class);
        $this->app->bind(IProjectFacultyRepository::class, ProjectFacultyRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        JsonResource::withoutWrapping();
    }
}
