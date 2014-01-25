<?php

namespace Cox\Storage\Activity;

interface ActivityRepositoryInterface {

	public function all();

	public function find($id);

	public function store($title, $subject, $message, $section, $type);

	public function update($id, $input);

	public function destroy($id);

}