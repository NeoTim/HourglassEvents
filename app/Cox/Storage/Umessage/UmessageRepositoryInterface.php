<?php

namespace Cox\Storage\Umessage;

interface UmessageRepositoryInterface {

	public function all();

	public function find($id);

	public function store($input);

	public function update($id, $input);

	public function destroy($id);

	public function findInbox($id);

	public function findSent($id);

	public function findDraft($id);

	public function findTrash($id);

	public function findFlagged($id);


}