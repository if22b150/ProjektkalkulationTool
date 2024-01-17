<?php

namespace App\Repositories;

use App\Models\Lecturer;
use App\Repositories\Interfaces\ILecturerRepository;
use Illuminate\Database\Eloquent\Collection;

class LecturerRepository implements ILecturerRepository
{
    public function __construct()
    {}

    public function getOne(int $id): ?Lecturer
    {
        return $this->exists($id) ? Lecturer::find($id) : null;
    }

    public function getAll(?string $role = null): Collection
    {
        if (!$role)
            return Lecturer::all();

        return Lecturer::all();
    }

    public function getWhere($column, $value, array $related = null): Collection
    {
        if($related)
            return Lecturer::where($column, $value)->where([$related])->get();
        return Lecturer::where($column, $value)->get();
    }

    public function delete(int $id): bool
    {
        return Lecturer::destroy($id) == 1;
    }

    public function exists(int $id): bool
    {
        return Lecturer::where('id', $id)->exists();
    }

    public function save(Lecturer $lecturer): ?Lecturer
    {
        return $lecturer->save() ? $lecturer : null;
    }

    public function create(string $name, int $hourlyRate, int $dailyRate): ?Lecturer
    {
        $lecturer = new Lecturer([
            'name' => $name,
            'hourlyRate' => $hourlyRate,
            'dailyRate' => $dailyRate
        ]);
        return $this->save($lecturer);
    }

    public function update(int $id, string $name): ?Lecturer
    {
        $faculty = $this->getOne($id);
        $faculty->name = $name;

        return $this->save($faculty);
    }
}
