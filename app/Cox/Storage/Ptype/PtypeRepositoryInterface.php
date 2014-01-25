<?php

namespace Cox\Storage\Ptype;

interface PtypeRepositoryInterface {

	public function all();

	public function find($id);

	public function store($input);

	public function update($id, $input);

	public function destroy($id);

}