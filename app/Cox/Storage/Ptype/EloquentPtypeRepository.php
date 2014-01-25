<?php

namespace Cox\Storage\Ptype;

use Ptype;

class EloquentPtypeRepository implements PtypeRepositoryInterface
{
	protected $ptype;

	public function __construct(Ptype $ptype)
	{
		$this->ptype = $ptype;
	}

	public function all()
	{
		return $this->ptype->with('pmethods')->get();
	}

	public function find($id)
	{
		return $this->ptype->find($id);
	}

	// STORE Production type
	public function store($input)
	{
		$result = array();
		$validation = \Validator::make($input, \Ptype::$rules);

		if ($validation->passes())
		{
			$this->ptype->create($input);
			$result['success'] = true;
			$result['message'] = 'Your Production type was successfully created !!';
			return $result;
		}
		else
		{
			$result['success'] = false;
			$result['message'] = 'There was an error creating this production type!!';
			return $result;	
		}
	}

	// UPDATE Production type
	public function update($id, $input)
	{
		$result = array();
		$validation = \Validator::make($input, \Ptype::$rules);

		if ($validation->passes())
		{
			$this->ptype->find($id)->update($input);
			$result['success'] = true;
			$result['message'] = 'Your Production type was successfully updated !!';
			return $result;
		}
		else
		{
			$result['success'] = false;
			$result['message'] = 'There was an error updating this production type!!';
			return $result;		
		}
	}

	public function destroy($id)
	{
		if($this->ptype->find($id)->delete())
		{
			$result['success'] = true;
			$result['message'] = 'Your Production type was successfully deleted!!';
			return $result;
		}
		else
		{
			$result['success'] = false;
			$result['message'] = 'There was an error Deleteing this production type!!';
			return $result;
		}
	}
}