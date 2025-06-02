<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('family', function (Blueprint $table) {
            $table->id('family_id');

            // One-to-one relationship to employees table
            $table->unsignedBigInteger('employee_id')->unique()->nullable();
            $table->string('mother_name')->nullable();
            $table->string('father_name')->nullable();
            $table->string('spouse_name')->nullable();
            $table->string('children_count')->nullable();

            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('family');
    }
};
