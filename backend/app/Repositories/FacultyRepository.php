<?php

namespace App\Repositories;

use App\Models\Faculty;
use App\Repositories\Interfaces\IFacultyRepository;
use Illuminate\Database\Eloquent\Collection;

class FacultyRepository implements IFacultyRepository
{
    public function __construct()
    {}

    public function getOne(int $id): ?Faculty
    {
        return $this->exists($id) ? Faculty::find($id) : null;
    }

    public function getAll(): Collection
    {
        return Faculty::all();
    }

    public function getWhere($column, $value, array $related = null): Collection
    {
        if($related)
            return Faculty::where($column, $value)->where([$related])->get();
        return Faculty::where($column, $value)->get();
    }

    public function delete(int $id): bool
    {
        return Faculty::destroy($id) == 1;
    }

    public function exists(int $id): bool
    {
        return Faculty::where('id', $id)->exists();
    }

    public function save(Faculty $faculty): ?Faculty
    {
        return $faculty->save() ? $faculty : null;
    }

    public function create(string $name, int $price_for_course_per_day): ?Faculty
    {
        $faculty = new Faculty([
            'name' => $name,
            'price_for_course_per_day' => $price_for_course_per_day
        ]);
        return $this->save($faculty);
    }

    public function update(int $id, string $name, int $price_for_course_per_day): ?Faculty
    {
        $faculty = $this->getOne($id);
        $faculty->name = $name;
        $faculty->price_for_course_per_day = $price_for_course_per_day;

        return $this->save($faculty);
    }
}
