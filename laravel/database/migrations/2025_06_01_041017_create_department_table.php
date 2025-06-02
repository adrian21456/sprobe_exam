<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('department', function (Blueprint $table) {
            $table->increments('department_id');
            $table->text('department_name')->nullable();
            $table->text('department_head')->nullable();
            $table->text('designation_name')->nullable();
            $table->timestamps();         // created_at and updated_at
            $table->softDeletes();        // deleted_at
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('department');
    }
};
