<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Mods\ModFamilyController;
use Illuminate\Http\Request;

class FamilyController extends ModFamilyController
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
