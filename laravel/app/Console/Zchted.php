<?php

namespace App\Console;
use Doctrine\Inflector\InflectorFactory;
use Illuminate\Support\Facades\Log;

class Zchted
{
    private static $special_columns = ["created_at", "updated_at", "deleted_at"];
    public static function makeConfig($config_name, $columns, $type = 'int'): array
    {
        $comments = [];
        try {
            if(file_exists(base_path("core/$config_name.json"))){
                throw new \Exception("Config: $config_name.json already exists.");
            }

            $columns = self::cleanColumns($columns);
            $config = json_decode(file_get_contents(base_path("mods/config.json")), true);

            //Change Contents
            $id = $config_name . "_id";
            $proper_name = properName($config_name);
            $plural_name = pluralize($proper_name);

            $config['name'] = $config_name;
            $config['table'] = $config_name;
            $config['representative_value'] = $id;
            $config['page_name'] = $plural_name;

            //Create Primary Key
            $cols = [];
            $cols[] = self::columnGenerator($id, $type, 'primary');

            foreach ($columns as $column) {
                $col_data = self::columnAnalyzer($column);
                $cols[] = self::columnGenerator($col_data['column_name'], $col_data['type'], $col_data['key']);
            }

            $config['columns'] = $cols;

            self::backupConfig($config_name);
            $file = fopen(base_path("core/$config_name.json"), "w");
            fwrite($file, json_encode($config, JSON_PRETTY_PRINT));

            $comments[] = "Config: $config_name.json has been created in core/";

        } catch (\Exception $e) {
            $comments[] = "Failed to create config: $config_name. Error: " . $e->getMessage();
        } finally {
            return $comments;
        }
    }

    public static function makeColumns($config_name, $columns): array
    {
        $comments = [];
        try {
            $columns = self::cleanColumns($columns);
            $config = json_decode(file_get_contents(base_path("core/$config_name.json")), true);

            $cols = $config['columns'];

            foreach ($columns as $column) {
                $col_data = self::columnAnalyzer($column);

                foreach ($cols as $key => $col) {
                    if($col['name'] === $col_data['column_name']){
                        throw new \Exception("Column " . $col['name'] . " already exists.");
                    }
                }

                $cols[] = self::columnGenerator($col_data['column_name'], $col_data['type'], $col_data['key']);
            }

            $config['columns'] = $cols;

            self::backupConfig($config_name);
            $file = fopen(base_path("core/$config_name.json"), "w");
            fwrite($file, json_encode($config, JSON_PRETTY_PRINT));

            $comments[] = "Config Column: " . implode(",", $columns) . " has been added to $config_name.json";

        } catch (\Exception $e) {
            $comments[] = "Failed to create column: $config_name. Error: " . $e->getMessage();
        } finally {
            return $comments;
        }
    }

    public static function makeAttribute($config_name, $__column): array
    {
        $comments = [];
        try {
            $config = json_decode(file_get_contents(base_path("core/$config_name.json")), true);

            $cols = $config['columns'];

            foreach ($config['columns'] as $index => $column) {
                if($column['name'] === $__column){
                   $attributes = $column['attributes'];
                   $attribute_template = json_decode(file_get_contents(base_path("mods/column_attributes.json")), true);

                   foreach ($attributes as $key => $attribute) {
                       if($attribute === $attribute_template){
                           throw new \Exception("An attribute template already exists.");
                       }
                   }

                   $column['attributes'][] = $attribute_template;
                   $cols[$index] = $column;
                }
            }

            $config['columns'] = $cols;

            self::backupConfig($config_name);
            $file = fopen(base_path("core/$config_name.json"), "w");
            fwrite($file, json_encode($config, JSON_PRETTY_PRINT));

            $comments[] = "Config Column: attribute template has been added to $__column column in $config_name.json";

        } catch (\Exception $e) {
            $comments[] = "Failed to create column: $config_name. Error: " . $e->getMessage();
        } finally {
            return $comments;
        }
    }

