<?php

namespace App\Http\Controllers\Mods;

use App\Http\Controllers\Controller;
use App\Http\Services\BaseService;
use App\Http\Services\CRUDService;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

abstract class ModDepartmentController extends Controller
{
    protected CRUDService $crudService;
    protected Model $model;

    public function __construct(){
        parent::__construct();
        $this->model = new \App\Models\Department();
        $this->crudService = new CRUDService($this->model);
    }

    // GET /api/department
    public function index($rules = []): array
    {
        $request = BaseService::requestValidator(request(), $rules);
        return $this->crudService->index();
    }

    // GET /api/department/id
    public function show($item, $rules = []): array
    {
        BaseService::requestValidator(request(), $rules);
        BaseService::writeAuditLog(getModuleName(__CLASS__), getActionName(__FUNCTION__), auth()->id() ?? null);
        return $this->crudService->show($item);
    }

    // POST /api/department/search
    public function search(Request $request, $rules = []): array
    {
        BaseService::requestValidator($request, $rules);
        return $this->crudService->search($request);
    }

    // POST /api/department
    public function store(Request $request, $rules = []): array
    {
        $rules = empty($rules) ? $this->crudService->generateStoreRule() : $rules;
        $validated = BaseService::requestValidator($request, $rules);
        return $this->crudService->store($request, $validated);
    }

    // PUT/PATCH /api/department/{id}
    public function update(Request $request, $item, $rules = []): array
    {
        $rules = empty($rules) ? $this->crudService->generateUpdateRule() : $rules;
        $validated = BaseService::requestValidator($request, $rules);
        return $this->crudService->update($request, $item, $validated);
    }

    // DELETE /api/department/{id}
    public function destroy($item, $rules = []): array
    {
        BaseService::requestValidator(request(), $rules);
        return $this->crudService->destroy($item);
    }
}
