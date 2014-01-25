<?php

namespace Cox\Storage\Dtype;

use Dtype;

class EloquentDtypeRepository implements DtypeRepositoryInterface
{
	protected $dtype;

	public function __construct(Dtype $dtype)
	{
		$this->dtype = $dtype;
	}

	public function all()
	{
		return $this->dtype->all();
	}

	public function find($id)
	{
		return $this->dtype->find($id);
	}

	// STORE Production type
	public function store($input)
	{
		$result = array();
		$validation = \Validator::make($input, \Dtype::$rules);

		if ($validation->passes())
		{
			$this->dtype->create($input);
			$result['success'] = true;
			$result['message'] = 'Your Delivery type was successfully created !!';
			return $result;
		}
		else
		{
			$result['success'] = false;
			$result['message'] = 'There was an error creating this Delivery type!!';
			return $result;	
		}
	}

	// UPDATE Production type
	public function update($id, $input)
	{
		$result = array();
		$validation = \Validator::make($input, \Dtype::$rules);

		if ($validation->passes())
		{
			$this->dtype->find($id)->update($input);
			$result['success'] = true;
			$result['message'] = 'Your Delivery type was successfully updated !!';
			return $result;
		}
		else
		{
			$result['success'] = false;
			$result['message'] = 'There was an error updating this delivery type!!';
			return $result;		
		}
	}

	public function destroy($id)
	{
		if($this->dtype->find($id)->delete())
		{
			$result['success'] = true;
			$result['message'] = 'Your Delivery type was successfully deleted!!';
			return $result;
		}
		else
		{
			$result['success'] = false;
			$result['message'] = 'There was an error Deleteing this Delivery type!!';
			return $result;
		}
	}
	public function listDtypes()
	{
		return \DB::table('dtypes')->lists('name', 'id');
	}
}