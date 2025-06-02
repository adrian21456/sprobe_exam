<?php

namespace App\Models;

use App\Http\Services\BaseService;
use Illuminate\Database\Eloquent\Model;

class BaseModel extends Model
{
    public array $nullable = [];

    public array $enumerable = [];

    public array $files = [];

    public array $lengths = [];

    public $defaults = [];


    public function generateStoreRule(array $additional_rules = []): array
    {
        $rules = [];

        foreach ($this->fillable as $field) {
            // For Store: Treat nullable fields like files as nullable
            if (in_array($field, $this->nullable)) {
                $rules[$field] = 'nullable';
            } else {
                // For non-nullable fields, enforce required validation
                $rules[$field] = 'required';
            }

            // Add length constraints if defined
            if (isset($this->lengths[$field])) {
                $rules[$field] .= '|max:' . $this->lengths[$field];
            }

            // Apply 'in' rule for enumerable fields
            if (isset($this->enumerable[$field])) {
                $rules[$field] .= '|in:' . implode(',', $this->enumerable[$field]);
            }

            // For file fields, apply mimes validation only if a file is provided (nullable)
            if (isset($this->files[$field])) {
                // Check if file formats are specified or if it's a wildcard '*'
                if ($this->files[$field] === '*' || empty($this->files[$field])) {
                    $rules[$field] .= '|nullable';
                } else {
                    $rules[$field] .= '|nullable|mimes:' . $this->files[$field];
                }
            }
        }

        foreach ($additional_rules as $key => $aRule) {
            $rules[$key] = $aRule;
        }
        return $rules;
    }

    public function generateUpdateRule(array $additional_rules = []): array
    {
        $rules = [];

        foreach ($this->fillable as $field) {
            // For Update: Treat nullable fields as nullable (not required unless provided)
            if (in_array($field, $this->nullable)) {
                $rules[$field] = 'nullable';
            } else {
                // For non-nullable fields, validate only if present (optional, but validated if provided)
                $rules[$field] = 'sometimes';
            }

            // Add length constraints if defined
            if (isset($this->lengths[$field])) {
                $rules[$field] .= '|max:' . $this->lengths[$field];
            }

            // Apply 'in' rule for enumerable fields
            if (isset($this->enumerable[$field])) {
                $rules[$field] .= '|in:' . implode(',', $this->enumerable[$field]);
            }

            // For file fields, apply mimes validation only if a file is provided (nullable)
            if (isset($this->files[$field])) {
                // Check if file formats are specified or if it's a wildcard '*'

                $column = getColumn($this->table, $field);

                if($column['control'] === 'file') {
                    if ($this->files[$field] === '*' || empty($this->files[$field])) {
                        $rules[$field] .= '|nullable';
                    } else {
                        $rules[$field] .= '|nullable|mimes:' . $this->files[$field];
                    }
                }

                if($column['control'] === 'file_multiple') {
                    if ($this->files[$field] === '*' || empty($this->files[$field])) {
                        $rules[$field . ".*"] = 'sometimes';
                    } else {
                        $rules[$field . ".*"] = 'sometimes|mimes:' . $this->files[$field];
                    }
                }
            }
        }

        foreach ($additional_rules as $key => $aRule) {
            $rules[$key] = $aRule;
        }
//        dd($rules);
        return $rules;
    }

}
