<?php

namespace Cox\Storage\Activity;

use Activity;

class EloquentActivityRepository implements ActivityRepositoryInterface
{
	protected $ptype;

	public function __construct(Activity $activity)
	{
		$this->activity = $activity;
	}

	public function all()
	{
		return $this->activity->all();
	}

	public function find($id)
	{
		return $this->activity->find($id);
	}

	// STORE Production type
	public function store($title, $subject, $message, $section, $type)
	{

		$result = array();
		$activity = new Activity;

		if($section == 'customer')
		{
			$activity->color 	= 	'yellow';
			$activity->label 	= 	'warning';
			
		}
		elseif($section == 'order')
		{
			$activity->color 	= 	'blue';
			$activity->label 	= 	'primary';
		}
		elseif($section == 'entry')
		{
			$activity->color 	= 	'green';
			$activity->label 	= 	'success';
		}
		elseif($section == 'product')
		{
			$activity->color 	= 	'purple';
			$activity->label 	= 	'default';
			
		}
		elseif($section == 'production')
		{
			$activity->color 	= 	'green';
			$activity->label 	= 	'info';
			
		}

		if($type == 'store')
		{
			
			$activity->icon 	=	'plus';
		}
		if($type == 'update')
		{
			
			$activity->icon 	=	'edit';
		}
		if($type == 'delete')
		{
			
			$activity->icon 	=	'trash-o';

		}
		
		//date_default_timezone_set('America/Chicago');
		$date = date('Y-m-d H:i:s');
		//$activityTimezone = new DateTimeZone('America/Chicago');

		$activity->title = $title;
		$activity->subject = $subject;
		$activity->message = $message;
		$activity->created_at = $date;
		$activity->section = $section;
		$activity->type = $type;
		if ($activity->save())
		{
			
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
		$validation = \Validator::make($input, \Activity::$rules);

		if ($validation->passes())
		{
			$this->activity->find($id)->update($input);
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
		if($this->activity->find($id)->delete())
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