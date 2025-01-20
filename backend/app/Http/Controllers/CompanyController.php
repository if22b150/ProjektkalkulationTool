<?php

namespace App\Http\Controllers;

use App\Http\Resources\CompanyResource;
use App\Repositories\Interfaces\ICompanyRepository;

class CompanyController extends Controller
{
    public function __construct(protected ICompanyRepository $companyRepository)
    {}

    public function index()
    {
        return CompanyResource::collection($this->companyRepository->getAll());
    }
}

