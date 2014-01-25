<?php

namespace Cox\Storage\Customer;

interface CustomerRepositoryInterface {

	public function all();

	public function find($id);

	public function store($input);

	public function update($id, $input);

	public function destroy($id);

	public function listCompany();

}