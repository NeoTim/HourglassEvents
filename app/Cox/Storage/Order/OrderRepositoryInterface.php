<?php

namespace Cox\Storage\Order;

interface OrderRepositoryInterface {

	public function all();

	public function find($id);

	public function store($input);

	public function update($id, $input);

	public function destroy($id);

	public function trash();

	public function restoreOrder($id);

	public function remove($id);

	public function emptyTrash();


	
	

}