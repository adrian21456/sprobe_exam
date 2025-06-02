<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Mods\ModEmployeeFileController;
use Illuminate\Http\Request;

class EmployeeFileController extends ModEmployeeFileController
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
}
