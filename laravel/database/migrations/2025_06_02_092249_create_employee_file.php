<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('employee_file', function (Blueprint $table) {
            $table->id('employee_file_id');
            $table->unsignedBigInteger('file_id');
            $table->unsignedBigInteger('employee_id');
            $table->string('file_upload');
            $table->text('description')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('employee_file');
    }
};
