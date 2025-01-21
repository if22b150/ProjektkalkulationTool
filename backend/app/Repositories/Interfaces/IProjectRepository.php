<?php

namespace App\Repositories\Interfaces;

use App\Models\Project;
use Illuminate\Database\Eloquent\Collection;
use DateTime;

interface IProjectRepository
{
    public function getOne(int $id): ?Project;

    public function getAll(): Collection;

    public function getWhere($column, $value, array $related = null): Collection;

    public function delete(int $id): bool;

    public function exists(int $id): bool;

    public function save(Project $project): ?Project;

    public function getAllByCompanyId(int $companyId): Collection;

    public function getAllByFacultiesId(int $facultyId): Collection;

    public function create(
        string $name,
        int $costs,
        string $firstname,
        string $lastname,
        string $email,
        DateTime $start,
        DateTime $end,
        bool $crossFaculty,
        ?string $notes,
        ?int $participants,
        ?int $duration,
        ?int $ects,
        int $projectTypeId,
        int $companyId,
        int $userId,
        int $facultyId,
    ): ?Project;

    public function update(
        int $id,
        string $name,
        int $costs,
        string $firstname,
        string $lastname,
        string $email,
        DateTime $start,
        DateTime $end,
        bool $crossFaculty,
        ?string $notes,
        ?int $participants,
        ?int $duration,
        ?int $ects,
        int $projectTypeId,
        int $companyId,
        ?int $priceForCoursePerDayOverride
    ): ?Project;

    public function updateIsOpened(int $id, bool $isOpened): ?Project;

    public function updateState(int $id, string $state): ?Project;
}
