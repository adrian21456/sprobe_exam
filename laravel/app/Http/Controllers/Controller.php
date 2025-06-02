<?php

namespace App\Http\Controllers;
use Illuminate\Routing\Controller as BaseController;

abstract class Controller extends BaseController
{
    public function __construct()
    {

    }

    public function invoke($method, $parameters)
    {
        $result = null;
        $request = request();
        $request->merge(['parameters' => $parameters]);

        try {
            // Preload logic
            $this->preload();

            // Call the actual method of the controller
            $result = parent::callAction($method, $parameters);

            // Postload logic
            $this->postload();

            // Return response
            return getResponseObject($result, $request->all());
        } catch (\Exception $e) {
            // In case of exception, return error response
            return getResponseObject($result, $request->all(), $e);
        }
    }

    /**
     * @return void
     * Scripts to run before method calls
     */
    public function preload(){

    }

    /**
     * @return void
     * Scripts to run after method calls
     */
    public function postload(){

    }
}
