<?php

namespace App\Repositories;

use App\Models\Company;
use App\Repositories\Interfaces\ICompanyRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Storage;

class CompanyRepository implements ICompanyRepository
{

    public function getOne(int $id): ?Company
    {
        return $this->exists($id) ? Company::find($id) : null;
    }

    public function getAll(): Collection
    {
        return Company::all();
    }

    public function getWhere($column, $value, array $related = null): Collection
    {
        if($related)
            return Company::where($column, $value)->where([$related])->get();
        return Company::where($column, $value)->get();
    }

    public function delete(int $id): bool
    {
        $company = $this->getOne($id);
        if($company->image_path)
            Storage::delete('public/' . $company->image_path);

        return Company::destroy($id) == 1;
    }

    public function exists(int $id): bool
    {
        return Company::where('id', $id)->exists();
    }

    public function save(Company $company): ?Company
    {
        return $company->save() ? $company : null;
    }

    public function create(string $companyName, $file): Company
    {
        $imagePath = null;
        if ($file) {
            $imagePath = $file->store('company_images', 'public');
        }

        $company = Company::create([
            'name' => $companyName,
            'image_path' => $imagePath,
        ]);

        return $company;
    }

    public function update(int $id, string $name, $file): ?Company
    {
        $company = $this->getOne($id);
        if($file && $company->image_path)
            Storage::delete('public/' . $company->image_path);

        $newImagePath = null;
        if($file)
            $newImagePath = $file->store('company_images', 'public');

        $company->name = $name;
        $company->image_path = $newImagePath ?? $company->image_path;

        return $this->save($company);
    }
}