    public static function makeClass($config_name, $__column): array
    {
        $comments = [];
        try {
            $config = json_decode(file_get_contents(base_path("core/$config_name.json")), true);

            $cols = $config['columns'];

            foreach ($config['columns'] as $index => $column) {
                if($column['name'] === $__column){
                    $classes = $column['classes'];
                    $class_template = json_decode(file_get_contents(base_path("mods/column_class.json")), true);

                    foreach ($classes as $key => $class) {
                        if($class === $class_template){
                            throw new \Exception("A class template already exists.");
                        }
                    }

                    $column['classes'][] = $class_template;
                    $cols[$index] = $column;
                }
            }

            $config['columns'] = $cols;

            self::backupConfig($config_name);
            $file = fopen(base_path("core/$config_name.json"), "w");
            fwrite($file, json_encode($config, JSON_PRETTY_PRINT));

            $comments[] = "Config Column: class template has been added to $__column column in $config_name.json";

        } catch (\Exception $e) {
            $comments[] = "Failed to create column: $config_name. Error: " . $e->getMessage();
        } finally {
            return $comments;
        }
    }

    public static function makeValidation($config_name, $__column): array
    {
        $comments = [];
        try {
            $config = json_decode(file_get_contents(base_path("core/$config_name.json")), true);

            $cols = $config['columns'];

            foreach ($config['columns'] as $index => $column) {
                if($column['name'] === $__column){
                    $validations = $column['validations'];
                    $validation_template = json_decode(file_get_contents(base_path("mods/column_validation.json")), true);

                    foreach ($validations as $key => $validation) {
                        if($validation === $validation_template){
                            throw new \Exception("A validation template already exists.");
                        }
                    }

                    $column['validations'][] = $validation_template;
                    $cols[$index] = $column;
                }
            }

            $config['columns'] = $cols;

            self::backupConfig($config_name);
            $file = fopen(base_path("core/$config_name.json"), "w");
            fwrite($file, json_encode($config, JSON_PRETTY_PRINT));

            $comments[] = "Config Column: validation template has been added to $__column column in $config_name.json";

        } catch (\Exception $e) {
            $comments[] = "Failed to create column: $config_name. Error: " . $e->getMessage();
        } finally {
            return $comments;
        }
    }

    public static function deleteColumns($config_name, $columns): array
    {
        $comments = [];
        try {
            $columns = self::cleanColumns($columns);
            $config = json_decode(file_get_contents(base_path("core/$config_name.json")), true);

            $cols = $config['columns'];

            foreach ($columns as $column) {
                foreach ($cols as $key => $col) {
                    if($col['name'] === $column){
                        unset($cols[$key]);
                    }
                }
            }

            $cols = array_values($cols);

            $config['columns'] = $cols;

            self::backupConfig($config_name);
            $file = fopen(base_path("core/$config_name.json"), "w");
            fwrite($file, json_encode($config, JSON_PRETTY_PRINT));

            $comments[] = "Config Column: " . implode(",", $columns) . " has been removed from $config_name.json";

        } catch (\Exception $e) {
            $comments[] = "Failed to remove column: $config_name. Error: " . $e->getMessage();
        } finally {
            return $comments;
        }
    }

    private static function columnGenerator($column_name, $type = 'string', $key = ''){
        try {
            $column = json_decode(file_get_contents(base_path("mods/column.json")), true);
            $proper_name = properName($column_name);

            $column['type'] = $type;
            $column['table_label'] = $proper_name;
            $column['form_label'] = $proper_name;
            $column['name'] = $column_name;

            if($key === 'primary'){
                $column['primary'] = true;
                $column['fillable'] = false;
                $column['nullable'] = false;
                $column['hidden'] = true;
                $column['type'] = 'int';
            }

            if($key === 'foreign'){
                $column['foreign'] = true;
                $column['nullable'] = false;
                $column['type'] = 'int';
            }

            if($type === 'file'){
                $column['type'] = 'string';
                $column['control'] = 'file';
            }

            if($type === 'file_multiple'){
                $column['type'] = 'string';
                $column['control'] = 'file_multiple';
            }

            if(in_array($column_name, self::$special_columns)){
                $column['required'] = false;
                $column['nullable'] = false;
                $column['fillable'] = false;
            }
            return $column;
        }catch(\Exception $e){
            return [];
        }
    }

