<?php

namespace Cox\Storage\Dtype;

interface DtypeRepositoryInterface {

	public function all();

	public function find($id);

	public function store($input);

	public function update($id, $input);

	public function destroy($id);

	public function listDtypes();

}