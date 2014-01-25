<?php

namespace Cox\Storage\Pmethod;

use Pmethod;

class EloquentPmethodRepository implements PmethodRepositoryInterface
{
	protected $ptype;

	public function __construct(Pmethod $pmethod)
	{
		$this->pmethod = $pmethod;
	}

	public function all()
	{
		return $this->pmethod->with('entries')->get();
	}

	public function find($id)
	{
		return $this->pmethod->find($id);
	}

	// STORE Production type
	public function store($input)
	{
		$result = array();
		$validation = \Validator::make($input, \Pmethod::$rules);

		if ($validation->passes())
		{
			$this->pmethod->create($input);
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
		$validation = \Validator::make($input, \Pmethod::$rules);

		if ($validation->passes())
		{
			$this->pmethod->find($id)->update($input);
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
		if($this->pmethod->find($id)->delete())
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
}