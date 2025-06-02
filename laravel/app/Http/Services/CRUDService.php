<?php

namespace App\Http\Services;

use App\Events\CRUDEvent;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class CRUDService
{

    protected Model $model;

    public function __construct(Model $model)
    {
        $this->model = new $model;
    }

    public function getModel()
    {
        return $this->model;
    }

    public function setModel(Model $model)
    {
        $this->model = new $model;
    }

    public function generateStoreRule(array $rules = [])
    {
        return $this->model->generateStoreRule($rules);
    }

    public function generateUpdateRule(array $rules = [])
    {
        return $this->model->generateUpdateRule($rules);
    }

    public function index()
    {
        return [
            "message" => "Records were successfully retrieved",
            "result" => $this->model->all()
        ];
    }

    public function show($item)
    {
        $result = $this->model->find($item);
        return [
            "message" => !empty($result) ? "Records were successfully retrieved" : "Record was not found",
            "result" => $result
        ];
    }

    public function search(Request $request)
    {
        $query = $this->model->query();

        if (!empty($this->model->join ?? [])) {
            $query->with($this->model->join);
        }

        foreach ($request->all() as $key => $value) {
            if (in_array($key, ['page', 'limit', 'order_by', 'order_direction'])) continue;
            if (!in_array($key, $this->model->getFillable())) continue;

            if (is_string($value)) {
                $query->where($key, 'like', '%' . $value . '%');
            } else {
                $query->where($key, $value);
            }
        }

        $orderBy = $request->input('order_by');
        $orderDirection = strtolower($request->input('order_direction', 'asc')) === 'desc' ? 'desc' : 'asc';

        $fillable = ($this->model->getFillable());
        $primaryKey = ($this->model->getKeyName());

        if ($orderBy && (in_array($orderBy, $fillable) || $orderBy === $primaryKey)) {
            $query->orderBy($orderBy, $orderDirection);
        }

        $limit = (int) $request->input('limit', 0);
        $page = (int) $request->input('page', 1);

        if ($limit > 0) {
            $results = $query->paginate($limit, ['*'], 'page', $page);
        } else {
            $results = $query->get();
        }

        return [
            "message" => $results->isNotEmpty() ? "Records retrieved successfully" : "No matching records found",
            "result" => $results
        ];
    }

    public function store(Request $request, $validated = [])
    {
        BaseService::writeAuditLog(getModuleName(__CLASS__), getActionName(__FUNCTION__), auth()->id() ?? null, $request->all());
        $validated = $this->handleFiles($request, $validated);
        $result = $this->model->create($validated);

        event(new CRUDEvent([
            "action" => "add",
            "data" => makeSerializable($request->all())
        ]));

        return [
            "message" => "Record has been saved",
            "result" => $result
        ];
    }

    public function update(Request $request, $item, $validated = [])
    {

        $item = $this->model->find($item);

        if (!$item) {
            return [
                "error" => "Failed to update record: Record Not found"
            ];
        }

        event(new CRUDEvent([
            "action" => "edit",
            "data" => makeSerializable($request->all())
        ]));

        $data_before = $item->toArray();
        $validated = $this->handleFiles($request, $validated);

        $item->fill($validated);
        $item->save();

        $data_after = $item->toArray();
        BaseService::writeAuditLog(getModuleName(__CLASS__), getActionName(__FUNCTION__), auth()->id() ?? null, $data_before, $data_after);

        return [
            "message" => "Record has been updated",
            "result" => $item
        ];
    }

    public function destroy($item)
    {
        $item = $this->model->find($item);

        if (!$item) {
            return [
                "error" => "Record to be removed was not found",
            ];
        }

        event(new CRUDEvent([
            "action" => "delete",
            "data" => makeSerializable($item->toArray())
        ]));

        BaseService::writeAuditLog(getModuleName(__CLASS__), getActionName(__FUNCTION__), auth()->id() ?? null, $item);
        $item->delete();

        return [
            "message" => "Record has been removed"
        ];
    }

    private function handleFiles(Request $request, $validated = [])
    {
        $uploadedFiles = [];

        $modelFiles = $this->model->files;

        foreach ($modelFiles as $key => $value) {
            if ($request->has($key)) {
                $files = $request->file($key);

                if (!is_array($files)) {
                    $files = [$files];
                }

                foreach ($files as $file) {
                    $filename = getFilePrefix() . '.' . $file->getClientOriginalExtension();
                    $filePath = BaseService::saveFile($file, $filename);
                    $uploadedFiles[] = $filePath;
                }

                $validated[$key] = $uploadedFiles;
                $uploadedFiles = [];
            }
        }

        return $validated;
    }
}
