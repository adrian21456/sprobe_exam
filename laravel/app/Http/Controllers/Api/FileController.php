<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Mods\ModFileController;
use Illuminate\Http\Request;

class FileController extends ModFileController
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
