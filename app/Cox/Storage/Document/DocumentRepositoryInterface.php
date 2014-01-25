<?php

namespace Cox\Storage\Document;

interface DocumentRepositoryInterface {

	public function all();

	public function find($id);

	public function store();

	public function update($id, $input);

	public function destroy($id);

}