    private static function columnAnalyzer($column_name){
        $response = [
            "column_name" => $column_name,
            "type" => "string",
            "key" => ""
        ];

        try {
            $columns_names = explode("_", $column_name);
            if(count($columns_names) > 1){
                if(end($columns_names) === 'id'){
                    $key = 'foreign';
                }
                $response['type'] = match (strtolower($columns_names[0])) {
                    'i' => 'int',
                    'd' => 'date',
                    't' => 'time',
                    'b' => 'boolean',
                    'dt' => 'datetime',
                    's' => 'string',
                    'f' => 'file',
                    'fm' => 'file_multiple',
                    default => 'none',
                };

                if($response['type'] === 'none'){
                    $response['type'] = 'string';
                }else{
                    $response['column_name'] = preg_replace('/' . preg_quote($columns_names[0] . "_", '/') . '/', "", $column_name, 1);
                }
                return $response;
            }else{
                return $response;
            }
        }catch(\Exception $e){
            return [
                "column_name" => $column_name,
                "type" => "string",
                "key" => ""
            ];
        }
    }

    public static function makeMod($name, $data = "", $force = false): array
    {
        $comments = [];
        try{
            $commandName = $name;
            $lowerName = strtolower($commandName);
            $name = str_replace("_", " ", $commandName);
            $modName = "Mod" . ucwords($name);
            $modName = str_replace(" ", "", $modName);
            $fileName = $modName . ".php";

            //Create Mod Model
            if (file_exists(app_path("Models/Mods/$fileName")) && !$force) {
                $comments[] = "MOD: $modName already exists";
            } else {
                $file = empty($data) ? file_get_contents(base_path("mods/ModModel.php.txt")) : $data; // Example path
                $file = str_replace("demo", $lowerName, $file);
                $file = str_replace("Demo", $modName, $file);
                $file = str_ireplace("ModMod", "Mod", $file);

                file_put_contents(app_path("Models/Mods/$fileName"), $file);
                $comments[] = "MOD: $modName has been created in app/Models/Mods";
            }

            //Create Main Model
            $lowerName = strtolower($commandName);
            $name = str_replace("_", " ", $commandName);
            $modName = ucwords($name);
            $modName = str_replace(" ", "", $modName);
            $fileName = $modName . ".php";

            if (file_exists(app_path("Models/$fileName"))) {
                $comments[] = "Model: $modName already exists";
            } else {
                $file = file_get_contents(base_path("mods/Model.php.txt")); // Example path
                $file = str_replace("demo", $lowerName, $file);
                $file = str_replace("Demo", $modName, $file);
                $file = str_ireplace("ModMod", "Mod", $file);

                file_put_contents(app_path("Models/$fileName"), $file);
                $comments[] = "Model: $modName has been created in app/Models/";
            }

            //Create Mod Controller
            $lowerName = strtolower($commandName);
            $name = str_replace("_", " ", $commandName);
            $modName = "Mod" . ucwords($name);
            $modName = str_replace(" ", "", $modName);
            $properName = ucwords($name);
            $properName = str_replace(" ", "", $properName);
            $modName = str_replace(" ", "", $modName);
            $controllerName = $modName . "Controller";
            $fileName = $controllerName . ".php";

            if (file_exists(app_path("Http/Controllers/Mods/$fileName"))) {
                $comments[] = "MOD: $controllerName already exists";
            } else {
                $file = file_get_contents(base_path("mods/ModController.php.txt")); // Example path
                $file = str_replace("demo", $lowerName, $file);
                $file = str_replace("ModDemo", $modName, $file);
                $file = str_replace("Demo", $properName, $file);
                $file = str_ireplace("ModMod", "Mod", $file);

                file_put_contents(app_path("Http/Controllers/Mods/$fileName"), $file);
                $comments[] = "MOD: $controllerName has been created in app/Http/Controllers/Mods";
            }

            //Create Main Controller
            $lowerName = strtolower($commandName);
            $name = str_replace("_", " ", $commandName);
            $modName = ucwords($name);
            $modName = str_replace(" ", "", $modName);
            $properName = ucwords($name);
            $properName = str_replace(" ", "", $properName);
            $modName = str_replace(" ", "", $modName);
            $controllerName = $modName . "Controller";
            $fileName = $controllerName . ".php";
            $extraModName = "Mod" . ucwords($name);
            $extraModName = str_replace(" ", "", $extraModName);

            if (file_exists(app_path("Http/Controllers/api/$fileName"))) {
                $comments[] = "MOD: $controllerName already exists";
            } else {
                $file = file_get_contents(base_path("mods/Controller.php.txt")); // Example path
                $file = str_replace("demo", $lowerName, $file);
                $file = str_replace("ModDemo", $extraModName, $file);
                $file = str_replace("Demo", $properName, $file);
                $file = str_ireplace("ModMod", "Mod", $file);

                file_put_contents(app_path("Http/Controllers/api/$fileName"), $file);
                $comments[] = "MOD: $controllerName has been created in app/Http/Controllers/";
            }

            //Create Routes
            $routes = file_get_contents(base_path("mods/Routes.txt"));
            $routes = str_replace("demo", $lowerName, $routes);
            $routes = str_replace("Demo", $properName, $routes);
            $routes_file = file_get_contents(base_path("routes/mods.php"));
            if(str_contains($routes_file, $routes)){
                $comments[] = "Routes: API Routes already exists";
            }else{
                $route_file = fopen(base_path("routes/mods.php"), "a");
                fwrite($route_file, PHP_EOL. PHP_EOL . $routes);
                fclose($route_file);
                $comments[] = "Routes: API Routes created";
            }
        }catch(\Exception $e){
            $comments[] = "Failed to create mod: $name. Error: " . $e->getMessage();
        }finally{
            return $comments;
        }
    }

