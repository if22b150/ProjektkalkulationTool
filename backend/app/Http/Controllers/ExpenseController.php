<?php

namespace App\Http\Controllers;

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
}

