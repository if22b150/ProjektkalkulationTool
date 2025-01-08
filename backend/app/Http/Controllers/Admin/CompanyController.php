<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Company\StoreCompanyRequest;
use App\Http\Resources\CompanyResource;
use App\Repositories\Interfaces\ICompanyRepository;
use Illuminate\Support\Facades\Log;

class CompanyController extends Controller {
    public function __construct(protected ICompanyRepository $companyRepository)
    {}

    public function index()
    {
        return CompanyResource::collection($this->companyRepository->getAll());
    }

    public function show(int $id)
    {
        return new CompanyResource($this->companyRepository->getOne($id));
    }

    public function store(StoreCompanyRequest $request)
    {
//        error_log("Request: " . json_encode($request->all()));
        return new CompanyResource($this->companyRepository->create($request->companyName, $request->file));
    }

    public function update(StoreCompanyRequest $request, int $id)
    {
        if(!$this->companyRepository->getOne($id))
            return response(null, 404);

        return new CompanyResource($this->companyRepository->update($id, $request->companyName, $request->file));
    }

    public function destroy(int $id)
    {
        if(!$this->companyRepository->getOne($id))
            return response(null, 404);

        $this->companyRepository->delete($id);

        return response(null, 204);
    }
}