    public static function configurator(): array
    {
        $comments = [];
        try{
            $path = base_path('core');
            $jsonFiles = glob($path . '/*.json');
            $ignored_configs = json_decode(file_get_contents("$path/__ignored_configs.json"), true);


            foreach ($jsonFiles as $file) {
                if(str_contains($file, "__")) continue;
                $config = json_decode(file_get_contents($file), true);
                if(!in_array($config['name'], $ignored_configs)){
                    $config = self::cleanConfig($config);
                    self::createModel($config);
                    $comments[] = "ModModel: " . $config['name'] . " has been created.";
                }else{
                    $comments[] = "ModModel: " . $config['name'] . " has been skipped.";
                }
            }
        }catch(\Exception $e){
            $comments[] = "Failed to clean config. Error: " . $e->getMessage();
        }finally{
            return $comments;
        }
    }

    public static function createModel(array $config): array
    {
        $log = [];
        try{
            $file = file_get_contents(base_path("mods/ModModel.php.txt"));

            if($config['soft_delete']){
                $file = str_replace("use SoftDeletes;", "", $file);
                $file = str_replace("use Illuminate\Database\Eloquent\SoftDeletes;", "", $file);
            }

            //Get Primary Key
            $primary_key = "";
            foreach ($config['columns'] as $column) {
                if($column['primary']){
                    $primary_key = $column['name'];
                    break;
                }
            }
            if(empty($primary_key)) throw new \Exception("Primary key not found.");
            $file = str_replace("{{pk_column}}", $primary_key, $file);
            $file = str_replace("{{table}}", $config['table'], $file);
            $file = str_replace("{{timestamps}}", $config['timestamps'] ? "true" : "false", $file);

            $fillables = [];
            $nullables = [];
            $casts = [];
            $enumerables = [];
            $files = [];
            $lengths = [];
            $defaults = [];

            foreach ($config['columns'] as $column) {
                if($column['fillable']) $fillables[] = $column['name'];
                if($column['nullable']) $nullables[] = $column['name'];
                if(!empty($column['options'])) $enumerables[$column['name']] = $column['options'];
                if(str_contains($column['control'], 'file')) $files[$column['name']] = $column['file_types'];
                if(!empty($column['length'])) $lengths[$column['name']] = $column['length'];
                if(!empty($column['default'])) $defaults[$column['name']] = $column['default'];
                if(!in_array($column['name'], self::$special_columns)) $casts[$column['name']] = $column['type'];
                if(str_contains($column['control'], 'file')) $casts[$column['name']] = "array";
            }

            $fillables_code = "";
            foreach ($fillables as $fillable) {
                $fillables_code .= "\t\t'$fillable', " . PHP_EOL;
            }
            $fillables_code = rtrim($fillables_code, ", " . PHP_EOL);
            $fillables_code = trim($fillables_code);
            $file = str_replace("{{fillables}}", $fillables_code, $file);

            $nullables_code = "";
            foreach ($nullables as $nullable) {
                $nullables_code .= "\t\t'$nullable', " . PHP_EOL;
            }
            $nullables_code = rtrim($nullables_code, ", " . PHP_EOL);
            $nullables_code = trim($nullables_code);
            $file = str_replace("{{nullables}}", $nullables_code, $file);

            $files_code = "";

            foreach ($files as $key => $file1) {
                $files_code .= "\t\t'$key' => '$file1', " . PHP_EOL;
            }
            $files_code = rtrim($files_code, ", " . PHP_EOL);
            $files_code = trim($files_code);
            $file = str_replace("{{files}}", $files_code, $file);

            $casts_code = "";
            foreach ($casts as $key => $cast) {
                $casts_code .= "\t\t'$key' => '$cast', " . PHP_EOL;
            }
            $casts_code = rtrim($casts_code, ", " . PHP_EOL);
            $casts_code = trim($casts_code);
            $file = str_replace("{{casts}}", $casts_code, $file);

            $lengths_code = "";
            foreach ($lengths as $key => $length) {
                $lengths_code .= "\t\t'$key' => '$length', " . PHP_EOL;
            }
            $lengths_code = rtrim($lengths_code, ", " . PHP_EOL);
            $lengths_code = trim($lengths_code);
            $file = str_replace("{{lengths}}", $lengths_code, $file);

            $defaults_code = "";
            foreach ($defaults as $key => $default) {
                $defaults_code .= "\t\t'$key' => '$default', " . PHP_EOL;
            }
            $defaults_code = rtrim($defaults_code, ", " . PHP_EOL);
            $defaults_code = trim($defaults_code);
            $file = str_replace("{{defaults}}", $defaults_code, $file);

            $enumerables_code = "";
            foreach ($enumerables as $key => $enumerable) {
                $enumerables_code .= "\t\t'$key' => " . json_encode($enumerable) . ", " . PHP_EOL;
            }
            $enumerables_code = rtrim($enumerables_code, ", " . PHP_EOL);
            $enumerables_code = trim($enumerables_code);
            $file = str_replace("{{enumerables}}", $enumerables_code, $file);

            self::makeMod($config['name'], $file, true);


        }catch(\Exception $e){
            dd("Failed to createModel config (" . $config['name'] . "): " . $e->getMessage());
        }finally{
            if(!empty($log)){
                file_put_contents(base_path("core/logs/" . date("Ymd_his") . "_". $config['name'] . ".log"), implode(PHP_EOL, $log));
            }
            file_put_contents(base_path('core/' . $config['name'] . '.json'), json_encode($config, JSON_PRETTY_PRINT));
            return $config;
        }
    }

