<?php

namespace Cox\Storage\Dmethod;

interface DmethodRepositoryInterface {

	public function all();

	public function find($id);

	public function store($input);

	public function update($id, $input);

	public function destroy($id);

	public function listName();

	public function listD();

}