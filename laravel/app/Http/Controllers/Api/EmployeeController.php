<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Mods\ModEmployeeController;
use App\Models\Employee;
use Illuminate\Http\Request;
use App\Http\Services\BaseService;
use Illuminate\Support\Facades\DB;

class EmployeeController extends ModEmployeeController
{
    /**
     * @param $method
     * @param $parameters
     * @return array|mixed|\Symfony\Component\HttpFoundation\Response
     * Invokes all features
     */
    public function callAction($method, $parameters)
    {
        return $this->invoke($method, $parameters);
    }

    public function search(Request $request, $rules = []): array
    {
        BaseService::requestValidator($request, $rules);
        return $this->crudService->search($request, "department");
    }
}