    public static function cleanConfig(array $config): array
    {
        $log = [];
        try{
            //Check if it supports timestamp
            if($config['timestamps']){
                $created_at = false;
                $updated_at = false;
                foreach ($config['columns'] as $column) {
                    if($column['name'] === 'created_at') $created_at = true;
                    if($column['name'] === 'updated_at') $updated_at = true;
                }

                if(!$created_at){
                    $log[] = "created_at column has been created since timestamp is enabled.";
                    $config['columns'][] = self::columnGenerator('created_at', 'datetime');
                }
                if(!$updated_at){
                    $log[] = "updated_at column has been created since timestamp is enabled.";
                    $config['columns'][] = self::columnGenerator('updated_at', 'datetime');
                }
            }else{
                foreach ($config['columns'] as $key => $column) {
                    if ($column['name'] === 'created_at' || $column['name'] === 'updated_at') {
                        unset($config['columns'][$key]); // This modifies the original array
                    }
                }
            }
            $config['columns'] = array_values($config['columns']);

            //Check if supports soft delete
            if($config['soft_delete']) {
                $deleted_at = false;
                foreach ($config['columns'] as $column) {
                    if($column['name'] === 'deleted_at') $deleted_at = true;
                }

                if(!$deleted_at){
                    $log[] = "deleted_at column has been created since soft delete is enabled.";
                    $config['columns'][] = self::columnGenerator('deleted_at', 'datetime');
                }
            }else{
                foreach ($config['columns'] as $key => $column) {
                    if ($column['name'] === 'deleted_at') {
                        unset($config['columns'][$key]); // This modifies the original array
                    }
                }
            }

            //Check for duplicated columns
            $names = [];
            $duplicates = [];

            foreach ($config['columns'] as $item) {
                if (!isset($item['name'])) continue;

                $name = $item['name'];

                if (isset($names[$name])) {
                    $duplicates[] = $name;
                } else {
                    $names[$name] = true;
                }
            }
            if (!empty($duplicates)) {
                throw new \Exception("Duplicate columns found: " . implode(', ', array_unique($duplicates)));
            }

            //Check for roles existence
            if(!self::checkRolesExistence($config['context']))
                throw new \Exception("Roles not found: " . implode(', ', $config['context']));
            foreach ($config['columns'] as $column) {
                if(!self::checkRolesExistence($column['context']))
                    throw new \Exception("Roles not found: " . implode(', ', $column['context']));
                if(!self::checkRolesExistence($column['table_context']))
                    throw new \Exception("Roles not found: " . implode(', ', $column['table_context']));
                if(!self::checkRolesExistence($column['form_context']))
                    throw new \Exception("Roles not found: " . implode(', ', $column['form_context']));

                foreach ($column['validations'] as $validation) {
                    if(!self::checkRolesExistence($validation['context']))
                        throw new \Exception("Roles not found: " . implode(', ', $validation['context']));
                }
                foreach ($column['classes'] as $class) {
                    if(!self::checkRolesExistence($class['context']))
                        throw new \Exception("Roles not found: " . implode(', ', $class['context']));
                }
                foreach ($column['attributes'] as $attribute) {
                    if(!self::checkRolesExistence($attribute['context']))
                        throw new \Exception("Roles not found: " . implode(', ', $attribute['context']));
                }
            }

            foreach (self::$special_columns as $special_column) {
                foreach ($config['columns'] as $key => $column) {
                    if($column['name'] === $special_column) {
                        unset($config['columns'][$key]);

                        $column['fillable'] = false;
                        $column['nullable'] = false;
                        $config['columns'][] = $column;
                    }
                }
            }

            $config['columns'] = array_values($config['columns']);


        }catch(\Exception $e){
            dd("Failed to clean config (" . $config['name'] . "): " . $e->getMessage());
        }finally{
            if(!empty($log)){
                file_put_contents(base_path("core/logs/" . date("Ymd_his") . "_". $config['name'] . ".log"), implode(PHP_EOL, $log));
            }
            file_put_contents(base_path('core/' . $config['name'] . '.json'), json_encode($config, JSON_PRETTY_PRINT));
            return $config;
        }
    }

