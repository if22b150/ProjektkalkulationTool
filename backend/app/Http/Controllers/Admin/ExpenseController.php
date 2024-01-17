<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Expense\StoreExpenseRequest;
use App\Http\Requests\Faculty\StoreFacultyRequest;
use App\Http\Resources\ExpenseResource;
use App\Repositories\Interfaces\IExpenseRepository;

class ExpenseController extends Controller
{
    public function __construct(protected IExpenseRepository $expenseRepository)
    {}

    public function index()
    {
        return ExpenseResource::collection($this->expenseRepository->getAll());
    }

    public function show(int $id)
    {
        return new ExpenseResource($this->expenseRepository->getOne($id));
    }

    public function store(StoreExpenseRequest $request)
    {
        return new ExpenseResource($this->expenseRepository->create($request->name, $request->price));
    }

//    public function update(StoreFacultyRequest $request, int $id)
//    {
//        if(!$this->facultyRepository->getOne($id))
//            return response(null, 404);
//
//        return new FacultyResource($this->facultyRepository->update($id, $request->name));
//    }

    public function destroy(int $id)
    {
        if(!$this->expenseRepository->getOne($id))
            return response(null, 404);

        $this->expenseRepository->delete($id);

        return response(null, 204);
    }
}

