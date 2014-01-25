<?php

namespace Cox\Storage\Notification;

use Notification;

class EloquentNotificationRepository implements NotificationRepositoryInterface
{
	protected $notification;

	public function __construct(Notification $notification)
	{
		$this->notification = $notification;
	}

	public function all()
	{
		return $this->notification->all();
	}
	
	public function find($id)
	{
		return $this->notification->find($id);
	}

	// STORE Production type
	public function store($input)
	{
		$notify = array();
		$validation = \Validator::make($input, \Notification::$rules);

		if ($validation->passes())
		{
			$notify = $this->notification->create($input);
			$notify['success'] = true;
			
			return $notify;
		}
		else
		{
			$notify['success'] = false;
			$notify['message'] = 'Please fill out the whole form';
			return $notify;	
		}
	}

	// UPDATE Production type
	public function update($id, $input)
	{
		$result = array();
		$validation = \Validator::make($input, \Notification::$rules);

		if ($validation->passes())
		{
			
			$result['success'] = true;
			$result['message'] = 'Your Notification was successfully updated !!';
			return $result;
		}
		else
		{
			$result['success'] = false;
			$result['message'] = 'There was an error Notification this product!!';
			return $result;		
		}
	}

	public function destroy($id)
	{
		if($this->notification->find($id)->delete())
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
	
}