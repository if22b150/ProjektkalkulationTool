<?php

namespace App\Repositories;

use App\Models\Expense;
use App\Repositories\Interfaces\IExpenseRepository;
use Illuminate\Database\Eloquent\Collection;

class ExpenseRepository implements IExpenseRepository
{
    public function __construct()
    {}

    public function getOne(int $id): ?Expense
    {
        return $this->exists($id) ? Expense::find($id) : null;
    }

    public function getAll(): Collection
    {
        return Expense::all();
    }

    public function getWhere($column, $value, array $related = null): Collection
    {
        if($related)
            return Expense::where($column, $value)->where([$related])->get();
        return Expense::where($column, $value)->get();
    }

    public function delete(int $id): bool
    {
        return Expense::destroy($id) == 1;
    }

    public function exists(int $id): bool
    {
        return Expense::where('id', $id)->exists();
    }

    public function save(Expense $expense): ?Expense
    {
        return $expense->save() ? $expense : null;
    }

    public function create(string $name): ?Expense
    {
        $expense = new Expense([
            'name' => $name
        ]);
        return $this->save($expense);
    }

    public function update(int $id, string $name): ?Expense
    {
        $expense = $this->getOne($id);
        $expense->name = $name;

        return $this->save($expense);
    }
}