    private static function backupConfig($config){
        if(file_exists(base_path("core/$config.json"))){
            copy(base_path("core/$config.json"), base_path("core/backups/$config" . "-" . date("YmdHis") . ".json"));
        }
    }

    public static function rollbackConfig($config): array
    {
        $corePath = base_path("core");
        $backupPath = "$corePath/backups";

        $comments = [];
        try{
            $pattern = "$backupPath/$config-*.json";
            $backupFiles = glob($pattern);

            if (!empty($backupFiles)) {
                usort($backupFiles, function ($a, $b) {
                    return filemtime($b) - filemtime($a);
                });

                $latestBackup = $backupFiles[0];
                copy($latestBackup, "$corePath/$config.json");
                unlink($latestBackup);
                $comments[] = "Config: $config.json has been rolled back to the latest backup.";
            }else{
                $comments[] = "Config: $config.json has no backups.";
            }
        }catch(\Exception $e){
            $comments[] = "Failed to rollback config: $config. Error: " . $e->getMessage();
        }finally{
            return $comments;
        }
    }

    private static function cleanColumns($columns): array
    {
        try {
            // Check if $columns is already an array, if so, return it as is
            if (is_array($columns)) {
                return array_map('trim', $columns);  // If it's already an array, trim each element
            }

            // Make sure $columns is a string before calling explode
            if (is_string($columns)) {
                $columns = explode(',', $columns);
                foreach ($columns as $key => $column) {
                    $columns[$key] = trim($column); // Trim each column
                }
            } else {
                throw new \Exception("Expected a string or array for columns.");
            }

            return $columns;

        } catch (\Exception $e) {
            Log::debug($e->getMessage()); // Log the exception message
            return []; // Return an empty array in case of an error
        }
    }

    private static function checkRolesExistence($roles_array): bool{
        $roles = getRoles();
        foreach ($roles_array as $role) {
            if(!in_array($role, $roles)){
                return false;
            }
        }
        return true;
    }
}
