<?php

namespace Cox\Storage\Entry;

interface EntryRepositoryInterface {

	public function all();

	public function find($id);

	public function findByOrder($order_id);

	public function findByToday();

	public function store($input);

	public function update($id, $input);

	public function destroy($id);

}