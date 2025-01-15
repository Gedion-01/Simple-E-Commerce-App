<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->alias([
            'auth' => \App\Http\Middleware\Authenticate::class,
            'checkRole' => \App\Http\Middleware\CheckRole::class,
        ]);

        // $middleware->global([
        //     \App\Http\Middleware\CorsMiddleware::class, // Add CORS middleware to global middleware stack
        // ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
