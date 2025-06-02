<?php

use App\Console\Zchted;
use Illuminate\Support\Facades\Artisan;

Artisan::command('add:mod {name}', function ($name) {
   $response = Zchted::makeMod($name);
   console($this, $response);
});

Artisan::command('add:config {config} {--columns} {--type}', function ($config, $columns, $type) {
    $response = Zchted::makeConfig($config, $columns, $type);
    console($this, $response);
});

Artisan::command('rollback:config {config}', function ($config) {
    $response = Zchted::rollbackConfig($config);
    console($this, $response);
});

Artisan::command('add:column {config} {columns}', function ($config, $columns) {
    $response = Zchted::makeColumns($config, $columns);
    console($this, $response);
});

Artisan::command('delete:column {config} {columns}', function ($config, $columns) {
    $response = Zchted::deleteColumns($config, $columns);
    console($this, $response);
});

Artisan::command('add:attribute {config} {columns}', function ($config, $columns) {
    $response = Zchted::makeAttribute($config, $columns);
    console($this, $response);
});

Artisan::command('add:class {config} {columns}', function ($config, $columns) {
    $response = Zchted::makeClass($config, $columns);
    console($this, $response);
});

Artisan::command('add:validation {config} {columns}', function ($config, $columns) {
    $response = Zchted::makeValidation($config, $columns);
    console($this, $response);
});

Artisan::command('configurator', function () {
    $response = Zchted::configurator();
    console($this, $response);
});
