<?php

class Activity extends Eloquent {
	protected $guarded = array();

	public static $rules = array(
	);
	
	public function getDates()
	{
	    return array('created_at');
	}

	
}
