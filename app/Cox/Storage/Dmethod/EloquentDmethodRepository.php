<?php

namespace Cox\Storage\Dmethod;

use Dmethod;

class EloquentDmethodRepository implements DmethodRepositoryInterface
{
	protected $ptype;

	public function __construct(Dmethod $dmethod)
	{
		$this->dmethod = $dmethod;
	}

	public function all()
	{
		return $this->dmethod->all();
	}

	public function find($id)
	{
		return $this->dmethod->find($id);
	}

	// STORE Production type
	public function store($input)
	{
		$result = array();
		$validation = \Validator::make($input, \Dmethod::$rules);

		if ($validation->passes())
		{
			$this->dmethod->create($input);
			$result['success'] = true;
			$result['message'] = 'Your Production method was successfully created !!';
			return $result;
		}
		else
		{
			$result['success'] = false;
			$result['message'] = 'There was an error creating this production method!!';
			return $result;	
		}
	}

	// UPDATE Production type
	public function update($id, $input)
	{
		$result = array();
		$validation = \Validator::make($input, \Dmethod::$rules);

		if ($validation->passes())
		{
			$this->dmethod->find($id)->update($input);
			$result['success'] = true;
			$result['message'] = 'Your Production method was successfully updated !!';
			return $result;
		}
		else
		{
			$result['success'] = false;
			$result['message'] = 'There was an error updating this production method!!';
			return $result;		
		}
	}

	public function destroy($id)
	{
		if($this->dmethod->find($id)->delete())
		{
			$result['success'] = true;
			$result['message'] = 'Your Production method was successfully deleted!!';
			return $result;
		}
		else
		{
			$result['success'] = false;
			$result['message'] = 'There was an error Deleteing this production method!!';
			return $result;
		}
	}

	public function listName()
	{
		return \DB::table('dmethods')->lists('name', 'id');
	}

	public function listD()
	{
		return \DB::table('dmethods')->whereIn('dtype_id', array(1, 4))
									 ->lists('name', 'id');
	}
}