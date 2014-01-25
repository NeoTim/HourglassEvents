<?php

namespace Cox\Storage\Umessage;

use Umessage;

class EloquentUmessageRepository implements UmessageRepositoryInterface
{
	protected $umessage;

	public function __construct(Umessage $umessage)
	{
		$this->umessage = $umessage;
	}

	public function all()
	{
		return $this->umessage->all();
	}
	
	public function find($id)
	{
		return $this->umessage->find($id);
	}

	

	// STORE Production type
	public function store($input)
	{
		$result = array();
		$validation = \Validator::make($input, \Umessage::$rules);

		if ($validation->passes())
		{
			$this->umessage->create($input);
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
		$validation = \Validator::make($input, \Umessage::$rules);

		if ($validation->passes())
		{
			$this->umessage->find($id)->update($input);
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
		if($this->umessage->find($id)->delete())
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

	public function findInbox($userId)
	{
		return \DB::table('umessages')->where('user_id', '=', $userId)
									  ->where('inbox', '=', '1')
									  ->orderBy('created_at', 'asc')->get();
	}

	public function findSent($userId)
	{
		return \DB::table('umessages')->where('user_id', '=', $userId)
									  ->where('sent', '=', '1')
									  ->orderBy('created_at', 'asc')->get();
	}

	public function findDraft($userId)
	{
		return \DB::table('umessages')->where('user_id', '=', $userId)
									  ->where('draft', '=', '1')
									  ->orderBy('created_at', 'asc')->get();
	}

	public function findTrash($userId)
	{
		return \DB::table('umessages')->where('user_id', '=', $userId)
									  ->where('trash', '=', '1')
									  ->orderBy('created_at', 'asc')->get();
	}

	public function findFlagged($userId)
	{
		return \DB::table('umessages')->where('user_id', '=', $userId)
									  ->where('flag', '=', '1')
									  ->orderBy('created_at', 'asc')->get();
	}

}








