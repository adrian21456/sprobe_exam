<?php

namespace App\Providers;

use Google\Cloud\Storage\StorageClient;
use Illuminate\Filesystem\FilesystemAdapter;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\ServiceProvider;
use League\Flysystem\GoogleCloudStorage\GoogleCloudStorageAdapter;
use League\Flysystem\Filesystem as Flysystem;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Storage::extend('gcs', function ($app, $config) {
            $storageClient = new StorageClient([
                'projectId' => $config['project_id'],
                'keyFilePath' => $config['key_file'],
            ]);

            $bucket = $storageClient->bucket($config['bucket']);

            $adapter = new GoogleCloudStorageAdapter(
                $bucket,
                $config['path_prefix'] ?? ''
            );

            $flysystem = new Flysystem($adapter);

            // ✅ Return a Laravel FilesystemAdapter instead of Flysystem
            return new FilesystemAdapter(
                $flysystem,
                $adapter,
                $config
            );
        });
    }
}
