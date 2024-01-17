<?php

namespace App\Providers;

use App\Repositories\FacultyRepository;
use App\Repositories\Interfaces\IFacultyRepository;
use App\Repositories\Interfaces\ILecturerRepository;
use App\Repositories\Interfaces\IUserRepository;
use App\Repositories\LecturerRepository;
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
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        JsonResource::withoutWrapping();
    }
}
