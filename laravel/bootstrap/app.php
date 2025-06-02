<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        channels: __DIR__.'/../routes/channels.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->append(\App\Http\Middleware\ExpireSanctumTokens::class);
        $middleware->append(\App\Http\Middleware\ForceJsonResponse::class);

    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->reportable(function (\Throwable $exception) {
            Log::error('Exception occurred', [
                'exception' => [
                    'name'    => get_class($exception),
                    'code'    => $exception->getCode(),
                    'message' => $exception->getMessage(),
                    'line'    => $exception->getLine(),
                    'file'    => $exception->getFile(),
                    'trace'   => $exception->getTrace(),
                ]
            ]);
        });

        // Return JSON response for all exceptions
        $exceptions->renderable(function (\Throwable $exception, Request $request) {
            $response = [
                'status' => false,
                'version' => env('APP_VERSION'),
                'timestamp' => time(),
                'timezone' => date_default_timezone_get(),
                'message' => $exception->getMessage(),
                'error' => [
                    'name'    => get_class($exception),
                    'code'    => $exception->getCode(),
                    'message' => $exception->getMessage(),
                    'line'    => $exception->getLine(),
                    'file'    => $exception->getFile(),
                    'trace'   => $exception->getTrace(),
                ],
                'request' => $request->all(),
            ];

            if(env('APP_ENV') !== 'local'){
                unset($response['error']['file']);
                unset($response['error']['line']);
                unset($response['error']['trace']);
                unset($response['request']);
            }
            return response()->json($response, ($exception->getCode() === 0) ? 500 : $exception->getCode()); // You can modify the status code based on the exception type
        });
    })->create();
