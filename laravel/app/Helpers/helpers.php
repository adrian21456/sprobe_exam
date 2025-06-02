<?php

use Doctrine\Inflector\InflectorFactory;
use GuzzleHttp\Psr7\UploadedFile;

function getModuleName($controllerName)
{
    // Remove "Controller" suffix from the class name
    $moduleName = str_replace('Controller', '', class_basename($controllerName));

    // Return the module name in a readable format, e.g., Category -> category
    return ucfirst(strtolower($moduleName));
}

function getActionName($action)
{
    // Return the custom name or the original action if not found in the map
    return $action;
}

function getResponseObject($result = [], $request = [], \Exception $exception = null)
{
    // Check if the environment is local
    $isLocalEnv = env('APP_ENV') === 'local';

    $response = [
        'status' => true,
        'version' => env('APP_VERSION'),
        'timestamp' => time(),
        'timezone' => date_default_timezone_get(),
        'message' => $exception?->getMessage() ?? 'An error occurred.',
        'error' => $exception ? [
            'name'    => get_class($exception),
            'code'    => $exception->getCode(),
            'message' => $exception->getMessage(),
            'trace'   => $exception->getTraceAsString(),
        ] : null,
    ];

    if (!$exception) {
        $response['status'] = true;
        $response['message'] = 'Request successful';
        unset($response['error']);
    } else {
        unset($response['error']);
    }

    // Only include 'line' and 'file' in the error if in the local environment
    if ($isLocalEnv && !empty($exception)) {
        $response['error']['line'] = $exception->getLine();
        $response['error']['file'] = $exception->getFile();
        $response['error']['trace'] = $exception->getTrace();
    }

    // Only include 'request' if in the local environment
    if ($isLocalEnv && !empty($request)) {
        $response['request'] =  $request;
    }

    if (!empty($result)) {
        if (array_key_exists('result', $result)) {
            $response['result'] = $result['result'];
        }
        if (array_key_exists('message', $result)) {
            $response['message'] = $result['message'];
        }
        if (array_key_exists('error', $result)) {
            $response['message'] = $result['error'];
        }
    }

    return $response;
}

function getFilePrefix()
{
    usleep(100000);
    return 'File_' . date("YmdHis") . substr((string)microtime(), 2, 3);
}

function getModPath()
{
    return base_path("mods");
}

function pluralize($word): string
{
    $inflector = InflectorFactory::create()->build();
    $word = explode(' ', $word);
    $last_word = end($word);
    return $inflector->pluralize($last_word);
}

function properName($name)
{
    $name = str_replace('_', ' ', $name);
    return ucwords($name);
}

function console($context, $texts)
{
    $error_texts = ["fail", "error", "exception", "fatal", "warning", "faultcode"];
    if (!is_array($texts)) {
        $texts = [$texts];
    }
    foreach ($texts as $text) {
        foreach ($error_texts as $error_text) {
            if (str_contains(strtolower($text), $error_text)) {
                return $context->error($text);
            } else {
                return $context->comment($text);
            }
        }
    }
}

function getRoles()
{
    return json_decode(file_get_contents(base_path("core/__roles.json")), true);
}

function getColumn($config, $column)
{
    $conf = json_decode(file_get_contents(base_path("core/$config.json")), true);
    foreach ($conf['columns'] as $col) {
        if ($col['name'] === $column) {
            return $col;
        }
    }

    return null;
}

function getConfig($config)
{
    return json_decode(file_get_contents(base_path("core/$config.json")), true);
}

function makeSerializable($data)
{
    $keys = ["parameters"];

    foreach ($keys as $key) {
        if (isset($data[$key]))
            unset($data[$key]);
    }

    foreach ($data as $key => $d) {
        if ($d instanceof UploadedFile || is_object($d) || is_array($d)) {
            unset($data[$key]);
        }
    }
    return $data;
}
